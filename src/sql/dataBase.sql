CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(250) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  start_date DATE
);

CREATE TABLE income (
  id SERIAL PRIMARY KEY,
  amount DOUBLE PRECISION NOT NULL,
  date DATE NOT NULL,
  source VARCHAR(200),
  description VARCHAR(250),
  creation_date DATE,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(250) NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  amount FLOAT NOT NULL,
  date DATE,
  category_id INT NOT NULL,
  description VARCHAR(250),
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  start_date DATE,
  end_date DATE,
  receipt BOOLEAN,
  upload BOOLEAN,
  file_path VARCHAR(500),
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_category_id ON expenses(category_id);