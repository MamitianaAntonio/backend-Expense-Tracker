-- ===========================
-- Table: users
-- ===========================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(250),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    start_date DATE DEFAULT CURRENT_DATE
);

-- ===========================
-- Table: income
-- ===========================
CREATE TABLE IF NOT EXISTS income (
    id SERIAL PRIMARY KEY,
    amount DOUBLE PRECISION NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    source VARCHAR(200),
    description VARCHAR(250),
    creation_date DATE DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ===========================
-- Table: categories
-- ===========================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    user_id int,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

insert into categories values (1, 'Food', null), (2, 'Rent', null), (3, 'Daily need', null);

SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- ===========================
-- Table: expenses
-- ===========================
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(250),
    amount FLOAT NOT NULL,
    type BOOLEAN,
    date DATE,
    start_date DATE,
    end_date DATE,
    receipt TEXT,
    creationDate DATE DEFAULT CURRENT_DATE,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
