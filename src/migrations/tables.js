import { pool } from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { readFileContent } from "../utils/function.js";

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
    await pool.query(`${createTableSQL}`);
    console.log("Table created");
  } catch (error) {
    console.error("Couldn't create database: " + error);
  }
};

export default createTable;
