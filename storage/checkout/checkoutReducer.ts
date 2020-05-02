import { CheckOutForm, CheckOutFormActionTypes } from "./checkoutTypes";
import { checkoutFormInitState, EDIT_CHECKOUT_FORM, DELETE_CHECKOUT_FORM } from "./checkoutConstants";

export function checkoutReducer(state = checkoutFormInitState, action: CheckOutFormActionTypes): CheckOutForm {
  switch (action.type) {
    case EDIT_CHECKOUT_FORM:
      return {
        ...action.payload.checkout
      };
    case DELETE_CHECKOUT_FORM:
      return checkoutFormInitState;
    default:
      return state;
  }
}