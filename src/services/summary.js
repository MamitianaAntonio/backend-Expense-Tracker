import { pool } from "../config/db.js";

export const getExpensesSum = (userId, start_date, end_date) => {
  return pool.query(
    `
    select sum(amount) from expenses where user_id=$1 and date between $2 and coalesce($3, current_date);
`,
    [userId, start_date, end_date],
  );
};

export const getIncomeSum = (userId, start_date, end_date) => {
  return pool.query(
    `
    select sum(amount) from income where user_id=$1 and date between $2 and coalesce($3, current_date);
`,
    [userId, start_date, end_date],
  );
};

export const getMonthlyExpenses = (userId, year, month) => {
  return pool.query(
    `
      select sum(amount) from expenses where user_id=$1 and extract(year from date) = $2 and extract(month from date) = $3;
`,
    [userId, year, month],
  );
};

export const getMonthlyIncome = (userId, year, month) => {
  return pool.query(
    `
      select sum(amount) from income where user_id=$1 and extract(year from date) = $2 and extract(month from date) = $3;
`,
    [userId, year, month],
  );
};
