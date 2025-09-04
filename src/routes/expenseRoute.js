import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import requireAuth from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.use(requireAuth);

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required').trim().isLength({ max: 200 }),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('category_id').isInt().withMessage('Category_id is required and must be an integer'),
    body('date').optional().isISO8601().withMessage('Date must be in ISO 8601 format'),
    body('description').optional().isString().isLength({ max: 250 }),
    body('is_recurring').optional().isBoolean(),
    body('start_date').optional().isISO8601().withMessage('Start_date must be in ISO 8601 format'),
    body('end_date').optional().isISO8601().withMessage('End_date must be in ISO 8601 format'),
    body('receipt').optional().isBoolean(),
    body('upload').optional().isBoolean(),
  ],
  validate,
  upload.single('file'),
  createExpense
);
router.put(
  '/:id',
  [
    body('title').optional().trim().isLength({ max: 200 }),
    body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('category_id').optional().isInt().withMessage('Category_id must be an integer'),
    body('date').optional().isISO8601().withMessage('Date must be in ISO 8601 format'),
    body('description').optional().isString().isLength({ max: 250 }),
    body('is_recurring').optional().isBoolean(),
    body('start_date').optional().isISO8601().withMessage('Start_date must be in ISO 8601 format'),
    body('end_date').optional().isISO8601().withMessage('End_date must be in ISO 8601 format'),
    body('receipt').optional().isBoolean(),
    body('upload').optional().isBoolean(),
  ],
  validate,
  upload.single('file'),
  updateExpense
);
router.delete('/:id', deleteExpense);

export default router;