import { modalsInitState } from "../constants";
import { ModalActionTypes } from "./modalTypes";
import { ModalsState } from "../types";
import { OPEN_SHOPPING_CART_MODAL, OPEN_WISHLIST_MODAL, TOGGLE_SHOPPING_CART_MODAL, TOGGLE_WISHLIST_MODAL, CLOSE_SHOPPING_CART_MODAL, CLOSE_WISHLIST_MODAL, CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS } from "./modalConstants";

export function modalReducer(state = modalsInitState, action: ModalActionTypes): ModalsState {
  switch (action.type) {
    case OPEN_SHOPPING_CART_MODAL:
      return {
        ...state,
        wishlist: { isOpen: false },
        shoppingCart: { isOpen: true }
      }
    case OPEN_WISHLIST_MODAL:
      return {
        ...state,
        wishlist: { isOpen: true },
        shoppingCart: { isOpen: false }
      }
    case TOGGLE_SHOPPING_CART_MODAL:
      return {
        wishlist: { isOpen: false },
        shoppingCart: { isOpen: !state.shoppingCart.isOpen }
      }
    case TOGGLE_WISHLIST_MODAL:
      return {
        wishlist: { isOpen: !state.wishlist.isOpen },
        shoppingCart: { isOpen: false }
      }
    case CLOSE_SHOPPING_CART_MODAL:
      return {
        ...state,
        shoppingCart: { isOpen: false }
      }
    case CLOSE_WISHLIST_MODAL:
      return {
        ...state,
        wishlist: { isOpen: false }
      }
    case CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS:
      return {
        ...state,
        wishlist: { isOpen: false },
        shoppingCart: { isOpen: false }
      }
    default: 
      return state
  }
}