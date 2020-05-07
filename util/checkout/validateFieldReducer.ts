import { AllFieldsKeys } from "./CheckOutFormTypes";
import { validateAddress } from "./validateAddress";
import { validateCity } from "./validateCity";
import { validateState } from "./validateState";
import { validateZipCode } from "./validateZipCode";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName";
import { validatePhoneNumber } from "./validatePhoneNumber";
import { validateCompany } from "./validateCompany";


export function validateFieldReducer(field: AllFieldsKeys, value: string) {
  switch (field) {
    case "address":
      return validateAddress(value);
    case "city": 
      return validateCity(value);
    case "state":
      return validateState(value);
    case "zipCode":
      return validateZipCode(value);
    case "email": 
      return validateEmail(value);
    case "firstName":
      return validateName(value);
    case "lastName":
      return validateName(value);
    case "phone":
      return validatePhoneNumber(value);
    case "company":
      return validateCompany(value);
    default: 
      return false;
  }
}