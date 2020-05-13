
/**
 * On some browsers, when the user types into a form, 
 * the form will reorder it input, which is jarring and totally not cool.
 * When rendering the list we will use this to sort it first, so that can be avoided.
 */
export const SHIPPING_FORM_ORDER = {
  firstName: 1,
  lastName: 2,
  company: 3,
  address: 4,
  city: 5,
  state: 6,
  zipCode: 7,
  phone: 8,
}