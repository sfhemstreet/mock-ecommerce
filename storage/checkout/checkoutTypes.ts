import { checkoutFormInitState, EDIT_CHECKOUT_FORM, DELETE_CHECKOUT_FORM } from "./checkoutConstants";

export type CheckOutForm = typeof checkoutFormInitState;

export interface EditCheckOutFormAction {
  type: typeof EDIT_CHECKOUT_FORM
  payload: {
    checkout: CheckOutForm
  }
}

export interface DeleteCheckOutFormAction {
  type: typeof DELETE_CHECKOUT_FORM
}

export type CheckOutFormActionTypes = EditCheckOutFormAction | DeleteCheckOutFormAction;
