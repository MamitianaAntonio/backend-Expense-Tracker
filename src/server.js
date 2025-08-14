import express from "express";
import createTable from "./migrations/tables.js";
import { config } from "dotenv";

config();
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  try {
    createTable();
    console.log("Table created succesfully.");
    console.log("Server running on: http://localhost:" + port);
  } catch (error) {
    console.error("Couldn't create tables: " + error);
  }
});
