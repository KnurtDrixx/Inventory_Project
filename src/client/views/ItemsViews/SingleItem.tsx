import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { Items } from "../../types";
import { Link, useParams, useNavigate } from "react-router-dom";
import LocalStorageHandler from "../../services/LocalStorageHandler";

const SingleItems = () => {
  const [item, setItem] = useState<Items>();
  const id = Number(useParams().id);

  useEffect(() => {
    apiService(`/api/items/${id}`)
      .then((item) => setItem(item))
      .catch((error) => console.log(error));
  }, []);
  //! add ingredients to be displayed for single item

  const handleCart = (quantity: number) => {
    LocalStorageHandler.updateCart(id, quantity);
  };

  return (
    <>
      <h1>Single Item</h1>
      <div>
        <div>{item ? item.name : "loading item name"}</div>
        <div>{item ? item.description : "loading description"}</div>
        <div>{item ? item.price : "loading price"}</div>
        <div>{item ? item.displayImage : "loading image"}</div>
        <div>{item ? item.maxQuantity : " loading max quantity"}</div>
        <div>{item ? item.currentQuantity : "loading current quantity"}</div>
      </div>
      <Link to={`/admin/Items/edit/${id}`}>Edit Item</Link>
      <div>Add to Cart</div>
      <input className="form-control" type="number" onChange={(e) => handleCart(e.target.valueAsNumber)}></input>
    </>
  );
};

export default SingleItems;
