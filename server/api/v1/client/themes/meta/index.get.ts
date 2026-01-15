import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.from("themes").select(`
    id, 
    name, 
    description, 
    thumbnail, 
    install_count, 
    type,
    profiles (
      full_name
    )  
    `);

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
      message: "themes not found",
      data: null,
    });

  const sanitizedData = data?.map((theme) => ({
    ...theme,
    author: theme.profiles?.full_name,
    profiles: undefined,
  }));

  return sendStandardResponse(event, {
    success: true,
    statusCode: 200,
    message: "theme found successfully",
    data: sanitizedData,
  });
});
