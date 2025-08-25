import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getIncomes,
  getIncomesById,
  postIncome,
} from "../controllers/incomeControllers.js";

const router = Router();

router.get("/", authenticateUser, getIncomes);
router.get("/:id", authenticateUser, getIncomesById);
router.post("/", authenticateUser, postIncome);

export default router;
