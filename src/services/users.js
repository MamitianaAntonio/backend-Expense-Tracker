import { pool } from "../config/db.js";

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

export const getUserProfilQuery = (userId) => {
  return pool.query(
    `
    select email, start_date from users where id=$1
`,
    [userId],
  );
};
