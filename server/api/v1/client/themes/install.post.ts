import { serverSupabaseServiceRole } from "#supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { checkValidMachineId } from "~~/server/lib/validator";

const ACTION_TYPE = new Set(["install", "uninstall"]);

interface InstallThemeBody {
  themeId: string;
  deviceId: string;
  actionType: "install" | "uninstall";
}

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const body = await readBody<InstallThemeBody>(event);

  const { themeId, deviceId, actionType } = body;

  if (!themeId || !deviceId || !ACTION_TYPE.has(actionType))
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "Invalid request: missing themeId, deviceId, or actionType",
    });

  if (!checkValidMachineId(deviceId))
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "Invalid request deviceId",
    });

  try {
    let error: PostgrestError | null = null;

    if (actionType === "install") {
      const { error: upsertError } = await client
        .from("theme_device_installs")
        .upsert(
          {
            device_id: deviceId,
            theme_id: themeId,
          },
          {
            onConflict: "device_id, theme_id",
            ignoreDuplicates: true,
          },
        );
      error = upsertError;
    } else {
      const { error: deleteError } = await client
        .from("theme_device_installs")
        .delete()
        .match({
          device_id: deviceId,
          theme_id: themeId,
        });
      error = deleteError;
    }

    if (error) {
      return sendStandardResponse(event, {
        success: false,
        statusCode: 500,
        message: error.message,
      });
    }

    return sendStandardResponse(event, {
      success: true,
      statusCode: 200,
      message: `Theme ${actionType === "install" ? "installed" : "uninstalled"} successfully`,
    });
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "Internal Server Error";

    return sendStandardResponse(event, {
      success: false,
      statusCode: 500,
      message: errorMessage,
    });
  }
});
