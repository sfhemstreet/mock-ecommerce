import { modalsInitState } from "../constants";
import { ModalActionTypes } from "./modalTypes";
import { ModalsState } from "../types";
import { OPEN_SHOPPING_CART_MODAL, OPEN_WISHLIST_MODAL, TOGGLE_SHOPPING_CART_MODAL, TOGGLE_WISHLIST_MODAL, CLOSE_SHOPPING_CART_MODAL, CLOSE_WISHLIST_MODAL, CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS, START_EDIT_WISHLIST_MODAL, START_EDIT_SHOPPING_CART_MODAL, STOP_EDIT_SHOPPING_CART_MODAL, STOP_EDIT_WISHLIST_MODAL } from "./modalConstants";

export function modalReducer(state = modalsInitState, action: ModalActionTypes): ModalsState {
  switch (action.type) {
    case OPEN_SHOPPING_CART_MODAL:
      return {
        ...state,
        wishlist: {...state.wishlist, isOpen: false, isEditting: false },
        shoppingCart: {...state.shoppingCart, isOpen: true, isEditting: false }
      }
    case OPEN_WISHLIST_MODAL:
      return {
        ...state,
        wishlist: {...state.wishlist, isOpen: true, isEditting: false },
        shoppingCart: {...state.shoppingCart, isOpen: false, isEditting: false }
      }
    case TOGGLE_SHOPPING_CART_MODAL:
      return {
        wishlist: {...state.wishlist, isOpen: false, isEditting: false },
        shoppingCart: {...state.shoppingCart, isOpen: !state.shoppingCart.isOpen, isEditting: false }
      }
    case TOGGLE_WISHLIST_MODAL:
      return {
        wishlist: {...state.wishlist, isOpen: !state.wishlist.isOpen, isEditting: false },
        shoppingCart: {...state.shoppingCart, isOpen: false, isEditting: false }
      }
    case CLOSE_SHOPPING_CART_MODAL:
      return {
        ...state,
        shoppingCart: {...state.shoppingCart, isOpen: false, isEditting: false }
      }
    case CLOSE_WISHLIST_MODAL:
      return {
        ...state,
        wishlist: {...state.wishlist, isOpen: false, isEditting: false }
      }
    case CLOSE_SHOPPING_CART_AND_WISHLIST_MODALS:
      return {
        ...state,
        wishlist: {...state.wishlist, isOpen: false, isEditting: false },
        shoppingCart: {...state.shoppingCart, isOpen: false, isEditting: false }
      }
    case START_EDIT_WISHLIST_MODAL:
      return {
        ...state,
        wishlist: {...state.wishlist, isEditting: true }
      }
    case START_EDIT_SHOPPING_CART_MODAL:
      return {
        ...state,
        shoppingCart: {...state.shoppingCart, isEditting: true }
      }
    case STOP_EDIT_WISHLIST_MODAL:
      return {
        ...state,
        wishlist: {...state.wishlist, isEditting: false }
      }
    case STOP_EDIT_SHOPPING_CART_MODAL:
      return {
        ...state,
        shoppingCart: {...state.shoppingCart, isEditting: false }
      }
    default: 
      return state
  }
}