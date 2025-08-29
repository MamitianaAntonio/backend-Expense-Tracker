import { Router } from "express";
import { getAllExpenses, getExpenseById, deleteExpense, createExpense, updateExpense } from "../controllers/expense.controller.js";
import { authenticateUser } from "../middleware/auth.js";
import multer from "multer"

const router = Router();
const upload = multer();

router.get("/", authenticateUser, getAllExpenses);
router.get("/:id", authenticateUser, getExpenseById);
router.post("/", authenticateUser, upload.single('receipt'), createExpense);
router.put("/:id", authenticateUser, upload.single('receipt'), updateExpense);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;