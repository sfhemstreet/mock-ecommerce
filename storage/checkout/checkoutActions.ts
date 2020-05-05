import { CheckOutForm, CheckOutFormActionTypes } from "./checkoutTypes";
import { EDIT_CHECKOUT_FORM, DELETE_CHECKOUT_FORM, OPEN_CHECKOUT_FORM, CLOSE_CHECKOUT_FORM } from "./checkoutConstants";

export function openCheckOutForm(): CheckOutFormActionTypes {
  return {
    type: OPEN_CHECKOUT_FORM
  }
}

export function closeCheckOutForm(): CheckOutFormActionTypes {
  return {
    type: CLOSE_CHECKOUT_FORM
  }
}

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