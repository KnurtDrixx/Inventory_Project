import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { Items } from "../../types";
import { Link } from "react-router-dom";

const AllItems = () => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    apiService("/api/items")
      .then((item) => setItems(item))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1>Items List</h1>
        {items.map((item) => {
          <Link to={`items/${item.id}`}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.displayImage}</div>
            <div>{item.maxQuantity}</div>
            <div>{item.currentQuantity}</div>
          </Link>;
        })}
        <Link to={`/admin/Items/new`}>Add an Item to the list</Link>
      </div>
    </>
  );
};

export default AllItems;

//! populate this with data
