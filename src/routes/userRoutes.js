import { Router } from "express";
import { getUserProfil } from "../controllers/userControllers.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.get("/profile", authenticateUser, getUserProfil);

export default router;
