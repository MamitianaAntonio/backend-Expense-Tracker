import { pool } from "../config/db.js";

export const createIncomeQuery = async (
  amount,
  date,
  source,
  descritption,
  userId
) => {
  return pool.query(
    `
      insert into income (amount, date, source, description, user_id) values ($1, $2, $3, $4, $5) returning *;
    `,
    [amount, date, source, descritption, userId]
  );
};

export const updateIncomeQuery = async (
  amount,
  date,
  source,
  descritption,
  userId
) => {
  return pool.query(
    `
     update income set amount=$1, date=$2, source=$3, description=$4 where user_id=$5 returning *;
    `,
    [amount, date, source, descritption, userId]
  );
};

export async function getAllByUser(userId) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE user_id=$1 ORDER BY date DESC`,
    [userId]
  );
  return rows;
}

export async function getByIdForUser(userId, id) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE id=$1 AND user_id=$2`,
    [id, userId]
  );
  return rows[0] || null;
}

export async function deleteForUser(userId, id) {
  const { rows } = await pool.query(
    `DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *`,
    [id, userId]
  );
  return rows[0] || null;
}
