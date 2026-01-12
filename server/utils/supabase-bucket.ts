import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export const handleRemoveStorage = async (
  event: H3Event,
  bucket: string,
  fileName: string
) => {
  const client = await serverSupabaseClient(event);
  await client.storage.from(bucket).remove([fileName]);
};
