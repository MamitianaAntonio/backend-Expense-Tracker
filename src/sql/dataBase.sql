
CREATE USER me WITH PASSWORD my_passwd;

CREATE DATABASE expenseTracker OWNER me;

\c expenseTracker;


GRANT ALL PRIVILEGES ON TABLE users TO me;


CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(250) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    start_date DATE
);

CREATE TABLE Income (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DOUBLE NOT NULL,
    date DATE NOT NULL,
    source VARCHAR(200),
    description VARCHAR(250),
    creation_date DATE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);


CREATE TABLE Categorie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categorie_name VARCHAR(250) NOT NULL
);


CREATE TABLE Expense (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_expense VARCHAR(200) NOT NULL,
    description VARCHAR(250),
    amount FLOAT NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
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

