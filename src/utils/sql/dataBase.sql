-- ===========================
-- Table : User
-- ===========================
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(250) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    start_date DATE DEFAULT CURRENT_DATE
);

-- ===========================
-- Table : Income
-- ===========================
CREATE TABLE IF NOT EXISTS Income (
    id SERIAL PRIMARY KEY,
    amount DOUBLE NOT NULL,
    date DATE default current_date,
    source VARCHAR(200),
    description VARCHAR(250),
    creation_date DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- ===========================
-- Table : Categorie
-- ===========================
CREATE TABLE Categorie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categorie_name VARCHAR(250) NOT NULL
);

-- ===========================
-- Table : Expense
-- ===========================
CREATE TABLE Expense (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_expense VARCHAR(200) NOT NULL,
    description VARCHAR(250),
    amount FLOAT NOT NULL,
    type BOOLEAN,
    date DATE,
    start_date DATE,
    end_date DATE,
    receipt BOOLEAN,
    upload BOOLEAN,
    user_id INT NOT NULL,
    categorie_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (categorie_id) REFERENCES Categorie(id)
);
