import { Router } from "express";
import {
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
} from "../controllers/expense.controller.js";
import { authenticateUser } from "../middleware/auth.js";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    allowed.includes(file.mimetype)
      ? callback(null, true)
      : callback(new Error("Invalid file format"));
  },
});

router.get("/", authenticateUser, getAllExpenses);
router.get("/:id", authenticateUser, getExpenseById);
router.post("/", authenticateUser, upload.single("receipt"), createExpense);
router.put("/:id", authenticateUser, upload.single("receipt"), updateExpense);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;

