import { serverSupabaseClient } from "#supabase/server";
import { checkUser } from "~~/server/utils/auth";
import { handleRemoveStorage } from "~~/server/utils/supabase-bucket";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "no theme id specified",
      data: null,
    });

  const user = await checkUser(event);
  if (!user)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 401,
      message: "you are not logged in.",
      data: null,
    });

  const client = await serverSupabaseClient(event);

  const { data: themeData, error: themeError } = await client
    .from("themes")
    .select("id, preview, thumbnail")
    .eq("id", id)
    .eq("author", user.id)
    /* maybeSingle to avoid 406 errors if not found */
    .maybeSingle();

  if (!themeData)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 404,
      message: "theme not found",
    });

  const { error: deleteError } = await client
    .from("themes")
    .delete()
    .eq("id", id);

  if (deleteError)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 400,
      message: "something went wrong",
    });

  const deletingStoragePath: Array<[string, string]> = [];
  if (themeData?.preview) {
    const path = themeData.preview.split("public/theme_preview/")?.[1];
    if (path) deletingStoragePath.push(["theme_preview", path]);
  }
  if (themeData?.thumbnail) {
    const path = themeData.thumbnail.split("public/theme_thumbnail/")?.[1];
    if (path) deletingStoragePath.push(["theme_thumbnail", path]);
  }

  if (deletingStoragePath.length)
    await Promise.allSettled(
      deletingStoragePath.map(([bucket, path]) =>
        handleRemoveStorage(event, bucket, path)
      )
    );

  return sendStandardResponse(event, {
    success: true,
    statusCode: 204,
    message: "theme deleted successfully",
  });
});
