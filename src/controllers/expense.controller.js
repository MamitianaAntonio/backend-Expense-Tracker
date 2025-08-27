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

export async function createExpense(req, res) {
  const { title, amount, category } = req.body;
  if (!title || amount === undefined) return res.status(400).json({ message: "title and amount are require" });

  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const created = await create(req.user.id, { title, amount, category, filePath });
    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
}

export async function updateExpense(req, res) {
  try {
    const fields = {
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      filePath: req.file ? `/uploads/${req.file.filename}` : undefined,
    };
    const updated = await updateForUser(req.user.id, req.params.id, fields);
    if (!updated) return res.status(404).json({ message: "expense not found" });
    res.json(updated);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
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