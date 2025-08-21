import { createUserQuery, getUsersQuery } from "../utils/sql/users.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await getUsersQuery();
    if (users.rows.some((user) => user.email === email)) {
      return res.status(409).json({
        message: "You cannot create account twice.",
      });
    }
    const hachedPassword = await bcrypt.hash(password, 10);
    const accountCreated = await createUserQuery(email, hachedPassword);

    // BETA TEST.
    res.status(201).json({
      message: "user created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
