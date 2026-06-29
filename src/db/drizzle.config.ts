import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;
const isPostgresUrl = connectionString && (connectionString.startsWith("postgres://") || connectionString.startsWith("postgresql://"));

const dbCredentials = isPostgresUrl 
  ? {
      url: connectionString,
      ssl: connectionString.includes("supabase") ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.SQL_HOST || "",
      user: process.env.SQL_ADMIN_USER || "",
      password: process.env.SQL_ADMIN_PASSWORD || "",
      database: process.env.SQL_DB_NAME || "",
      ssl: false,
    };

if (!isPostgresUrl) {
  if (!process.env.SQL_HOST) {
    throw new Error("SQL_HOST or DATABASE_URL must be set in environment variables.");
  }
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: dbCredentials as any,
  verbose: true,
});
