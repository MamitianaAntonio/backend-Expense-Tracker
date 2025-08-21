import { generateToken } from "../utils/function.js";
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
    await createUserQuery(email, hachedPassword);

    const [access, refresh] = generateToken(email);

    res.cookie("access", access, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh", refresh, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // BETA TEST.
    res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
