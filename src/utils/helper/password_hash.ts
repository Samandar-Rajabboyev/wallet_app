const bcrypt = require("bcrypt");

export const hashPwd = async (pwd: string) => {
  const salt = await bcrypt?.genSalt();

  return await bcrypt.hash(pwd, salt);
};

export const checkPwd = async (pwd: string, pwdHash: string | undefined) =>
  await bcrypt.compare(pwd, pwdHash);
