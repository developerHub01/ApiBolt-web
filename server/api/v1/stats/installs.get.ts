import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  try {
    // Total install events (including repeated installs on same device)
    const { count: totalInstalls, error: installError } = await client
      .from("app_install_events")
      .select("*", { count: "exact", head: true });

    if (installError)
      return sendStandardResponse(event, {
        success: false,
        statusCode: 500,
        message: installError.message,
      });

    // Total unique devices (unique PCs that ever downloaded)
    const { count: uniqueDevices, error: deviceError } = await client
      .from("unique_devices_installs")
      .select("*", { count: "exact", head: true });

    if (deviceError)
      return sendStandardResponse(event, {
        success: false,
        statusCode: 500,
        message: deviceError.message,
      });

    return sendStandardResponse(event, {
      success: true,
      statusCode: 200,
      data: {
        totalInstalls: totalInstalls ?? 0,
        uniqueDevices: uniqueDevices ?? 0,
      },
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
