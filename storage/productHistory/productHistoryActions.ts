import { ProductHistoryActionTypes, ProductHistoryItem } from "./productHistoryTypes";
import { 
  ADD_ITEM_TO_PRODUCT_HISTORY, 
  REMOVE_ITEM_FROM_PRODUCT_HISTORY, 
  DELETE_PRODUCT_HISTORY,
  UPDATE_ITEM_IN_PRODUCT_HISTORY, 
  
} from "./productHistoryConstants";

export function addItemToProductHistory(item: ProductHistoryItem): ProductHistoryActionTypes {
  return {
    type: ADD_ITEM_TO_PRODUCT_HISTORY,
    payload: { item }
  }
}

export function updateItemInProductHistory(item: ProductHistoryItem): ProductHistoryActionTypes {
  return {
    type: UPDATE_ITEM_IN_PRODUCT_HISTORY,
    payload: { item }
  }
}

export function removeItemFromProductHistory(item: ProductHistoryItem): ProductHistoryActionTypes {
  return {
    type: REMOVE_ITEM_FROM_PRODUCT_HISTORY,
    payload: { item }
  }
}

export function deleteProductHistory(): ProductHistoryActionTypes {
  return {
    type: DELETE_PRODUCT_HISTORY
  }
}