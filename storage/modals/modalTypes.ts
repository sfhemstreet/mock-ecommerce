import { 
  OPEN_SHOPPING_CART_MODAL, 
  OPEN_WISHLIST_MODAL, 
  TOGGLE_WISHLIST_MODAL, 
  TOGGLE_SHOPPING_CART_MODAL, 
  CLOSE_WISHLIST_MODAL, 
  CLOSE_SHOPPING_CART_MODAL, 
  CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS,
  START_EDIT_WISHLIST_MODAL,
  START_EDIT_SHOPPING_CART_MODAL,
  STOP_EDIT_WISHLIST_MODAL,
  STOP_EDIT_SHOPPING_CART_MODAL
} from "./modalConstants";

export interface OpenWishListModalAction {
  type: typeof OPEN_WISHLIST_MODAL
}

export interface OpenShoppingCartModalAction {
  type: typeof OPEN_SHOPPING_CART_MODAL
}

export interface ToggleWishListModalAction {
  type: typeof TOGGLE_WISHLIST_MODAL
}

export interface ToggleShoppingCartModalAction {
  type: typeof TOGGLE_SHOPPING_CART_MODAL
}

export interface CloseWishListModalAction {
  type: typeof CLOSE_WISHLIST_MODAL
}

export interface CloseShoppingCartModalAction {
  type: typeof CLOSE_SHOPPING_CART_MODAL
}

export interface CloseShoppingCartAndWishListModalsAction {
  type: typeof CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS
}

export interface StartEditWishListModalAction {
  type: typeof START_EDIT_WISHLIST_MODAL
}

export interface StartEditShoppingCartModalAction {
  type: typeof START_EDIT_SHOPPING_CART_MODAL
}

export interface StopEditWishListModalAction {
  type: typeof STOP_EDIT_WISHLIST_MODAL
}

export interface StopEditShoppingCartModalAction {
  type: typeof STOP_EDIT_SHOPPING_CART_MODAL
}

export type ModalActionTypes = 
  OpenShoppingCartModalAction | 
  OpenWishListModalAction | 
  ToggleShoppingCartModalAction | 
  ToggleWishListModalAction | 
  CloseShoppingCartModalAction | 
  CloseWishListModalAction |
  CloseShoppingCartAndWishListModalsAction |
  StartEditWishListModalAction |
  StartEditShoppingCartModalAction | 
  StopEditWishListModalAction |
  StopEditShoppingCartModalAction;