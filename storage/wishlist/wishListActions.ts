import { WishListActionTypes, WishListProduct } from "./wishListTypes";
import { 
  ADD_ITEM_TO_WISHLIST, 
  ADD_ALL_ITEMS_TO_WISHLIST, 
  REMOVE_ITEM_FROM_WISHLIST, 
  REMOVE_ALL_ITEMS_FROM_WISHLIST, 
} from "./wishListConstants";


export function addItemToWishList(item: WishListProduct): WishListActionTypes {
  return {
    type: ADD_ITEM_TO_WISHLIST,
    payload: { item }
  }
}

export function addAllItemsToWishList(items: WishListProduct[]): WishListActionTypes {
  return {
    type: ADD_ALL_ITEMS_TO_WISHLIST,
    payload: { items }
  }
}

export function removeItemFromWishlist(itemId: string): WishListActionTypes {
  return {
    type: REMOVE_ITEM_FROM_WISHLIST,
    payload: { id: itemId }
  }
}

export function removeAllItemsFromWishList(): WishListActionTypes {
  return {
    type: REMOVE_ALL_ITEMS_FROM_WISHLIST
  }
}