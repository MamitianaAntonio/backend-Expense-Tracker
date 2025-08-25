import jwt from "jsonwebtoken";
import fs from "fs";
import { config } from "dotenv";

config();

export const readFileContent = (path) => {
  try {
    const data = fs.readFileSync(path);
    return data;
  } catch (error) {
    console.error("Couldn't read file: " + error);
  }
};

export const generateToken = (email, id) => {
  const access = jwt.sign({ email, id }, process.env.SECRET_ACCESS, {
    expiresIn: "7d",
  });
  const refresh = jwt.sign({ email, id }, process.env.REFRESH_ACCESS, {
    expiresIn: "30d",
  });
  return [access, refresh];
};
