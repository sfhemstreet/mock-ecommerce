import { WishListState, WishListItem, WishListActionTypes } from "./wishListTypes";
import { ADD_ITEM_TO_WISHLIST, ADD_ALL_ITEMS_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST, REMOVE_ALL_ITEMS_FROM_WISHLIST } from "./wishListConstants";


const wishListInitState: WishListState = {
  products: new Array<WishListItem>()
}


export const wishListReducer = (state = wishListInitState, action: WishListActionTypes): WishListState  => {
  switch (action.type) {
    case ADD_ITEM_TO_WISHLIST:
      return {
        products: [...state.products, action.payload.item]
      }
    case ADD_ALL_ITEMS_TO_WISHLIST:
      return {
        products: [...state.products, ...action.payload.items]
      }
    case REMOVE_ITEM_FROM_WISHLIST:
      return {
        products: [...state.products.filter(product => product.productId !== action.payload.id)]
      }
    case REMOVE_ALL_ITEMS_FROM_WISHLIST:
      return {
        products: []
      }
    default:
      return state;
  }
}