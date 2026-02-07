import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 6;
  const searchTerm = query.searchTerm as string | undefined;
  const searchFilter = query.searchFilter as string | undefined;
  const byMe = ["true", "1"].includes((query.byMe as string)?.trim()) ? 1 : 0;
  const userName = query.userName as string | undefined;

  const supabase = await serverSupabaseClient(event);

  let queryBuilder = supabase.from("themes").select(
    `
    id, 
    name, 
    description, 
    thumbnail, 
    install_count, 
    type,
    profiles (
      full_name,
      user_name
    )
    `,
    {
      count: "exact",
    },
  );

  if (searchFilter === "id" && searchTerm)
    queryBuilder = queryBuilder.eq("id", searchTerm);
  else {
    if (searchTerm)
      queryBuilder = queryBuilder.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`,
      );
    if (searchFilter && searchFilter !== "all")
      queryBuilder = queryBuilder.eq("type", searchFilter);
  }

  if (byMe || userName) {
    let searchByAuthorId = null;
    if (byMe) {
      const user = await checkUser(event);
      searchByAuthorId = user?.id;
    } else if (userName) {
      const { data } = await supabase
        .from("profiles")
        .select(`id`)
        .eq("user_name", userName)
        .single();
      searchByAuthorId = data?.id;
    }

    if (searchByAuthorId)
      queryBuilder = queryBuilder.eq("author", searchByAuthorId);
  }

  /* Pagination & Sorting */
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await queryBuilder
    .range(from, to)
    .order("updated_at", { ascending: false });

  const { count: totalThemeCount } = await supabase.from("themes").select("*", {
    count: "exact",
    head: true,
  });

  if (error)
    return sendStandardResponse(event, {
      success: false,
      statusCode: 500,
      message: error.message,
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
    authorUsername: theme.profiles?.user_name,
    profiles: undefined,
  }));

  return sendStandardResponse(event, {
    success: true,
    statusCode: 200,
    message: "theme found successfully",
    data: {
      data: sanitizedData,
      meta: {
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
        totalThemeCount,
      },
    },
  });
});
