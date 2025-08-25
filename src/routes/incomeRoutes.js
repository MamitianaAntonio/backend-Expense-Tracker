import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getIncomes,
  getIncomesById,
} from "../controllers/incomeControllers.js";

const router = Router();

router.get("/", authenticateUser, getIncomes);
router.get("/:id", authenticateUser, getIncomesById);

export default router;
