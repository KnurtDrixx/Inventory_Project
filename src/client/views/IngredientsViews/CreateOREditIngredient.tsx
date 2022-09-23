import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ingredients } from "../../types";
import { apiService } from "../../services/apiService";

const CreateIngredients = ({ editMode }: FormProps) => {
  const [editIngredient, setEditIngredient] = useState<Ingredients>({ name: "" });

  const nav = useNavigate();

  //this fetches the ingredient to be editted
  useEffect(() => {
    if (!id && !editMode) {
      return;
    } else {
      apiService(`/api/ingredients/${id}`)
        .then((ingredient) => setEditIngredient(ingredient))
        .catch((error) => console.log(error));
    }
  }, []);

  const handleUpdateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditIngredient({ ...editIngredient, [e.target.name]: e.target.value });
  };

  const submitIngredientChanges = () => {
    const method = !editMode ? "POST" : "PUT";
    const url = !editMode ? "/api/ingredients" : `/api/ingredients/${id}`;
    apiService(url, method, editIngredient).then((res) => {
      if (editMode) {
        nav(`/admin/Ingredients/${id}`);
      } else {
        nav(`/admin/Ingredients/${res.id}`);
      }
    });
  };

  const id = useParams().id;

  return (
    <>
      <h1>{!editMode ? `Add an Ingredient` : `Edit an Ingredient`}</h1>
      <form>
        <label>Ingredient Name</label>
        <input type="text" placeholder="Enter Ingredient here" value={editIngredient.name} name="name" onChange={handleUpdateForm}></input>
      </form>
      <button onClick={submitIngredientChanges}>{!editMode ? `Create Ingredient` : `Save Changes to Ingredient`}</button>
    </>
  );
};

interface FormProps {
  editMode?: boolean;
}

export default CreateIngredients;
