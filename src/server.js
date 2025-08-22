import express, { json } from "express";
import createTable from "./migrations/tables.js";
import { config } from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(json());
const port = process.env.PORT || 3000;

app.use("/api/auth/", authRoutes);

app.listen(port, () => {
  try {
    createTable();
    console.log("Table created succesfully.");
    console.log("Server running on: http://localhost:" + port);
  } catch (error) {
    console.error("Couldn't create tables: " + error);
  }
});
