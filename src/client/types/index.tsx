import React from "react";

export interface IFetchOptions {
  method: string;
  headers?: HeadersInit;
  body?: string;
}

export interface Items {
  id: number;
  name: string;
  description: string;
  price: number;
  displayImage: string;
  maxQuantity: number;
  currentQuantity: number;
}

export interface NewItem {
  name: string;
  description: string;
  price: number;
  displayImage?: string;
  maxQuantity?: number;
  currentQuantity?: number;
}

export interface NewItemReqBody extends NewItem {
  ingredientsID?: number[];
}

export interface UpdateItem {
  name?: string;
  description?: string;
  price?: number;
  displayImage?: string;
  maxQuantity?: number;
  currentQuantity?: number;
}

export interface updateItemReqBody extends UpdateItem {
  ingredientsID?: number[];
}

export interface ItemsWithIngredients extends Items {
  ingredients?: string[];
}

export interface Users {
  id: number;
  email: string;
  password: string;
}

export interface ItemIngredients {
  itemID: Items["id"];
  ingredientID: Ingredients["id"];
}

export interface Ingredients {
  id?: number;
  name: string;
}

export interface ReactSelectIngredients {
  value: Ingredients["id"];
  label: Ingredients["name"];
}

export interface PrivateWrapperProps {
  children: React.ReactChild;
}
