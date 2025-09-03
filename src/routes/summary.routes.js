import { Router } from "express";
import {
  getAlert,
  getMontlySummary,
  getSummary,
} from "../controllers/summary.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateUser, getSummary);
router.get("/monthly", authenticateUser, getMontlySummary);
router.get("/alerts", authenticateUser, getAlert);

export default router;
