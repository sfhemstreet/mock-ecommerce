import { 
  TOGGLE_SHOPPING_CART_MODAL, 
  TOGGLE_WISHLIST_MODAL, 
  OPEN_SHOPPING_CART_MODAL, 
  OPEN_WISHLIST_MODAL, 
  CLOSE_SHOPPING_CART_MODAL, 
  CLOSE_WISHLIST_MODAL, 
  CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS
} from "./modalConstants";

import { ModalActionTypes } from "./modalTypes";

export function toggleShoppingCartModal(): ModalActionTypes  {
  return {
    type: TOGGLE_SHOPPING_CART_MODAL
  }
}

export function toggleWishListModal(): ModalActionTypes {
  return {
    type: TOGGLE_WISHLIST_MODAL
  }
} 

export function openShoppingCartModal(): ModalActionTypes {
  return {
    type: OPEN_SHOPPING_CART_MODAL
  }
}

export function openWishListModal(): ModalActionTypes {
  return {
    type: OPEN_WISHLIST_MODAL
  }
}

export function closeShoppingCartModal(): ModalActionTypes {
  return {
    type: CLOSE_SHOPPING_CART_MODAL
  }
}

export function closeWishListModal(): ModalActionTypes {
  return {
    type: CLOSE_WISHLIST_MODAL
  }
}

export function closeShoppingCartAndWishListModals(): ModalActionTypes {
  return {
    type: CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS
  }
}