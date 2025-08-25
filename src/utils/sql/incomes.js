import { pool } from "../../config/db.js";

export const getIncomesQuery = (id) => {
  return pool.query(
    `
    select * from income where user_id=$1
`,
    [id],
  );
};

export const getIncomesBtwDateQuery = (id, start_date, end_date) => {
  return pool.query(
    `
    select * from income where user_id=$1 and current_date between $2 and $3;
`,
    [id, start_date, end_date],
  );
};

export const getIncomesWthStartDateQuery = (id, start_date) => {
  return pool.query(
    `
    select * from income where user_id=$1 and current_date >= $2;
`,
    [id, start],
  );
};

export const getIncomesWthEndDateQuery = (id, end_date) => {
  return pool.query(
    `select * from income where user_id=$1 and current_date <= $2;
`,
    [id, end_date],
  );
};

export const postIncomeQuery = (id, amount, date, source, description) => {
  return pool.query(
    `insert into income (amount, date, source, description, user_id) values ($1, $2, $3, $4, $5);`,
    [amount, date, source, description, id],
  );
};
