import { _getDbUrl } from "@/lib/db-url";
import { PrismaClient } from "../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: _getDbUrl(false),
});

export const prisma = new PrismaClient({ adapter });
