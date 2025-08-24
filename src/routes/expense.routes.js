const express = require("express");
const { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } = require("../controllers/expense.controller.js");
const requireAuth = require("../middleware/authMiddleware.js");
const upload = require("../middleware/multer.middleware.js");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", upload.single("file"), createExpense);
router.put("/:id", upload.single("file"), updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;