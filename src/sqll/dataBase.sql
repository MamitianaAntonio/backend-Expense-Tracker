-- ===========================
-- Table : User
-- ===========================
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(250) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    start_date DATE
);

-- ===========================
-- Table : Income
-- ===========================
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

-- ===========================
-- Données initiales pour User
-- ===========================
INSERT INTO User (user_name, email, password, start_date) VALUES
("Jean Dupont", "jean.dupont@example.com", 'pass123', '2025-01-01'),
("Marie Curie0", "marie.curie@example.com", 'pass456', '2025-02-10');

-- ===========================
-- Données initiales pour Categorie
-- ===========================
INSERT INTO Categorie (categorie_name) VALUES
('Logement'),
('Alimentation'),
('Transport'),
('Loisirs');

-- ===========================
-- Données initiales pour Income
-- ===========================
INSERT INTO Income (amount, date, source, description, creation_date, user_id) VALUES
(2500.00, '2025-01-05', "Salaire", 'Salaire mensuel', '2025-01-05', 1),
(150.00, '2025-01-10', "Vente", "Vente d'objet", '2025-01-10', 2);

-- ===========================
-- Données initiales pour Expense
-- ===========================
INSERT INTO Expense (name_expense, description, amount, type, date, start_date, end_date, receipt, upload, user_id, categorie_id) VALUES
('Loyer Janvier', 'Paiement du loyer', 800.00, TRUE, '2025-01-01', NULL, NULL, TRUE, FALSE, 1, 1),
('Courses', 'Supermarché', 120.50, TRUE, '2025-01-15', NULL, NULL, FALSE, FALSE, 1, 2),
('Essence', 'Carburant', 60.00, TRUE, '2025-01-18', NULL, NULL, FALSE, FALSE, 2, 3);
