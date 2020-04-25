import { ShoppingCart, ShoppingCartProduct } from "./shoppingCartTypes";

export const ADD_ITEM_TO_SHOPPING_CART = "ADD_ITEM_TO_SHOPPING_CART";
export const ADD_ALL_ITEMS_TO_SHOPPING_CART = "ADD_ALL_ITEMS_TO_SHOPPING_CART";
export const REMOVE_ITEM_FROM_SHOPPING_CART = "REMOVE_ITEM_FROM_SHOPPING_CART";
export const REMOVE_ALL_ITEMS_FROM_SHOPPING_CART = "REMOVE_ALL_ITEMS_FROM_SHOPPING_CART";
export const EDIT_SHOPPING_CART_ITEM = "EDIT_SHOPPING_CART_ITEM";

export const shoppingCartInitState: ShoppingCart = {
  products: Array<ShoppingCartProduct>()
}