// import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // const client = await serverSupabaseClient(event);

  // let { data: profiles, error } = await client
  //   .from("profiles")
  //   .select("updated_at");

  // console.log(profiles);

  return {
    message: "hello world",
    // profiles,
  };
});
