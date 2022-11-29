import React from "react";
import { useState, useEffect } from "react";
import LocalStorageHandler from "../services/LocalStorageHandler";
import { ItemsWithIngredients } from "../types";
import { Link } from "react-router-dom";

const Menu = ({ item, isAdmin, hasChecked }: { item: ItemsWithIngredients; isAdmin: boolean; hasChecked: boolean }) => {
  const cart = LocalStorageHandler.getCartFromStorage();
  const foundItem = cart.find((i) => i.id === item.id);
  const startingValue = foundItem ? foundItem.quantity : 1;

  const [quantity, setQuantity] = useState(startingValue);
  const [hasBeenUpdated, setHasBeenUpdated] = useState(foundItem ? true : false);
  const handleCart = () => {
    LocalStorageHandler.updateCart(item!.name, item.id, item!.price, quantity);
    if (quantity === 0) {
      setHasBeenUpdated(false);
    } else {
      setHasBeenUpdated(true);
    }
  };
  return (
    <div className="card shadow">
      <img className="card-img-top" src={item.displayImage} alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <p>Contains: {item ? item.ingredients!.join(", ") : "loading ingredients"}</p>
        <p>Price: ${item.price}</p>

        <input className="form-control" min={0} value={quantity} type="number" onChange={(e) => setQuantity(e.target.valueAsNumber)}></input>
        <button className="btn btn-primary btn-lg" onClick={handleCart}>
          {hasBeenUpdated ? "Update Cart" : "Add to cart"}
        </button>

        {hasChecked && isAdmin && (
          <Link to={"/admin/Items/edit/:id"} className="btn btn-warning">
            Edit Item
          </Link>
        )}
        {hasChecked && isAdmin && <div>Current Quantity: {item.currentQuantity}</div>}
        {hasChecked && isAdmin && <div>Max Quantity: {item.maxQuantity}</div>}
      </div>
    </div>
  );
};

export default Menu;
