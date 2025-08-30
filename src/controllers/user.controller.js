import { getUserProfilQuery } from "../services/users.js";

export const getUserProfil = async (req, res) => {
  try {
    const id = req.user.id;
    const userResultSet = await getUserProfilQuery(id);
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
