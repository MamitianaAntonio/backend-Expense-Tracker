import { pool } from "../../config/db.js";

export const getUsersQuery = () => {
  return pool.query("select * from users");
};

export const createUserQuery = (email, password) => {
  return pool.query(
    `
    insert into users (email, password) 
    values ($1, $2) returning *;
`,
    [email, password],
  );
};
