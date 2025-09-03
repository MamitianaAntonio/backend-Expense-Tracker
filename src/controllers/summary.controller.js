import { getExpensesSum, getIncomeSum } from "../services/summary.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseSummaryResultSet = await getExpensesSum(userId);
    const expenseSummary = expenseSummaryResultSet.rows[0].sum;
    const incomeSummaryResultSet = await getIncomeSum(userId);
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
