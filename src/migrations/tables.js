import { pool } from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { readFileContent } from "../utils/function.js";
import { sql } from "slonik";

const __dirname = fileURLToPath(import.meta.url);
const sqlMigrationFile = path.join(
  __dirname,
  "..",
  "..",
  "utils",
  "sql",
  "dataBase.sql",
);

const createTable = async () => {
  try {
    const createTableSQL = readFileContent(sqlMigrationFile);
    await pool.query(sql`${createTableSQL}`);
    console.log("Table created");
  } catch (error) {
    console.error("Couldn't create database: " + error);
  }
};

export default createTable;
