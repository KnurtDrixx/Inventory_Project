import * as express from "express";
import Ingredients from "../../database/queries/IngredientsQueries";
import ItemIngredientsQueries from "../../database/queries/ItemIngredientsQueries";
import isValidToken from "../../utilities/tokenCheck";

const IngredientsRouter = express.Router();

//current path is /api/ingredients
//get all ingredients
IngredientsRouter.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredients.getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a getAllIngredients error occurred" });
  }
});

//get one ingredient
IngredientsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const ingredient = await Ingredients.getOneIngredient(id);
    if (ingredient.length) {
      res.json(ingredient[0]);
    } else {
      res.status(400).json({ msg: "You are looking for an ingredient that doesnt exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a getOneIngredient error occurred" });
  }
});

//create an ingredient
IngredientsRouter.post("/", isValidToken, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Please provide a name for the item." });
  //at this point the name of the ingredient exists

  const newIngredient = { name };
  try {
    const createIngredient = await Ingredients.createOneIngredient(newIngredient);
    res.json({ msg: "The Ingredient has been created successfully", id: createIngredient.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a createOneIngredient error occured" });
  }
});

//edit an ingredient
IngredientsRouter.put("/:id", isValidToken, async (req, res) => {
  const id = Number(req.params.id);

  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Please provide a name for the item." });
  //at this point the name of the ingredient exists

  try {
    const updatedIngredient = await Ingredients.editOneIngredient({ name }, id);
    res.json({ msg: "The Ingredient has been updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a editOneIngredient error occured" });
  }
});

//delete an ingredient
IngredientsRouter.delete("/:id", isValidToken, async (req, res) => {
  const id = Number(req.params.id);
  try {
    await ItemIngredientsQueries.deleteOneByIngredientID(id);
    await Ingredients.deleteOneIngredient(id);
    res.json({ msg: "The ingredient has been successully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "a deleteOneIngredient error occured" });
  }
});

export default IngredientsRouter;
