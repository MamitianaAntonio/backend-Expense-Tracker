import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getIncomes,
  getIncomesById,
  postIncome,
  updateIncome,
} from "../controllers/incomeControllers.js";

const router = Router();

router.get("/", authenticateUser, getIncomes);
router.get("/:id", authenticateUser, getIncomesById);
router.post("/", authenticateUser, postIncome);
router.put("/:id", authenticateUser, updateIncome);

export default router;
