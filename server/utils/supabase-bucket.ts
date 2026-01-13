import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export const handleRemoveStorage = async (
  event: H3Event,
  bucket: string,
  fileName: string | Array<string>
) => {
  const client = await serverSupabaseClient(event);
  await client.storage
    .from(bucket)
    .remove(Array.isArray(fileName) ? fileName : [fileName]);
};
