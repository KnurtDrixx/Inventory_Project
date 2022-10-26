import * as bcrypt from "bcrypt";

//creates a password and encrypts/ hashes it
const createPassword = (password: string) => {
  const hashed = bcrypt.hashSync(password, 12);
  return hashed;
};

//compares the hashed password to the decrypted password
const comparePassword = (password: string, hashedPassword: string) => {
  const doesMatch = bcrypt.compareSync(password, hashedPassword);
  return doesMatch;
};

export default { createPassword, comparePassword };
