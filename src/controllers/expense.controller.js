import v2 from "../config/cloudinary.js";

import {
  getAllByUser,
  getByIdForUser,
  deleteForUser,
  createExpenseQuery,
  updateExpenseQuery,
} from "../services/expense.js";
import { getUserProfilQuery } from "../services/users.js";

export async function getAllExpenses(req, res) {
  try {
    const items = await getAllByUser(req.user.id);
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
}

export async function getExpenseById(req, res) {
  try {
    const item = await getByIdForUser(req.user.id, req.params.id);
    if (!item) return res.status(404).json({ message: "expense not found" });
    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
}

export const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const { amount, date, categoryId, description, type, startDate, endDate } =
      req.body;
    const userInfo = await getUserProfilQuery(userId);
    const userEmail = userInfo.rows[0].email;
    const sanitizedEmail = userEmail.replace(/[@.]/g, "_");

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const URI = "data: " + req.file.mimetype + ";base64," + base64;
      const result = await v2.uploader.upload(URI, {
        folder: `expense_tracker/receipts/ex${userId}${sanitizedEmail}`,
      });
      const URL = result.secure_url;
      const resultSet = await createExpenseQuery(
        description,
        amount,
        type,
        date,
        startDate,
        endDate,
        userId,
        categoryId,
        URL,
      );

      res.status(201).json({
        message: "Expense created successfully",
      });
    } else {
      const resultSet = await createExpenseQuery(
        description,
        amount,
        type,
        date,
        startDate,
        endDate,
        userId,
        categoryId,
        null,
      );

      res.status(201).json({
        data: resultSet.rows[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { amount, date, categoryId, description, type, startDate, endDate } =
      req.body;

    const resultSet = await updateExpenseQuery(
      amount,
      date,
      categoryId,
      description,
      type,
      startDate,
      endDate,
      expenseId,
    );

    res.status(200).json({
      data: resultSet.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export async function deleteExpense(req, res) {
  try {
    const deleted = await deleteForUser(req.user.id, req.params.id);
    if (!deleted) return res.status(404).json({ message: "expense not found" });
    res.json({ message: "expense deleted", expense: deleted });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
}
