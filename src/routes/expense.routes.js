import express from "express";


import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from "../controllers/expense.controller.js";
import requireAuth from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", upload.single("file"), createExpense);
router.put("/:id", upload.single("file"), updateExpense);
router.delete("/:id", deleteExpense);

export default router;