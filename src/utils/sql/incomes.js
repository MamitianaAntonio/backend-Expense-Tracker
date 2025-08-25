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
