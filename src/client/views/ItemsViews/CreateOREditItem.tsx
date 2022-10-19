import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewItem, Ingredients, NewItemReqBody, ReactSelectIngredients } from "../../types";
import { apiService } from "../../services/apiService";
import { MultiValue } from "react-select";
import ReactSelect from "react-select";

const CreateItems = ({ editMode }: FormProps) => {
  const [editItem, setEditItem] = useState<NewItemReqBody>({ name: "", description: "", price: 0, maxQuantity: 0, currentQuantity: 0, ingredientsID: [] });
  const [ingredients, setIngredients] = useState<ReactSelectIngredients[]>([]);
  const [itemIngredients, setItemIngredients] = useState<Ingredients[]>([]);

  const nav = useNavigate();

  const id = useParams().id;

  //this fetches the item to be editted
  useEffect(() => {
    if (!id && !editMode) {
      return;
    } else {
      apiService(`/api/items/${id}`)
        .then((item) => {
          // item["ingredientsID"] = item["ingredientsID"].split(",").map((id: string) => ({
          //   value: Number(id),
          //   label: ingredients.filter((ingredient) => ingredient.id === Number(id))[0]?.name || "",
          // }));
          item["ingredientsID"] = item["ingredientsID"].split(",").map((id: string) => {
            return Number(id);
          });
          // console.log(item);
          setEditItem(item);
        })
        .catch((error) => console.log(error));
    }
  }, [ingredients]);

  useEffect(() => {
    //this fetches all the ingredients info
    apiService(`/api/ingredients`)
      .then((ingredients: Ingredients[]) => setIngredients(ingredients.map((ing) => ({ value: ing.id, label: ing.name })) as []))
      .catch((error) => console.log(error));
  }, []);

  const handleItemIngredient = (
    e: MultiValue<{
      value: number | undefined;
      label: string;
    }>
  ) => {
    const ingredientsID = e.map((selectedItemIngredient) => selectedItemIngredient.value || selectedItemIngredient) as number[];
    console.log(e);
    setEditItem({ ...editItem, ingredientsID });
    console.log(ingredientsID);
  };

  const handleUpdateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    //at this point e.target.files exist

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("Food Photo", file);
    fetch("/uploads", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitItemChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const method = !editMode ? "POST" : "PUT";
    const url = !editMode ? "/api/items" : `/api/items/${id}`;
    apiService(url, method, editItem).then((res) => {
      if (editMode) {
        nav(`/admin/Items/${id}`);
      } else {
        nav(`/admin/Items/${res.id}`);
      }
    });
  };

  return (
    <>
      <h1>{!editMode ? `Add an Item` : `Edit an Item`}</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form className="form-control">
            <label>Item Name</label>
            <input className="form-control" type="text" placeholder="Enter Item here" value={editItem.name} name="name" onChange={handleUpdateForm}></input>

            <label>Item Description</label>
            <input className="form-control" type="text" placeholder="Enter Decription here" value={editItem.description} name="description" onChange={handleUpdateForm}></input>
            <ReactSelect
              isMulti
              value={editItem.ingredientsID!.map((ingID) => {
                const [matchedIngredient] = ingredients.filter((ing) => ing.value === ingID);
                return matchedIngredient;
              })}
              onChange={handleItemIngredient}
              options={ingredients as []}
            />

            <label>Item Price</label>
            <input className="form-control" type="number" placeholder="Enter Price here" value={editItem.price} name="price" onChange={handleUpdateForm}></input>

            <label>Display Image</label>
            {/* Add file functionality here */}
            <input className="form-control" type="file" name="name" onChange={handleImageUpload}></input>

            <label>Max Item Quantity</label>
            <input className="form-control" type="number" placeholder="Enter Max Quantity here" value={editItem.maxQuantity} name="maxQuantity" onChange={handleUpdateForm}></input>

            <label>Current Item Quantity</label>
            <input className="form-control" type="number" placeholder="Enter Current Quantity here" value={editItem.currentQuantity} name="currentQuantity" onChange={handleUpdateForm}></input>
            <button className="btn btn-success" onClick={submitItemChanges}>
              {!editMode ? `Create Item` : `Save Changes to Item`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

interface FormProps {
  editMode?: boolean;
}

export default CreateItems;
