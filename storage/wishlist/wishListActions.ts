import { WishListActionTypes } from "./wishListTypes";
import { 
  ADD_ITEM_TO_WISHLIST, 
  ADD_ALL_ITEMS_TO_WISHLIST, 
  REMOVE_ITEM_FROM_WISHLIST, 
  REMOVE_ALL_ITEMS_FROM_WISHLIST 
} from "./wishListConstants";
import { StoredProduct } from "../types";

export function addItemToWishList(item: StoredProduct): WishListActionTypes {
  console.log('ACTION: addItemToWishList')
  return {
    type: ADD_ITEM_TO_WISHLIST,
    payload: { item }
  }
}

export function addAllItemsToWishList(items: StoredProduct[]): WishListActionTypes {
  console.log('ACTION: addAllItemsToWishList')
  return {
    type: ADD_ALL_ITEMS_TO_WISHLIST,
    payload: { items }
  }
}

export function removeItemFromWishlist(itemId: string, timeAdded: number): WishListActionTypes {
  console.log("ACTION: removeItemFromWishList")
  return {
    type: REMOVE_ITEM_FROM_WISHLIST,
    payload: { id: itemId, timeAdded }
  }
}

export function removeAllItemsFromWishList(): WishListActionTypes {
  console.log("ACTION: removeAllItemsFromWishList")
  return {
    type: REMOVE_ALL_ITEMS_FROM_WISHLIST
  }
}