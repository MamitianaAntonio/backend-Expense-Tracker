import {
  getExpensesSum,
  getIncomeSum,
  getMonthlyExpenses,
  getMonthlyIncome,
} from "../services/summary.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const start_date = req.query.start;
    const end_date = req.query.end || null;
    const expenseSummaryResultSet = await getExpensesSum(
      userId,
      start_date,
      end_date,
    );
    const expenseSummary = expenseSummaryResultSet.rows[0].sum;
    const incomeSummaryResultSet = await getIncomeSum(
      userId,
      start_date,
      end_date,
    );
    const incomeSummary = incomeSummaryResultSet.rows[0].sum;

    const remainingBlance = incomeSummary - expenseSummary;

    res.status(200).json({
      expense: expenseSummary,
      income: incomeSummary,
      balance: remainingBlance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMontlySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const monthAndYear = req.query.month;
    const year = monthAndYear.slice(0, 4) || null;
    const month = monthAndYear.slice(5, 7) || null;

    const expenseSummaryResultSet = await getMonthlyExpenses(
      userId,
      year,
      month,
    );
    const expenseSummary = expenseSummaryResultSet.rows[0].sum;
    const incomeSummaryResultSet = await getMonthlyIncome(userId, year, month);
    const incomeSummary = incomeSummaryResultSet.rows[0].sum;

    const remainingBlance = incomeSummary - expenseSummary;

    res.status(200).json({
      expense: expenseSummary,
      income: incomeSummary,
      balance: remainingBlance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
