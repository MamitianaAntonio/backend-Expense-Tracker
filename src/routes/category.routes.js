import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();
router.get("/", authenticateUser, getCategories);
router.post("/", authenticateUser, postCategory);
router.put("/:id", authenticateUser, updateCategory);
router.delete("/:id", authenticateUser, deleteCategory);

export default router;
