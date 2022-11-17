import * as React from "react";
import LocalStorageHandler from "../services/LocalStorageHandler";

const notLocalStorage = {
  getItem: {
    cart: [
      { id: 5, quantity: 1, price: 2.99 },
      { id: 3, quantity: 2, price: 8.99 },
    ],
  },
};
// notLocalStorage.getItem.cart

//! show items in cart as well as their names

const Checkout = () => {
  return (
    <>
      <h1>Checkout Page</h1>
    </>
  );
};

export default Checkout;
