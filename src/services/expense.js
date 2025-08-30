import { pool } from "../config/db.js";

export const createExpenseQuery = async (
  description,
  amount,
  type,
  date,
  start_date,
  end_date,
  user_id,
  category_id,
  receipt,
) => {
  return type
    ? pool.query(
        `insert into expenses (description, amount, type, date, start_date, end_date, user_id, category_id, receipt) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *;`,
        [
          description,
          amount,
          type,
          date,
          start_date,
          end_date,
          user_id,
          category_id,
          receipt,
        ],
      )
    : pool.query(
        `insert into expenses (description, amount, type, date, user_id, category_id, receipt) values ($1, $2, $3, $4, $5, $6, $7) returning *;`,
        [description, amount, type, date, user_id, category_id, receipt],
      );
};

export const updateExpenseQuery = async (
  amount,
  date,
  categoryId,
  description,
  type,
  startDate,
  endDate,
  id,
) => {
  return type
    ? pool.query(
        ` update expenses set amount=$1, date=$2, category_id=$3, description=$4, type=$5, start_date=$6, end_date=$7 where id=$8 returning *; `,
        [amount, date, categoryId, description, type, startDate, endDate, id],
      )
    : pool.query(
        ` update expenses set amount=$1, date=$2, category_id=$3, description=$4 where id=$5 returning *; `,
        [amount, date, categoryId, description, id],
      );
};

export async function getAllByUser(userId) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE user_id=$1 ORDER BY date DESC`,
    [userId],
  );
  return rows;
}

export async function getByIdForUser(userId, id) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE id=$1 AND user_id=$2`,
    [id, userId],
  );
  return rows[0] || null;
}

export async function deleteForUser(userId, id) {
  const { rows } = await pool.query(
    `DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *`,
    [id, userId],
  );
  return rows[0] || null;
}
