import { serverSupabaseServiceRole } from "#supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import {
  checkValidMachineId,
  checkValidVersion,
} from "~~/server/lib/validator";

interface AppInstallReportBody {
  version: string;
  deviceId: string;
}

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const body = await readBody<AppInstallReportBody>(event);

  const { version, deviceId } = body;

  if (!deviceId || !version)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "Invalid request: missing version or deviceId",
    });

  if (!checkValidMachineId(deviceId))
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "Invalid request deviceId",
    });

  if (!checkValidVersion(version))
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "Invalid request version",
    });

  try {
    const { error: uniqueDeviceInstallError } = await client
      .from("unique_devices_installs")
      .upsert(
        {
          machine_id: deviceId,
        },
        {
          onConflict: "machine_id",
          ignoreDuplicates: true,
        },
      );

    if (uniqueDeviceInstallError)
      return sendStandardResponse(event, {
        success: false,
        statusCode: 500,
        message: uniqueDeviceInstallError.message,
      });

    const { error: appInstallError } = await client
      .from("app_install_events")
      .insert({
        machine_id: deviceId,
        version,
      });

    if (appInstallError)
      return sendStandardResponse(event, {
        success: false,
        statusCode: 500,
        message: appInstallError.message,
      });

    return sendStandardResponse(event, {
      success: true,
      statusCode: 200,
      message: `App installed successfully`,
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
