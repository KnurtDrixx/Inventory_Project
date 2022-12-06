import { query } from "../index";
import { Items, ItemsWithIngredients, UpdateItem, NewItem, ItemTotal } from "../../types";

//! might update to include ItemIngredientIDs
const getOneItem = (id: number) =>
  query<ItemsWithIngredients[]>(
    `select IT.*, group_concat(ING.name) as ingredients, group_concat(ING.id) as ingredientsID from Items as IT
left join ItemIngredients as ITIN on ITIN.itemID = IT.id
left join Ingredients as ING on ITIN.ingredientID = ING.id
Where IT.id =?
group by IT.id;`,
    [id]
  );

const getAllItems = () =>
  query<ItemsWithIngredients[]>(
    `select IT.*, group_concat(ING.name) as ingredients from Items as IT
left join ItemIngredients as ITIN on ITIN.itemID = IT.id
left join Ingredients as ING on ITIN.ingredientID = ING.id
group by IT.id;`,
    []
  );

const editOneItem = (updatedItem: UpdateItem, id: number) => query("UPDATE Items SET ? WHERE id = ?", [updatedItem, id]);
const createOneItem = (newItem: NewItem) => query("INSERT INTO Items SET ?", [newItem]);
const deleteOneItem = (id: number) => query("DELETE FROM Items WHERE id = ?", [id]);
const getTotal = (id: number, quantity: number) => query<ItemTotal[]>("SELECT (price*?) as total FROM Items WHERE id=?;", [quantity, id]);

export default {
  getOneItem,
  getAllItems,
  editOneItem,
  createOneItem,
  deleteOneItem,
  getTotal,
};
