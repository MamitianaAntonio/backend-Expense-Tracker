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
  creation_date // Changé de creationDate à creation_date
) => {
  if (type) {
    // Pour une dépense récurrente (type === true)
    return pool.query(
      `INSERT INTO expenses (description, amount, type, start_date, end_date, user_id, category_id, receipt, creation_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *;`,
      [description, amount, type, start_date, end_date, user_id, category_id, receipt, creation_date]
    );
  } else {
    // Pour une dépense ponctuelle (type === false)
    return pool.query(
      `INSERT INTO expenses (description, amount, type, date, user_id, category_id, receipt, creation_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *;`,
      [description, amount, type, date, user_id, category_id, receipt, creation_date]
    );
  }
};

export const updateExpenseQuery = async (
  amount,
  date,
  category_id,
  description,
  type,
  start_date,
  end_date,
  id,
  receipt,
  creation_date // Ajouté pour cohérence, bien que non modifiable
) => {
  if (type) {
    // Pour une dépense récurrente (type === true)
    return pool.query(
      `UPDATE expenses 
       SET amount = $1, category_id = $2, description = $3, type = $4, start_date = $5, end_date = $6, receipt = $7, creation_date = $8
       WHERE id = $9 
       RETURNING *;`,
      [amount, category_id, description, type, start_date, end_date, receipt, creation_date, id]
    );
  } else {
    // Pour une dépense ponctuelle (type === false)
    return pool.query(
      `UPDATE expenses 
       SET amount = $1, category_id = $2, description = $3, type = $4, date = $5, receipt = $6, creation_date = $7
       WHERE id = $8 
       RETURNING *;`,
      [amount, category_id, description, type, date, receipt, creation_date, id]
    );
  }
};

export async function getAllByUser(userId) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC`,
    [userId]
  );
  return rows;
}

export async function getByIdForUser(userId, id) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return rows[0] || null;
}

export async function deleteForUser(userId, id) {
  const { rows } = await pool.query(
    `DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId]
  );
  return rows[0] || null;
}