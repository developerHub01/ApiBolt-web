import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const { id, actionType } = await readBody<{
    id: string;
    actionType: "install" | "un-install";
  }>(event);

  console.log({ id, actionType });

  if (!id)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "no theme id specified",
      data: null,
    });

  const supabase = await serverSupabaseClient(event);

  const { data: themeData } = await supabase
    .from("themes")
    .select(`install_count`)
    .eq("id", id)
    .single();

  if (!themeData)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 404,
      message: "theme not found",
      data: null,
    });

  const updatedCount = Math.max(
    0,
    themeData.install_count + (actionType === "install" ? +1 : -1)
  );
  console.log({ updatedCount });
  const { data, error } = await supabase
    .from("themes")
    .update({
      install_count: updatedCount,
    })
    .eq("id", id);

  console.log({ data, error });

  if (error)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 500,
      message: "something went wrong",
      data: null,
    });

  return sendStandardResponse(event, {
    success: true,
    statusCode: 200,
    message: `Theme ${
      actionType === "install" ? "installed" : "uninstalled"
    } successfully`,
  });
});
