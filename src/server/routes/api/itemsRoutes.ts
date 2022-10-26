import * as express from "express";
import Items from "../../database/queries/ItemQueries";
import ItemIngredients from "../../database/queries/ItemIngredientsQueries";
import { NewItem, NewItemReqBody, UpdateItem, updateItemReqBody } from "../../types";
import isValidToken from "../../utilities/tokenCheck";

const itemsRouter = express.Router();

//curent path is /api/items

//gets all Items
itemsRouter.get("/", async (req, res) => {
  try {
    const items = await Items.getAllItems();
    const itemsWithIngredientArray = items.map((item) => ({
      ...item,
      ingredients: item.ingredients.split(","),
    }));
    res.json(itemsWithIngredientArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a getAllItems error occured" });
  }
});

//get one Item
itemsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await Items.getOneItem(id);
    if (item.length) {
      const itemsWithIngredientArray = item.map((item) => ({
        ...item,
        ingredients: item.ingredients.split(","),
      }));
      res.json(itemsWithIngredientArray[0]);
    } else {
      res.status(400).json({ msg: "You are looking for an item that doesnt exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a getOneItem error occured" });
  }
});

//create an item
//add token check middleware
itemsRouter.post("/", isValidToken, async (req, res) => {
  const { name, description, price, displayImage, maxQuantity, currentQuantity, ingredientsID }: NewItemReqBody = req.body;
  if (!name) return res.status(400).json({ msg: "Please provide a name for the item." });
  if (!description) return res.status(400).json({ msg: "Please provide a description for the item." });
  if (!price) return res.status(400).json({ msg: "Please provide a price for the item." });
  //at this point name, description, and price exist

  const newItem: NewItem = { name, description, price };

  if (displayImage) newItem.displayImage = displayImage;
  if (maxQuantity) newItem.maxQuantity = maxQuantity;
  if (currentQuantity) newItem.currentQuantity = currentQuantity;

  // at this point newItem could have any combination of displayImage, maxQuantity, and currentQuantity

  try {
    const createItem = await Items.createOneItem(newItem);
    if (ingredientsID && ingredientsID.length) {
      for await (const ingredientID of ingredientsID) {
        await ItemIngredients.createOne({ itemID: createItem.insertId, ingredientID });
      }
    }
    res.json({ id: createItem.insertId, msg: "The item has been created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a createOneItem error occured" });
  }
});

//edit an item
//add token check middleware
//add ability to add or remove ingredients?
itemsRouter.put("/:id", isValidToken, async (req, res) => {
  const id = Number(req.params.id);
  const { name, description, price, displayImage, maxQuantity, currentQuantity, ingredientsID }: updateItemReqBody = req.body;
  const updateItem: UpdateItem = {};

  if (name) updateItem.name = name;
  if (description) updateItem.description = description;
  if (price) updateItem.price = price;
  if (displayImage) updateItem.displayImage = displayImage;
  if (maxQuantity) updateItem.maxQuantity = maxQuantity;
  if (currentQuantity) updateItem.currentQuantity = currentQuantity;

  //at this point updateItem could have any combinaton of properties of UpdateItem type

  try {
    await Items.editOneItem(updateItem, id);
    if (ingredientsID) {
      await ItemIngredients.deleteOneByItemID(id);
      if (ingredientsID.length) {
        for await (const ingredientID of ingredientsID) {
          await ItemIngredients.createOne({ itemID: id, ingredientID });
        }
      }
    }
    res.json({ msg: "The item has been updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a editOneItem error occured" });
  }
});

//delete an item
//add token check middleware
itemsRouter.delete("/:id", isValidToken, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await ItemIngredients.deleteOneByItemID(id);
    await Items.deleteOneItem(id);
    res.json({ msg: "Item has been deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a deleteOneItem error occured" });
  }
});

export default itemsRouter;
