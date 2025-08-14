import express from "express";
import createTable from "./migrations/tables.js";
const app = express();

app.listen(3000, () => {
  try {
    createTable();
    console.log("Table created succesfully.");
  } catch (error) {
    console.error("Couldn't create tables: " + error);
  }
});
