export const OPEN_CHECKOUT_FORM = "OPEN_CHECKOUT_FORM";
export const CLOSE_CHECKOUT_FORM = "CLOSE_CHECKOUT_FORM";
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
  shippingOption: {
    text: "Standard 5-10 Business Days", price: 0
  },
  isGift: false,
}