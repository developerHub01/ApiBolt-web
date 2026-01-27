import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 6;
  const searchTerm = query.searchTerm as string | undefined;
  const searchFilter = query.searchFilter as string | undefined;
  const byMe = Number(query.byMe) ? 1 : 0;

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

  if (byMe) {
    const user = await checkUser(event);
    if (user?.id) queryBuilder = queryBuilder.eq("author", user.id);
  }

  /* Pagination & Sorting */
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await queryBuilder
    .range(from, to)
    .order("created_at", { ascending: false });

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
      },
    },
  });
});
