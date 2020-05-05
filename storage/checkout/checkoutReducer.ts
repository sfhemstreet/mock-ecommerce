import { CheckOutForm, CheckOutFormActionTypes } from "./checkoutTypes";
import { checkoutFormInitState, EDIT_CHECKOUT_FORM, DELETE_CHECKOUT_FORM, OPEN_CHECKOUT_FORM, CLOSE_CHECKOUT_FORM } from "./checkoutConstants";

export function checkoutReducer(state = checkoutFormInitState, action: CheckOutFormActionTypes): CheckOutForm {
  switch (action.type) {
    case OPEN_CHECKOUT_FORM:
      return {
        ...state,
        isOnForm: true
      }
    case CLOSE_CHECKOUT_FORM:
      return {
        ...state,
        isOnForm: false
      }
    case EDIT_CHECKOUT_FORM:
      return {
        ...state,
        ...action.payload.checkout
      };
    case DELETE_CHECKOUT_FORM:
      return checkoutFormInitState;
    default:
      return state;
  }
}