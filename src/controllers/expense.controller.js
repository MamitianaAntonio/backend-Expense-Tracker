import { getAllByUser, getByIdForUser, create, updateForUser, deleteForUser } from "../models/expense.js";

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
  }
}

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