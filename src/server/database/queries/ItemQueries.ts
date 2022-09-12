import { query } from "../index";
import { Items, ItemsWithIngredients, UpdateItem, NewItem } from "../../types";

//! might update to include ItemIngredientIDs
const getOneItem = (id: number) =>
  query<ItemsWithIngredients[]>(
    `select IT.*, group_concat(ING.name) as ingredients from Items as IT
join ItemIngredients as ITIN on ITIN.itemID = IT.id
join Ingredients as ING on ITIN.ingredientID = ING.id
Where IT.id =?
group by IT.id;`,
    [id]
  );

const getAllItems = () =>
  query<ItemsWithIngredients[]>(
    `select IT.*, group_concat(ING.name) as ingredients from Items as IT
join ItemIngredients as ITIN on ITIN.itemID = IT.id
join Ingredients as ING on ITIN.ingredientID = ING.id
group by IT.id;`,
    []
  );

const editOneItem = (updatedItem: UpdateItem, id: number) => query("UPDATE Items SET ? WHERE id = ?", [updatedItem, id]);
const createOneItem = (newItem: NewItem) => query("INSERT INTO Items SET ?", [newItem]);
const deleteOneItem = (id: number) => query("DELETE FROM Items WHERE id = ?", [id]);

export default {
  getOneItem,
  getAllItems,
  editOneItem,
  createOneItem,
  deleteOneItem,
};
