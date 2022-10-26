import { query } from "../index";
import { Users } from "../../types";

//gets one user
const getOneUser = (email: string) => query<Users[]>("SELECT * FROM Users WHERE email = ?", [email]);
const createOneUser = (newUser: Users) => query("INSERT INTO Users SET ? ", [newUser]);
const deleteOneUser = (email: string) => query("DELETE FROM Users WHERE email = ?", [email]);

export default {
  getOneUser,
  createOneUser,
  deleteOneUser,
};
