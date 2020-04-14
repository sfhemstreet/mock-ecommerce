import { ADD_ITEM_TO_SHOPPING_CART, ADD_ALL_ITEMS_TO_SHOPPING_CART, REMOVE_ITEM_FROM_SHOPPING_CART, REMOVE_ALL_ITEMS_FROM_SHOPPING_CART } from "./shoppingCartConstants";
import { StoredProduct } from "../types";
import { ShoppingCartActionTypes } from "./shoppingCartTypes";

export function addItemToShoppingCart(item: StoredProduct): ShoppingCartActionTypes {
  return {
    type: ADD_ITEM_TO_SHOPPING_CART,
    payload: { item }
  }
}

export function addAllItemsToShoppingCart(items: StoredProduct[]): ShoppingCartActionTypes {
  return {
    type: ADD_ALL_ITEMS_TO_SHOPPING_CART,
    payload: { items }
  }
}

export function removeItemFromShoppingCart(itemId: string): ShoppingCartActionTypes {
  return {
    type: REMOVE_ITEM_FROM_SHOPPING_CART,
    payload: { id: itemId }
  }
}

export function removeAllItemsFromShoppingCart(): ShoppingCartActionTypes {
  return {
    type: REMOVE_ALL_ITEMS_FROM_SHOPPING_CART
  }
}