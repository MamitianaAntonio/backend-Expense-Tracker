import { Pool } from "pg";
import { config } from "dotenv";

config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a DATABASE_URL like this
// DATABASE_URL=postgresql://user:password@localhost:5432/mydb
// in your .env file.
