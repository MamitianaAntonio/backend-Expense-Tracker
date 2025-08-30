import { generateToken } from "../utils/function.js";
import { createUserQuery, getUsersQuery } from "../services/users.js";
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
    const createdUser = await createUserQuery(email, hachedPassword);
    const id = createdUser.rows[0].id;
    const [accessToken, refreshToken] = generateToken(email, id);

    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER.
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER.
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await getUsersQuery();
    const userData = users.rows.find((user) => {
      return user.email == email;
    });

    if (!userData) {
      res.status(404).json({
        message: "User not found",
      });
    }

    const isSamePassword = await bcrypt.compare(password, userData.password);

    if (!isSamePassword) {
      res.status(401).json({
        message: "Password doesn't match",
      });
    }
    const id = userData.id;
    console.log(id);
    const [accessToken, refreshToken] = generateToken(email, id);

    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      access: accessToken,
      refresh: refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookie.refresh;
    if (!refreshToken) {
      res.status(401).json({
        message: "No refresh found.",
      });
    }
    // AKA payload
    const decodedInformation = jwt.verify(
      refreshToken,
      process.env.REFRESH_ACCESS,
    );

    // Actually I don't resend a refreshToken, due to security issues.
    const [accessToken, _r] = generateToken(
      decodedInformation.email,
      decodedInformation.id,
    );

    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: false, // TODO: CHANGE THIS LATER
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Access token refreshed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
