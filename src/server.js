import express, { json } from "express";
import createTable from "./models/tables.js";
import { config } from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import incomesRoutes from "./routes/income.routes.js";
import expensesRoutes from "./routes/expense.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import summaryRoutes from "./routes/summary.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/incomes/", incomesRoutes);
app.use("/api/expenses/", expensesRoutes);
app.use("/api/categories/", categoriesRoutes);
app.use("/api/summary/", summaryRoutes);

app.listen(port, () => {
  try {
    createTable();
    console.log("Table created succesfully.");
    console.log("Server running on: http://localhost:" + port);
  } catch (error) {
    console.error("Couldn't create tables: " + error);
  }
});
 