import express from "express";
import createTable from "./migrations/tables.js";
import { config } from "dotenv";
import morgan from "morgan";

config();
const app = express();
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.listen(port, () => {
  try {
    createTable();
    console.log("Table created succesfully.");
    console.log("Server running on: http://localhost:" + port);
  } catch (error) {
    console.error("Couldn't create tables: " + error);
  }
});
