import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

if (typeof window !== "undefined") {
  throw new Error(
    "db-url.ts is server-only. Do not import in client components.",
  );
}

export const _getDbUrl = (useDirect: boolean = false): string => {
  const rawUrl = useDirect ? process.env.DIRECT_URL : process.env.DATABASE_URL;
  const password = process.env.DATABASE_PASSWORD;

  if (!rawUrl)
    throw new Error("Missing DATABASE_URL or DIRECT_URL in .env.local");
  if (!password) throw new Error("Missing DATABASE_PASSWORD in .env.local");

  const encoded = encodeURIComponent(password);
  return rawUrl.replace("[DATABASE_PASSWORD]", encoded);
};
