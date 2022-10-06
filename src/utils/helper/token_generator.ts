const jwt = require("jsonwebtoken");

export const generateToken = (username: string): string => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;

  return jwt.sign({ username }, accessSecret);
};

export const verifyToken = async (token: string) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;

  return await jwt.verify(token, accessSecret);
};
