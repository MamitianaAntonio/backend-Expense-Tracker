import { getUserProfilQuery } from "../utils/sql/users.js";

export const getUserProfil = async (req, res) => {
  try {
    const email = req.user.email;
    const userResultSet = await getUserProfilQuery(email);
    const userInformation = userResultSet.rows[0];
    res.status(200).json({
      email: userInformation.email,
      start_date: userInformation.start_date,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
