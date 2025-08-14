import fs from "fs";

export const readFileContent = (path) => {
  try {
    const data = fs.readFileSync(path);
    return data;
  } catch (error) {
    console.error("Couldn't read file: " + error);
  }
};
