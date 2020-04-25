import { ADD_ITEM_TO_WISHLIST, ADD_ALL_ITEMS_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST, REMOVE_ALL_ITEMS_FROM_WISHLIST, EDIT_WISHLIST_ITEM, wishlistInitState } from "./wishListConstants";
import { WishListActionTypes, WishList } from "./wishListTypes";

export const wishListReducer = (state = wishlistInitState, action: WishListActionTypes): WishList => {
  switch (action.type) {
    case ADD_ITEM_TO_WISHLIST:
      // check if item is in products already
      const indexOfProduct = state.products.findIndex(product => product.id === action.payload.item.id);
      if (indexOfProduct !== -1) {
        return state;
      }

      // item is not already in wishlist, just add it to products
      return { ...state, products: [...state.products, action.payload.item] }

    case ADD_ALL_ITEMS_TO_WISHLIST:
      return { ...state, products: [...action.payload.items] }

    case REMOVE_ITEM_FROM_WISHLIST:
      return {
        ...state,
        products: [...state.products.filter(product =>
          product.id !== action.payload.id
        )]
      }

    case REMOVE_ALL_ITEMS_FROM_WISHLIST:
      return { ...state, products: [] }

    default:
      return state;
  }
}