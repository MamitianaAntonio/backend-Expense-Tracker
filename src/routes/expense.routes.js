import { Router } from "express";
import { getAllExpenses, getExpenseById, deleteExpense, createExpense, updateExpense } from "../controllers/expense.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateUser, getAllExpenses);
router.get("/:id", authenticateUser, getExpenseById);
router.post("/", authenticateUser, createExpense);
router.put("/:id", authenticateUser, updateExpense);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;