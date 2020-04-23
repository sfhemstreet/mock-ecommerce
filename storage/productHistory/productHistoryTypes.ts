import { 
  ADD_ITEM_TO_PRODUCT_HISTORY, 
  REMOVE_ITEM_FROM_PRODUCT_HISTORY, 
  DELETE_PRODUCT_HISTORY, 
  productHistoryInitState,
  UPDATE_ITEM_IN_PRODUCT_HISTORY
} from "./productHistoryConstants";
import { ProductPreview } from "../../queries/types";

export interface ProductHistoryItem extends ProductPreview {
  timeViewed: number;
}

export interface AddItemToProductHistoryAction {
  type: typeof ADD_ITEM_TO_PRODUCT_HISTORY,
  payload: {
    item: ProductHistoryItem
  }
}

export interface UpdateItemInProductHistoryAction {
  type: typeof UPDATE_ITEM_IN_PRODUCT_HISTORY,
  payload: {
    item: ProductHistoryItem
  }
}

export interface RemoveItemFromProductHistoryAction {
  type: typeof REMOVE_ITEM_FROM_PRODUCT_HISTORY,
  payload: {
    item: ProductHistoryItem
  }
}

export interface DeleteProductHistoryAction {
  type: typeof DELETE_PRODUCT_HISTORY
}

export type ProductHistoryActionTypes =
  | AddItemToProductHistoryAction 
  | RemoveItemFromProductHistoryAction 
  | DeleteProductHistoryAction
  | UpdateItemInProductHistoryAction;

export type ProductHistoryState = typeof productHistoryInitState;

