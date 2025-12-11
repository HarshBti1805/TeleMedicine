import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create a pg.Pool from the connection string
const pool = new Pool({
  connectionString: connectionString,
});

// Create the PrismaPg adapter factory
const adapter = new PrismaPg(pool);

// Create PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

export { prisma };
