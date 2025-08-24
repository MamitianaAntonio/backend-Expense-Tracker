const pool = require("../config/db");

async function create(userId, { title, amount, category,description, filePath }) {
  const { rows } = await pool.query(
    `INSERT INTO expenses (user_id, title, amount, category, description, file_path)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [userId, title, amount, category || "Other", description, filePath || null]
  );
  return rows[0];
}

async function getAllByUser(userId) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE user_id=$1 ORDER BY date DESC`,
    [userId]
  );
  return rows;
}

async function getByIdForUser(userId, id) {
  const { rows } = await pool.query(
    `SELECT * FROM expenses WHERE id=$1 AND user_id=$2`,
    [id, userId]
  );
  return rows[0] || null;
}

async function updateForUser(userId, id, { title, amount, category, description, filePath }) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (title !== undefined) { fields.push(`title=$${idx++}`); values.push(title); }
  if (amount !== undefined) { fields.push(`amount=$${idx++}`); values.push(amount); }
  if (category !== undefined) { fields.push(`category=$${idx++}`); values.push(category); }
  if (description !== undefined) { fields.push(`description=$${idx++}`); values.push(description); }
  if (filePath !== undefined) { fields.push(`file_path=$${idx++}`); values.push(filePath); }

  if (fields.length === 0) {
    const current = await getByIdForUser(userId, id);
    return current;
  }

  values.push(id);
  values.push(userId);

  const { rows } = await pool.query(
    `UPDATE expenses SET ${fields.join(", ")}
     WHERE id=$${idx++} AND user_id=$${idx}
     RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function deleteForUser(userId, id) {
  const { rows } = await pool.query(
    `DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *`,
    [id, userId]
  );
  return rows[0] || null;
}

module.exports = { create, getAllByUser, getByIdForUser, updateForUser, deleteForUser };
