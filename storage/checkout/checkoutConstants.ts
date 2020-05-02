export const EDIT_CHECKOUT_FORM = "EDIT_CHECKOUT_FORM";
export const DELETE_CHECKOUT_FORM = "DELETE_CHECKOUT_FORM";

export const checkoutFormInitState = {
  isOnForm: false,
  billing: {
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  },
  shippingAddress: {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  },
  shippingOption: "",
  isGift: false,
}