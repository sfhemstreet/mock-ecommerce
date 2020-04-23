import { ProductHistoryItem } from "./productHistoryTypes";

export const ADD_ITEM_TO_PRODUCT_HISTORY = "ADD_ITEM_TO_PRODUCT_HISTORY";
export const UPDATE_ITEM_IN_PRODUCT_HISTORY = "UPDATE_ITEM_IN_PRODUCT_HISTORY";
export const REMOVE_ITEM_FROM_PRODUCT_HISTORY = "REMOVE_ITEM_FROM_PRODUCT_HISTORY";
export const DELETE_PRODUCT_HISTORY = "DELETE_PRODUCT_HISTORY";
export const productHistoryInitState = {
  products: Array<ProductHistoryItem>()
}