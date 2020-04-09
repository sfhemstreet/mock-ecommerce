import { ADD_ITEM_TO_SHOPPING_CART, ADD_ALL_ITEMS_TO_SHOPPING_CART, REMOVE_ITEM_FROM_SHOPPING_CART, REMOVE_ALL_ITEMS_FROM_SHOPPING_CART } from "./shoppingCartConstants";

export type ShoppingCartItem = {
  productId: number;
  productName: string;
  productSize: string;
  productColor: string;
  quantity: number;
}

export type ShoppingCartState = {
  products: ShoppingCartItem[]
}

export interface AddShoppingCartItemAction {
  type: typeof ADD_ITEM_TO_SHOPPING_CART;
  payload: {
    item: ShoppingCartItem
  }
}

export interface AddAllShoppingCartItemsAction {
  type: typeof ADD_ALL_ITEMS_TO_SHOPPING_CART;
  payload: {
    items: ShoppingCartItem[]
  }
}

export interface RemoveShoppingCartItemAction {
  type: typeof REMOVE_ITEM_FROM_SHOPPING_CART;
  payload: {
    id: number
  }
}

export interface RemoveAllShoppingCartItemsAction {
  type: typeof REMOVE_ALL_ITEMS_FROM_SHOPPING_CART;
}

export type ShoppingCartActionTypes = AddShoppingCartItemAction | AddAllShoppingCartItemsAction | RemoveShoppingCartItemAction | RemoveAllShoppingCartItemsAction;
