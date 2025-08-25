import {
  getIncomesBtwDateQuery,
  getIncomesQuery,
  getIncomesWthEndDateQuery,
  getIncomesWthStartDateQuery,
  postIncomeQuery,
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

export const getIncomesById = async (req, res) => {
  try {
    const email = req.user;
    const resultSet = await getIncomesQuery(email);
    const id = req.params.id;
    const income = resultSet.rows[id];
    res.status(200).json({
      data: income,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const postIncome = async (req, res) => {
  try {
    const id = req.user.id;
    const amount = req.body.amount;
    const date = req.body.date;
    const source = req.body.source;
    const description = req.body.description;

    await postIncomeQuery(id, amount, date, source, description);

    res.status(201).json({
      message: "Income created succesfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
