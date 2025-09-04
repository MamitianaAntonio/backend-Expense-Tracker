import { pool } from "../config/db.js";
export const getCategoriesQuery = (userId) => {
  return pool.query(
    `SELECT * FROM categories WHERE user_id = $1 or user_id = null ORDER BY id DESC;`,
    [userId],
  );
};
export const postCategoryQuery = (userId, name) => {
  return pool.query(
    `INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *;`,
    [name, userId],
  );
};
export const updateCategoryQuery = (userId, id, name) => {
  return pool.query(
    `UPDATE categories SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *;`,
    [name, id, userId],
  );
};
export const deleteCategoryQuery = (userId, id) => {
  return pool.query(
    `DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *;`,
    [id, userId],
  );
};
