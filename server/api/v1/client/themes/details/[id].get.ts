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
    .select(
      `
      id,
      name,
      description,
      type,
      preview,
      thumbnail,
      palette,
      version,
      install_count,
      profiles (
      full_name
    )  
      `
    )
    .eq("id", id)
    .single();

  console.log(data);

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

  const sanitizedData = {
    ...data,
    author: data.profiles?.full_name,
    profiles: undefined,
  };

  return sendStandardResponse(event, {
    success: true,
    statusCode: 200,
    message: "theme found successfully",
    data: sanitizedData,
  });
});
