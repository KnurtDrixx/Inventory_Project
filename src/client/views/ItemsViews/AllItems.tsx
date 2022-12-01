import * as React from "react";
import { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { Items, ItemsWithIngredients } from "../../types";
import { Link } from "react-router-dom";
import Menu from "../../components/MenuDisplay";
import { v4 } from "uuid";

const AllItems = () => {
  const [items, setItems] = useState<ItemsWithIngredients[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    apiService("/api/items")
      .then((item) => setItems(item))
      .catch((error) => console.log(error));
    apiService("/auth/verify")
      .then(() => setIsAdmin(true))
      .catch((error) => console.log(error))
      .finally(() => setHasChecked(true));
  }, []);

  //at this point the item data has been fetched and the user has been verified.

  return (
    <>
      <div>
        <h1>Items List</h1>
        <div className="row ">
          {items.map((item) => (
            <div className="col-md-3 col-sm-4" key={v4()}>
              <Menu item={item} isAdmin={isAdmin} hasChecked={hasChecked}></Menu>
            </div>
          ))}
        </div>
        {hasChecked && isAdmin && <Link to={`/admin/Items/new`}>Add an Item to the list</Link>}
      </div>
    </>
  );
};

export default AllItems;

//! populate this with data

// <div>
//   <Link to={`/admin/Items/${item.id}`}>
//     <div>{item.name}</div>
//   </Link>
//   <div>{item.description}</div>
//   <div>Contains: {item ? item.ingredients!.join(", ") : "loading ingredients"}</div>
//   <div>Price: ${item.price}</div>
//   <div>{item.displayImage}</div>
//   <div>Max Quantity: {item.maxQuantity}</div>
//   <div>Current Quantity: {item.currentQuantity}</div>
// </div>
