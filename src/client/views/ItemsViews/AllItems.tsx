import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { Items, ItemsWithIngredients } from "../../types";
import { Link } from "react-router-dom";

const AllItems = () => {
  const [items, setItems] = useState<ItemsWithIngredients[]>([]);

  useEffect(() => {
    apiService("/api/items")
      .then((item) => setItems(item))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1>Items List</h1>
        {items.map((item) => (
          <div>
            <Link to={`/admin/Items/${item.id}`}>
              <div>{item.name}</div>
            </Link>
            <div>{item.description}</div>
            <div>Contains: {item ? item.ingredients!.join(", ") : "loading ingredients"}</div>
            <div>Price: ${item.price}</div>
            <div>{item.displayImage}</div>
            <div>Max Quantity: {item.maxQuantity}</div>
            <div>Current Quantity: {item.currentQuantity}</div>
          </div>
        ))}
        <Link to={`/admin/Items/new`}>Add an Item to the list</Link>
      </div>
    </>
  );
};

export default AllItems;

//! populate this with data
