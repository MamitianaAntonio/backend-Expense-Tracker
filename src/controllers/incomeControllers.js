import {
  getIncomesBtwDateQuery,
  getIncomesQuery,
  getIncomesWthEndDateQuery,
  getIncomesWthStartDateQuery,
  postIncomeQuery,
} from "../utils/sql/incomes.js";

export const getIncomes = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(" id is this " + id);
    const start_date = req.query.start;
    const end_date = req.query.end;
    let listOfIncomes;
    if (start_date == undefined && end_date == undefined) {
      const resultSet = await getIncomesQuery(id);
      listOfIncomes = resultSet.rows;
    } else if (start_date != undefined || end_date != undefined) {
      if (start_date == undefined && end_date != undefined) {
        const resultSet = await getIncomesWthEndDateQuery(id, end_date);
        listOfIncomes = resultSet.rows;
      } else if (start_date != undefined && end_date == undefined) {
        const resultSet = await getIncomesWthStartDateQuery(id, start_date);
        listOfIncomes = resultSet.rows;
      } else {
        const resultSet = await getIncomesBtwDateQuery(
          id,
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
    const id = req.user.id;
    const resultSet = await getIncomesQuery(id);
    const idx = req.params.id;
    const income = resultSet.rows[idx];
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
