import { pool } from "../../config/db.js";

export const getIncomesQuery = (email) => {
  return pool.query(
    `
    select i.*, u.email, u.username from income as i inner join users u on u.id = i.user_id where u.email=$1
`,
    [email],
  );
};

export const getIncomesBtwDateQuery = (email, start_date, end_date) => {
  return pool.query(
    `
    select i.*, u.email, u.username from income as i inner join users u on u.id = i.user_id where u.email=$1 and current_date between $2 and $3;
`,
    [email, start_date, end_date],
  );
};

export const getIncomesWthStartDateQuery = (email, start_date) => {
  return pool.query(
    `
    select i.*, u.email, u.username from income as i inner join users u on u.id = i.user_id where u.email=$1 and current_date >= $2;
`,
    [email, start],
  );
};

export const getIncomesWthEndDateQuery = (email, end_date) => {
  return pool.query(
    `    select i.*, u.email, u.username from income as i inner join users u on u.id = i.user_id where u.email=$1 and current_date <= $2;
`,
    [email, end_date],
  );
};

export const postIncomeQuery = (id, amount, date, source, description) => {
  return pool.query(
    `insert from income (amount, date, source, description, user_id) values ($1, $2, $3, $4, $5);`,
    [amount, date, source, description, id],
  );
};
