import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "no theme id specified",
      data: null,
    });

  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .eq("id", id)
    .single();

  if (error)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 500,
      message: "something went wrong",
      data: null,
    });

  if (!data)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 404,
      message: "theme not found",
      data: null,
    });

  return sendStandardResponse(event, {
    success: true,
    statusCode: 200,
    message: "theme found successfully",
    data,
  });
});
