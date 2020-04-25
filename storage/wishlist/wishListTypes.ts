import { 
  ADD_ITEM_TO_WISHLIST, 
  ADD_ALL_ITEMS_TO_WISHLIST, 
  REMOVE_ITEM_FROM_WISHLIST, 
  REMOVE_ALL_ITEMS_FROM_WISHLIST,
} from "./wishListConstants";

export type WishListProduct = {
  id: string;
}

export type WishList = {
  products: WishListProduct[]
}

export interface AddWishListItemAction {
  type: typeof ADD_ITEM_TO_WISHLIST;
  payload: {
    item: WishListProduct
  };
}

export interface AddAllWishListItemsAction {
  type: typeof ADD_ALL_ITEMS_TO_WISHLIST;
  payload: {
    items: WishListProduct[]
  };
}

export interface RemoveWishListItemAction {
  type: typeof REMOVE_ITEM_FROM_WISHLIST;
  payload: { id: string };
}

export interface RemoveAllWishListItemsAction {
  type: typeof REMOVE_ALL_ITEMS_FROM_WISHLIST;
}

export type WishListActionTypes = 
  AddWishListItemAction | 
  AddAllWishListItemsAction | 
  RemoveWishListItemAction | 
  RemoveAllWishListItemsAction;

