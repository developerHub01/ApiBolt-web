import { Hono } from "hono";
import type { AppEnv } from "@/types/server/env.types";

type AppHonoOptions = ConstructorParameters<typeof Hono<AppEnv>>[0];

export const createRouter = (options?: AppHonoOptions) =>
  new Hono<AppEnv>(options);
