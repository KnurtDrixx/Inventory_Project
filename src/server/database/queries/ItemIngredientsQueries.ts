import { query } from "../index";
import { ItemIngredients } from "../../types";

//const getOneItemIngredient = (id: number) => query("SELECT * FROM ItemIngredients Where id = ?", [id]);
const getAll = () => query("SELECT * FROM ItemIngredients", []);
//const editOneItemIngredient = (updatedItemIngredient: ItemIngredients, id: number) => query("UPDATE ItemIngredients SET ? WHERE id = ?", [updatedItemIngredient, id]);
const createOne = (newItemIngredient: ItemIngredients) => query("INSERT INTO ItemIngredients SET ?", [newItemIngredient]);
const deleteOneByItemID = (id: number) => query("DELETE FROM ItemIngredients WHERE itemID = ?", [id]);
const deleteOneByIngredientID = (id: number) => query("DELETE FROM ItemIngredients WHERE ingredientID = ?", [id]);

export default {
  //getOneItemIngredient,
  getAll,
  //editOneItemIngredient,
  createOne,
  deleteOneByItemID,
  deleteOneByIngredientID,
};
