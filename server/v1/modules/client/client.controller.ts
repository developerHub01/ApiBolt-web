import { sendResponse } from "@/utils/server/api";
import { HTTPException } from "hono/http-exception";
import {
  checkValidMachineId,
  checkValidVersion,
} from "@/utils/server/validator";
import {
  AppInstallReportBodyInterface,
  InstallThemeBodyPayloadInterface,
} from "@/types/server/client.types";
import { ClientService } from "@/server/v1/modules/client/client.service";
import type { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/db/client";
import { HTTPContext } from "@/types/server/env.types";

const VALID_ACTIONS = new Set(["install", "uninstall"]);

const handleReportAppInstall = async (c: HTTPContext) => {
  const body = await c.req.json<AppInstallReportBodyInterface>();
  const { version, deviceId } = body;

  if (!deviceId || !version)
    throw new HTTPException(400, {
      message: "Invalid request: missing version or deviceId",
    });
  if (!checkValidMachineId(deviceId))
    throw new HTTPException(400, {
      message: "Invalid request deviceId",
    });
  if (!checkValidVersion(version))
    throw new HTTPException(400, {
      message: "Invalid request version",
    });

  const result = await ClientService.reportAppInstall(body);

  if (!result)
    throw new HTTPException(500, {
      message: "Internal Server Error",
    });

  return sendResponse(c, {
    statusCode: 200,
    message: "App installed successfully",
  });
};

const handleGetThemeDetailsById = async (c: HTTPContext) => {
  const id = c.req.param("id");
  if (!id)
    throw new HTTPException(400, {
      message: "no theme id specified",
    });

  const data = await ClientService.getThemeDetailsById(id);
  if (!data)
    throw new HTTPException(404, {
      message: "theme not found",
    });

  return sendResponse(c, {
    statusCode: 200,
    message: "theme found successfully",
    data,
  });
};

const handleGetThemeMeta = async (c: HTTPContext) => {
  const query = c.req.query();

  const page = Math.max(1, Number(query.page) || 1);
  const pageSize = Math.max(1, Number(query.pageSize) || 6);
  const searchTerm = query.searchTerm;
  const searchFilter = query.searchFilter;
  const byMe = ["true", "1"].includes((query.byMe as string)?.trim());
  const userName = query.userName;

  const where: Prisma.themesWhereInput = {};

  if (searchFilter === "id" && searchTerm) where.id = searchTerm;
  else {
    if (searchTerm)
      where.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];

    if (searchFilter && searchFilter !== "all") where.type = searchFilter;
  }

  if (byMe || userName) {
    let searchByAuthorId: string | null = null;

    if (byMe) {
      const user = c.get("user");
      searchByAuthorId = user?.id ?? null;
    } else if (userName) {
      const profile = await prisma.profiles.findUnique({
        where: {
          user_name: userName,
        },
        select: {
          id: true,
        },
      });
      searchByAuthorId = profile?.id ?? null;
    }

    if (searchByAuthorId) where.author = searchByAuthorId;
  }

  const skip = (page - 1) * pageSize;

  const [themes, filteredCount, totalThemeCount] = await Promise.all([
    prisma.themes.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        install_count: true,
        type: true,
        profiles: {
          select: {
            full_name: true,
            user_name: true,
          },
        },
      },
    }),
    prisma.themes.count({
      where,
    }),
    prisma.themes.count(),
  ]);

  const sanitizedData = themes.map((theme) => ({
    id: theme.id,
    name: theme.name,
    description: theme.description,
    thumbnail: theme.thumbnail,
    install_count: theme.install_count,
    type: theme.type,
    author: theme.profiles?.full_name ?? null,
    authorUsername: theme.profiles?.user_name ?? null,
  }));

  return sendResponse(c, {
    statusCode: 200,
    message: "theme found successfully",
    data: {
      data: sanitizedData,
      meta: {
        total: filteredCount,
        page,
        pageSize,
        totalPages: Math.ceil(filteredCount / pageSize),
        totalThemeCount,
      },
    },
  });
};

const handleThemeInstall = async (c: HTTPContext) => {
  const body = await c.req.json<InstallThemeBodyPayloadInterface>();
  const { themeId, deviceId, actionType } = body;

  if (!themeId || !deviceId || !VALID_ACTIONS.has(actionType))
    throw new HTTPException(400, {
      message: "Invalid request: missing themeId, deviceId, or actionType",
    });

  if (!checkValidMachineId(deviceId))
    throw new HTTPException(400, {
      message: "Invalid request deviceId",
    });

  const result = await ClientService.themeInstall(body);

  if (!result)
    throw new HTTPException(500, {
      message: "Internal Server Error",
    });

  return sendResponse(c, {
    message: `Theme ${actionType === "install" ? "installed" : "uninstalled"} successfully`,
    statusCode: 200,
  });
};

export const ClientController = {
  handleReportAppInstall,
  handleGetThemeDetailsById,
  handleGetThemeMeta,
  handleThemeInstall,
};
