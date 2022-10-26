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
  ingredients: string;
}

export interface Users {
  id?: number;
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

export {};
declare global {
  namespace Express {
    interface Request {
      payload: Payload;
    }
  }
}

export interface Payload {
  id: number;
  email: string;
}
