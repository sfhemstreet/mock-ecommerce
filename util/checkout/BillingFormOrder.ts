
/**
 * On some browsers, when the user types into a form, 
 * the form will reorder it input, which is jarring and totally not cool.
 * When rendering the list we will use this to sort it first, so that can be avoided.
 */
export const BILLING_FORM_ORDER = {
  email: 1,
  firstName: 2,
  lastName: 3,
  company: 4,
  address: 5,
  city: 6,
  state: 7,
  zipCode: 8,
  phone: 9,
}
