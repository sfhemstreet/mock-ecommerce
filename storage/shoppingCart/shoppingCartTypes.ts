import { 
  ADD_ITEM_TO_SHOPPING_CART, 
  ADD_ALL_ITEMS_TO_SHOPPING_CART,
  REMOVE_ITEM_FROM_SHOPPING_CART, 
  REMOVE_ALL_ITEMS_FROM_SHOPPING_CART 
} from "./shoppingCartConstants";
import { StoredProduct } from "../types";

export interface AddShoppingCartItemAction {
  type: typeof ADD_ITEM_TO_SHOPPING_CART;
  payload: {
    item: StoredProduct
  }
}

export interface AddAllShoppingCartItemsAction {
  type: typeof ADD_ALL_ITEMS_TO_SHOPPING_CART;
  payload: {
    items: StoredProduct[]
  }
}

export interface RemoveShoppingCartItemAction {
  type: typeof REMOVE_ITEM_FROM_SHOPPING_CART;
  payload: { id: string }
}

export interface RemoveAllShoppingCartItemsAction {
  type: typeof REMOVE_ALL_ITEMS_FROM_SHOPPING_CART;
}

export type ShoppingCartActionTypes = AddShoppingCartItemAction | AddAllShoppingCartItemsAction | RemoveShoppingCartItemAction | RemoveAllShoppingCartItemsAction;
