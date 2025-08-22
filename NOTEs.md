## 🔐 1. Auth Routes

**Route File:** `src/routes/authRoutes.js`  
**Controller File:** `src/controllers/authController.js`

- [x] **POST /api/auth/signup**
  - Function: `signup()`
  - Middleware: none

- [x] **POST /api/auth/login**
  - Function: `login()`
  - Middleware: none

- [x] **GET /api/auth/me**
  - Function: `getMe()`
  - Middleware: `authMiddleware`

---

## 💸 2. Expense Routes

**Route File:** `src/routes/expenseRoutes.js`  
**Controller File:** `src/controllers/expenseController.js`

- [ ] **GET /api/expenses**
  - Function: `getAllExpenses()`
  - Middleware: `authMiddleware`

- [ ] **GET /api/expenses/:id**
  - Function: `getExpenseById()`
  - Middleware: `authMiddleware`

- [ ] **POST /api/expenses**
  - Function: `createExpense()`
  - Middleware:
    - `authMiddleware`
    - `multerMiddleware` (for file upload)

- [ ] **PUT /api/expenses/:id**
  - Function: `updateExpense()`
  - Middleware:
    - `authMiddleware`
    - `multerMiddleware`

- [ ] **DELETE /api/expenses/:id**
  - Function: `deleteExpense()`
  - Middleware: `authMiddleware`

---

## 🧾 3. Receipt Routes

**Route File:** `src/routes/receiptRoutes.js`  
**Controller File:** `src/controllers/receiptController.js`

- [ ] **GET /api/receipts/:id**
  - Function: `getReceipt()`
  - Middleware:
    - `authMiddleware`
    - `ownershipMiddleware` (to check file ownership)

---

## 💰 4. Income Routes

**Route File:** `src/routes/incomeRoutes.js`  
**Controller File:** `src/controllers/incomeController.js`

- [ ] **GET /api/incomes**
  - Function: `getAllIncomes()`
  - Middleware: `authMiddleware`

- [ ] **GET /api/incomes/:id**
  - Function: `getIncomeById()`
  - Middleware: `authMiddleware`

- [ ] **POST /api/incomes**
  - Function: `createIncome()`
  - Middleware: `authMiddleware`

- [ ] **PUT /api/incomes/:id**
  - Function: `updateIncome()`
  - Middleware: `authMiddleware`

- [ ] **DELETE /api/incomes/:id**
  - Function: `deleteIncome()`
  - Middleware: `authMiddleware`

---

## 🗂 5. Category Routes

**Route File:** `src/routes/categoryRoutes.js`  
**Controller File:** `src/controllers/categoryController.js`

- [ ] **GET /api/categories**
  - Function: `getAllCategories()`
  - Middleware: `authMiddleware`

- [ ] **POST /api/categories**
  - Function: `createCategory()`
  - Middleware: `authMiddleware`

- [ ] **PUT /api/categories/:id**
  - Function: `updateCategory()`
  - Middleware: `authMiddleware`

- [ ] **DELETE /api/categories/:id**
  - Function: `deleteCategory()`
  - Middleware: `authMiddleware`

---

## 📊 6. Summary Routes

**Route File:** `src/routes/summaryRoutes.js`  
**Controller File:** `src/controllers/summaryController.js`

- [ ] **GET /api/summary/monthly**
  - Function: `getMonthlySummary()`
  - Middleware: `authMiddleware`

- [ ] **GET /api/summary**
  - Function: `getSummaryByRange()`
  - Middleware: `authMiddleware`

- [ ] **GET /api/summary/alerts**
  - Function: `getSummaryAlerts()`
  - Middleware: `authMiddleware`

---

## 👤 7. User Profile Route

**Route File:** `src/routes/userRoutes.js`  
**Controller File:** `src/controllers/userController.js`

- [x] **GET /api/user/profile**
  - Function: `getProfile()`
  - Middleware: `authMiddleware`
