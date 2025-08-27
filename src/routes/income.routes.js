import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  deleteIncome,
  getIncomes,
  getIncomesById,
  postIncome,
  updateIncome,
} from "../controllers/income.controller.js";

const router = Router();

router.get("/", authenticateUser, getIncomes);
router.get("/:id", authenticateUser, getIncomesById);
router.post("/", authenticateUser, postIncome);
router.put("/:id", authenticateUser, updateIncome);
router.delete("/:id", authenticateUser, deleteIncome);

export default router;
