import {getAllByUser, getByIdForUser, create, updateForUser, deleteForUser} from '../models/expenseModel.js';

export const getAllExpenses = async (req, res) => {
  try {
    const items = await getAllByUser(req.user.id);
    res.status(200).json({ data: items });
  } catch (e) {
    console.error('Error in getAllExpenses:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const item = await getByIdForUser(req.user.id, req.params.id);
    if (!item) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ data: item });
  } catch (e) {
    console.error('Error in getExpenseById:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { title, amount, date, category_id, description, is_recurring, start_date, end_date, receipt, upload } = req.body;
    if (!title || amount === undefined || !category_id) {
      return res.status(400).json({ message: 'Title, amount, and category_id are required' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }
    if (!Number.isInteger(category_id)) {
      return res.status(400).json({ message: 'Category_id must be an integer' });
    }
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const expenseDate = date || new Date().toISOString().split('T')[0];
    const created = await create(req.user.id, {
      title,
      amount,
      date: expenseDate,
      category_id,
      description,
      is_recurring,
      start_date,
      end_date,
      receipt,
      upload,
      file_path: filePath,
    });
    res.status(201).json({ data: created });
  } catch (e) {
    console.error('Error in createExpense:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { title, amount, date, category_id, description, is_recurring, start_date, end_date, receipt, upload } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const updated = await updateForUser(req.user.id, req.params.id, {
      title,
      amount,
      date,
      category_id,
      description,
      is_recurring,
      start_date,
      end_date,
      receipt,
      upload,
      file_path: filePath,
    });
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ data: updated });
  } catch (e) {
    console.error('Error in updateExpense:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await deleteForUser(req.user.id, req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted', data: deleted });
  } catch (e) {
    console.error('Error in deleteExpense:', e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};