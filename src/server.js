import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import expenseRoute from './routes/expenseRoute.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use('/uploads', express.static(path.join(__dirname, '..', 'Uploads')));
app.get('/', (req, res) => res.json({ status: 'ok', service: 'expense-app-sql-backend' }));
app.use('/api/auth', authRoute);
app.use('/api/expenses', expenseRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});