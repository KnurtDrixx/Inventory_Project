import { query } from "../index";
import { Ingredients } from "../../types";

const getOneIngredient = (id: number) => query<Ingredients[]>("SELECT * FROM Ingredients Where id = ?", [id]);
const getAllIngredients = () => query<Ingredients[]>("SELECT * FROM Ingredients", []);
const editOneIngredient = (updatedIngredient: Ingredients, id: number) => query("UPDATE Ingredients SET ? WHERE id = ?", [updatedIngredient, id]);
const createOneIngredient = (newIngredient: Ingredients) => query("INSERT INTO Ingredients SET ?", [newIngredient]);
const deleteOneIngredient = (id: number) => query("DELETE FROM Ingredients WHERE id = ?", [id]);

export default {
  getOneIngredient,
  getAllIngredients,
  editOneIngredient,
  createOneIngredient,
  deleteOneIngredient,
};
