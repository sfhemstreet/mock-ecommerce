import {
  ADD_ITEM_TO_PRODUCT_HISTORY,
  REMOVE_ITEM_FROM_PRODUCT_HISTORY,
  DELETE_PRODUCT_HISTORY,
  productHistoryInitState,
  UPDATE_ITEM_IN_PRODUCT_HISTORY
} from "./productHistoryConstants";
import {
  ProductHistoryActionTypes,
  ProductHistoryState
} from "./productHistoryTypes";

export function productHistoryReducer(
  state = productHistoryInitState,
  action: ProductHistoryActionTypes
): ProductHistoryState {
  switch (action.type) {
    case ADD_ITEM_TO_PRODUCT_HISTORY:
      // check if item is in productHistory already
      const index = state.products.findIndex(product =>
        product.id === action.payload.item.id);
      // If item has index its in list already, do nothing
      if (index !== -1)
        return state;
      // Item is new, add to productHistory
      return {
        ...state,
        products: [...state.products, action.payload.item]
      }
    case UPDATE_ITEM_IN_PRODUCT_HISTORY:
      return {
        ...state,
        products: [...state.products.map(product =>
          product.id === action.payload.item.id ? action.payload.item : product)]
      }
    case REMOVE_ITEM_FROM_PRODUCT_HISTORY:
      return {
        ...state,
        products: [...state.products.filter(product =>
          product.id !== action.payload.item.id)]
      }
    case DELETE_PRODUCT_HISTORY:
      return productHistoryInitState;
    default:
      return state;
  }
}