import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authenticateUser = (req, res, next) => {
  const tokenAuth = req.header("Authorization");
  if (!tokenAuth) {
    res.status(401).json({
      message: "Please create an account or log in",
    });
  } else {
    let token = tokenAuth.startsWith("Bearer ")
      ? tokenAuth.slice(7)
      : tokenAuth;

    try {
      const decodedInformation = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedInformation;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Expired token.",
        });
      }
      return res.status(401).json({
        message: "Invalid token.",
      });
    }
  }
};
