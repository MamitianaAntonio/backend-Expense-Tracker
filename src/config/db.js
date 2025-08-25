const { Pool } = require("pg");

const poll = new poll({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db_name: process.env.DB_NAME
});