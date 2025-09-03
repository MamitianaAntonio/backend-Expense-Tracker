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
      select sum(amount) from expenses 
      where user_id=$1 and extract(year from date) = coalesce($2, extract(year from current_date)) and 
      extract(month from date) = coalesce($3, extract(month from current_date));
`,
    [userId, year, month],
  );
};

export const getMonthlyIncome = (userId, year, month) => {
  return pool.query(
    `
      select sum(amount) from income
      where user_id=$1 and extract(year from date) = coalesce($2, extract(year from current_date)) 
      and extract(month from date) = coalesce($3, extract(month from current_date));
`,
    [userId, year, month],
  );
};
