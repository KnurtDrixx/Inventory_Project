import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { Ingredients } from "../../types";
import { Link } from "react-router-dom";

const AllIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  useEffect(() => {
    apiService("/api/ingredients")
      .then((ingredient) => setIngredients(ingredient))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1>Ingredients List</h1>
        {ingredients.map((ingredient) => (
          <Link to={`/admin/ingredients/${ingredient.id}`}>
            <div>{ingredient.name}</div>
          </Link>
        ))}
        <Link to={`/admin/Ingredients/new`}>Add an Ingredient to the list</Link>
      </div>
    </>
  );
};

export default AllIngredients;

//// populate this with data
