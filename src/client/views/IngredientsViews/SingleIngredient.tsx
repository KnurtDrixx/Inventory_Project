import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { Ingredients } from "../../types";
import { Link, useParams, useNavigate } from "react-router-dom";

const SingleIngredients = () => {
  const [ingredient, setIngredient] = useState<Ingredients>();
  const id = useParams().id;

  useEffect(() => {
    apiService(`/api/ingredients/${id}`)
      .then((ingredient) => setIngredient(ingredient))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Single Item</h1>
      <div>
        <div>{ingredient ? ingredient.name : "loading"}</div>
      </div>
      <Link to={`/admin/Ingredients/edit/${id}`}>Edit Ingredient</Link>
    </>
  );
};

export default SingleIngredients;

//// to do add data here
