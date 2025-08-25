import {
  getIncomesBtwDateQuery,
  getIncomesQuery,
  getIncomesWthEndDateQuery,
  getIncomesWthStartDateQuery,
} from "../utils/sql/incomes.js";

export const getIncomes = async (req, res) => {
  try {
    const email = req.user.email;
    const start_date = req.query.start;
    const end_date = req.query.end;
    let listOfIncomes;
    if (start_date == undefined && end_date == undefined) {
      const resultSet = await getIncomesQuery(email);
      listOfIncomes = resultSet.rows;
    } else if (start_date != undefined || end_date != undefined) {
      if (start_date == undefined && end_date != undefined) {
        const resultSet = await getIncomesWthEndDateQuery(email, end_date);
        listOfIncomes = resultSet.rows;
      } else if (start_date != undefined && end_date == undefined) {
        const resultSet = await getIncomesWthStartDateQuery(email, start_date);
        listOfIncomes = resultSet.rows;
      } else {
        const resultSet = await getIncomesBtwDateQuery(
          email,
          start_date,
          end_date,
        );
        listOfIncomes = resultSet.rows;
      }
    }
    res.status(200).json({
      data: listOfIncomes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
