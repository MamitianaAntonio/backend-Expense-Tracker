import { pool } from "../config/db";

export const getExpensesSum = (userId) => {
  return pool.query(
    `
    select sum(amount) from expenses where user_id=$1;
`,
    [userId],
  );
};

export const getIncomeSum = (userId) => {
  return pool.qurey(
    `
    select sum(amount) from income where user_id=$1;
`,
    [userId],
  );
};
