import pool from '../config/db.js';

export async function create(userId, { title, amount, date, category_id, description, is_recurring, start_date, end_date, receipt, upload, file_path }) {
  const { rows } = await pool.query(
    `INSERT INTO expenses (user_id, title, amount, date, category_id, description, is_recurring, start_date, end_date, receipt, upload, file_path)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [
      userId,
      title,
      amount,
      date || null,
      category_id,
      description || null,
      is_recurring || false,
      start_date || null,
      end_date || null,
      receipt || null,
      upload || null,
      file_path || null
    ]
  );
  return rows[0];
}

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

export async function updateForUser(userId, id, { title, amount, date, category_id, description, is_recurring, start_date, end_date, receipt, upload, file_path }) {
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (amount !== undefined) updates.amount = amount;
  if (date !== undefined) updates.date = date;
  if (category_id !== undefined) updates.category_id = category_id;
  if (description !== undefined) updates.description = description;
  if (is_recurring !== undefined) updates.is_recurring = is_recurring;
  if (start_date !== undefined) updates.start_date = start_date;
  if (end_date !== undefined) updates.end_date = end_date;
  if (receipt !== undefined) updates.receipt = receipt;
  if (upload !== undefined) updates.upload = upload;
  if (file_path !== undefined) updates.file_path = file_path;

  if (Object.keys(updates).length === 0) {
    return await getByIdForUser(userId, id);
  }

  const setClause = Object.keys(updates)
    .map((key, index) => `${key}=$${index + 1}`)
    .join(', ');
  const values = [...Object.values(updates), id, userId];

  const { rows } = await pool.query(
    `UPDATE expenses SET ${setClause} WHERE id=$${values.length - 1} AND user_id=$${values.length} RETURNING *`,
    values
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