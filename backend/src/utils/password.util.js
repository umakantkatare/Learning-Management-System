import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (plainPassword, hashPassword) => {
  const password = await bcrypt.compare(plainPassword, hashPassword);
  return password
};
export { hashPassword, comparePassword };
