import { defineConfig } from "prisma/config";
import { _getDbUrl } from "./lib/db-url";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: _getDbUrl(true),
  },
});
