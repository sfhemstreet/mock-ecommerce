import { CheckOutForm, CheckOutFormActionTypes } from "./checkoutTypes";
import { EDIT_CHECKOUT_FORM, DELETE_CHECKOUT_FORM } from "./checkoutConstants";

export function editCheckOutForm(form: CheckOutForm): CheckOutFormActionTypes {
  return {
    type: EDIT_CHECKOUT_FORM,
    payload: {
      checkout: form
    }
  }
}

export function deleteCheckOutForm(): CheckOutFormActionTypes {
  return {
    type: DELETE_CHECKOUT_FORM
  }
}