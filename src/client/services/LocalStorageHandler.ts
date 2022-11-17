import { json } from "express";
interface cartItem {
  id: number;
  price: number;
  quantity: number;
}

const CART = "cart";

//function to get cart from local storage
const getCartFromStorage = (): cartItem[] => {
  const gotCart = localStorage.getItem(CART);

  if (!gotCart) {
    return [];
  }
  //at this point cart is either empty or has items from serverside
  return JSON.parse(gotCart);
};

//function to add item to cart
const addToCart = (item: cartItem) => {
  const haveCart = getCartFromStorage();
  //this returns an empty array or the items in the cart
  const fullCart = [...haveCart, item];
  //the items that are added to the cart are added to the cart
  localStorage.setItem(CART, JSON.stringify(fullCart));
  //adds updated cart to local storage
};

// function to update a single item's quantity in cart
const updateCart = (id: cartItem["id"], quantity: cartItem["quantity"]) => {
  const cartToBeUpdated = getCartFromStorage();
  //gets the cart from local storage
  for (let i = 0; i <= cartToBeUpdated.length; i++) {
    if (cartToBeUpdated[i].id === id) {
      cartToBeUpdated[i].quantity = quantity;
    }
  }
  localStorage.setItem(CART, JSON.stringify(cartToBeUpdated));
};

//function to clear All items in the cart
const obliterateCart = () => {
  localStorage.setItem(CART, JSON.stringify([]));
};

export default { getCartFromStorage, addToCart, updateCart, obliterateCart };
