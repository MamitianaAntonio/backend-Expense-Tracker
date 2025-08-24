const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes.js");
const expenseRoutes = require("./routes/expense.routes.js");


//authorized cookie
app.use(cors({
  origin: process.env.ORIGIN || "http://localhost:3000",
  credentials: true,
}));

// static for uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req, res) => res.json({ status: "ok", service: "expense-app-sql-backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (res, error) => {
  res.console.log(`Server running on http://localhost:${PORT}`)
  if(error){
    console.error(error);
  }
});
