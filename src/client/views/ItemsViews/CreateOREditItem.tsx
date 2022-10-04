import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewItem, Ingredients, NewItemReqBody } from "../../types";
import { apiService } from "../../services/apiService";
import { MultiValue } from "react-select";
import ReactSelect from "react-select";

const CreateItems = ({ editMode }: FormProps) => {
  const [editItem, setEditItem] = useState<NewItemReqBody>({ name: "", description: "", price: 0, maxQuantity: 0, currentQuantity: 0, ingredientsID: [] });
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
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
          item["ingredientsID"] = item["ingredientsID"].split(",").map((id: string) => ({
            value: Number(id),
            label: ingredients.filter((ingredient) => ingredient.id === Number(id))[0]?.name || "",
          }));
          console.log(item);
          setEditItem(item);
        })
        .catch((error) => console.log(error));
    }
  }, [ingredients]);

  useEffect(() => {
    //this fetches all the ingredients info
    apiService(`/api/ingredients`)
      .then((ingredient) => setIngredients(ingredient))
      .catch((error) => console.log(error));
  }, []);

  const handleItemIngredient = (
    e: MultiValue<{
      value: number | undefined;
      label: string;
    }>
  ) => {
    const ingredientsID = e.map((selectedItemIngredient) => selectedItemIngredient.value) as number[];
    // setEditItem({ ...editItem, ingredientsID });
    console.log(ingredientsID);
  };

  const handleUpdateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
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
          <form>
            <label>Item Name</label>
            <input className="form-control" type="text" placeholder="Enter Item here" value={editItem.name} name="name" onChange={handleUpdateForm}></input>

            <label>Item Description</label>
            <input className="form-control" type="text" placeholder="Enter Decription here" value={editItem.description} name="description" onChange={handleUpdateForm}></input>
            <ReactSelect
              value={editItem.ingredientsID}
              isMulti
              onChange={(e) => {
                handleItemIngredient(e);
                console.log(e);
              }}
              options={ingredients.map((ing) => ({ value: ing.id, label: ing.name }))}
            />

            <label>Item Price</label>
            <input className="form-control" type="number" placeholder="Enter Price here" value={editItem.price} name="price" onChange={handleUpdateForm}></input>

            {/* <label>Display Image</label> */}
            {/* Add file functionality here */}
            {/* <input className="form-control" type="file" placeholder="Enter Item here" value={editItem.displayImage} name="name" onChange={handleUpdateForm}></input> */}

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
