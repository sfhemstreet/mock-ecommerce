import { ADD_ITEM_TO_WISHLIST, ADD_ALL_ITEMS_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST, REMOVE_ALL_ITEMS_FROM_WISHLIST } from "./wishListConstants";

export type WishListItem = {
  productId: number;
  productName: string;
  productColor: string;
  productSize: string;
  quantity: number;
}

export type WishListState = {
  products: WishListItem[]
}

export interface AddWishListItemAction {
  type: typeof ADD_ITEM_TO_WISHLIST;
  payload: {
    item: WishListItem
  };
}

export interface AddAllWishListItemsAction {
  type: typeof ADD_ALL_ITEMS_TO_WISHLIST;
  payload: {
    items: WishListItem[]
  };
}

export interface RemoveWishListItemAction {
  type: typeof REMOVE_ITEM_FROM_WISHLIST;
  payload: { id: number };
}

export interface RemoveAllWishListItemsAction {
  type: typeof REMOVE_ALL_ITEMS_FROM_WISHLIST;
}

export type WishListActionTypes = AddWishListItemAction | AddAllWishListItemsAction | RemoveWishListItemAction | RemoveAllWishListItemsAction;
