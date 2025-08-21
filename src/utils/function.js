import jwt from "jsonwebtoken";
import fs from "fs";

export const readFileContent = (path) => {
  try {
    const data = fs.readFileSync(path);
    return data;
  } catch (error) {
    console.error("Couldn't read file: " + error);
  }
};

export const generateToken = (email) => {
  const access = jwt.sign(email, process.env.SECRET_ACCESS, {
    expiresIn: "7d",
  });
  const refresh = jwt.sign(email, process.env.REFRESH_ACCESS, {
    expiresIn: "30d",
  });
  return [access, refresh];
};
