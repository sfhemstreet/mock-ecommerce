
import { ShoppingCartActionTypes, ShoppingCartProduct } from "./shoppingCartTypes";
import { ADD_ITEM_TO_SHOPPING_CART, ADD_ALL_ITEMS_TO_SHOPPING_CART, EDIT_SHOPPING_CART_ITEM, REMOVE_ITEM_FROM_SHOPPING_CART, REMOVE_ALL_ITEMS_FROM_SHOPPING_CART } from "./shoppingCartConstants";

export function addItemToShoppingCart(item: ShoppingCartProduct): ShoppingCartActionTypes {
  return {
    type: ADD_ITEM_TO_SHOPPING_CART,
    payload: { item }
  }
}

export function addAllItemsToShoppingCart(items: ShoppingCartProduct[]): ShoppingCartActionTypes {
  return {
    type: ADD_ALL_ITEMS_TO_SHOPPING_CART,
    payload: { items }
  }
}

export function editShoppingCartItem(item: ShoppingCartProduct): ShoppingCartActionTypes {
  return {
    type: EDIT_SHOPPING_CART_ITEM,
    payload: { item }
  }
}

export function removeItemFromShoppingCart(itemId: string, timeAdded: number): ShoppingCartActionTypes {
  return {
    type: REMOVE_ITEM_FROM_SHOPPING_CART,
    payload: { id: itemId, timeAdded }
  }
}

export function removeAllItemsFromShoppingCart(): ShoppingCartActionTypes {
  return {
    type: REMOVE_ALL_ITEMS_FROM_SHOPPING_CART
  }
}