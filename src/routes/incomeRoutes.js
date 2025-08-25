import { Router } from "express";
import { authenticateUser } from "../middleware/auth";
import { getIncomes } from "../controllers/incomeControllers";

const router = Router();

router.get("/", authenticateUser, getIncomes);

export default router;
