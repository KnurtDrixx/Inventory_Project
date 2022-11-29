import { json } from "express";
interface cartItem {
  name: string;
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
  return JSON.parse(gotCart).filter((item: cartItem) => item.quantity);
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
const updateCart = (name: cartItem["name"], id: cartItem["id"], price: cartItem["price"], quantity: cartItem["quantity"]) => {
  let cartToBeUpdated = getCartFromStorage();
  //gets the cart from local storage

  let itemInCart = false;
  for (let i = 0; i <= cartToBeUpdated.length; i++) {
    if (cartToBeUpdated[i]?.id === id) {
      cartToBeUpdated[i].quantity = quantity;
      itemInCart = true;
    }
  }
  if (!itemInCart) {
    cartToBeUpdated.push({ name, id, price, quantity });
    itemInCart = true;
  }

  cartToBeUpdated = cartToBeUpdated.filter((item) => item.quantity);

  localStorage.setItem(CART, JSON.stringify(cartToBeUpdated));
};

//function to clear All items in the cart
const obliterateCart = () => {
  localStorage.setItem(CART, JSON.stringify([]));
};

//function to add all item prices in cart together
const getPriceFromCart = () => {
  const cartToBePriced = getCartFromStorage();
  let totalPrice = 0;
  cartToBePriced.forEach((item) => {
    let singleItemPrice = item.quantity * item.price;
    totalPrice += singleItemPrice;
  });
  //at this point total price has been updated with every item ultiplied by the quantity
  return totalPrice;
};

export default { getCartFromStorage, addToCart, updateCart, obliterateCart, getPriceFromCart };
