import { WishListActionTypes } from "./wishListTypes";
import { 
  ADD_ITEM_TO_WISHLIST, 
  ADD_ALL_ITEMS_TO_WISHLIST, 
  REMOVE_ITEM_FROM_WISHLIST, 
  REMOVE_ALL_ITEMS_FROM_WISHLIST, 
  EDIT_WISHLIST_ITEM
} from "./wishListConstants";
import { StoredProduct } from "../types";

export function addItemToWishList(item: StoredProduct): WishListActionTypes {
  return {
    type: ADD_ITEM_TO_WISHLIST,
    payload: { item }
  }
}

export function addAllItemsToWishList(items: StoredProduct[]): WishListActionTypes {
  return {
    type: ADD_ALL_ITEMS_TO_WISHLIST,
    payload: { items }
  }
}

export function editWishListItem(item: StoredProduct): WishListActionTypes {
  return {
    type: EDIT_WISHLIST_ITEM,
    payload: { item }
  }
}

export function removeItemFromWishlist(itemId: string, timeAdded: number): WishListActionTypes {
  return {
    type: REMOVE_ITEM_FROM_WISHLIST,
    payload: { id: itemId, timeAdded }
  }
}

export function removeAllItemsFromWishList(): WishListActionTypes {
  return {
    type: REMOVE_ALL_ITEMS_FROM_WISHLIST
  }
}