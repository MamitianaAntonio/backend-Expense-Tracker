import { Router } from "express";
import { getSummary } from "../controllers/summary.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateUser, getSummary);

export default router;
