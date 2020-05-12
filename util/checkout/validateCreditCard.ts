import { AcceptedCardsType, ACCEPTED_CREDIT_CARDS } from "./CreditCardOptions";
import { CreditCardInfo } from "./CheckOutFormTypes";

/**
 * Checks if given credit card has a valid card number, 
 * is from an accepted card company, 
 * and has a valid security code and expiration date.
 * 
 * This does not insure that the card is truly valid, 
 * and is meant to save us from sending the server garbage.
 * 
 * @param cardNumber 
 * @param securityCode 
 * @param expiration 
 */
export function validateCreditCard(cardInfo: CreditCardInfo): 
    { 
      cardNumber: boolean, 
      cardSecurityCode: boolean, 
      expiration: boolean, 
    } 
{

  const returnObject = {
    cardNumber: false, 
    cardSecurityCode: false, 
    expiration: false, 
  }

  const { cardNumber, cardSecurityCode, expiration } = cardInfo;

  // Remove all non digit characters. 
  const cardNo = cardNumber.replace(/\D/g, "");
  const secCode = cardSecurityCode.replace(/\D/g, "");
  const expire = { 
    month: expiration.month.replace(/\D/g, ""), 
    year: expiration.year.replace(/\D/g, "") 
  }

  if (validateCreditCardNumber(cardNo)){
    returnObject.cardNumber = true;
  } 

  const cardType = checkIfCreditCardIsSupported(cardNo);

  if (cardType === undefined) {
    returnObject.cardNumber = false;
  } else {
    if (validateCreditCardSecurityCode(cardType, secCode)){
      returnObject.cardSecurityCode = true;
    }
  }

  if (validateExpiration(expire)){
    returnObject.expiration = true;
  }

  return returnObject;
}

/**
 * Uses the Luhn Formula to see if a credit card has a valid number. 
 * 
 * This does NOT validate a credit card, it only checks if the credit card number 
 * given COULD be a valid credit card number.
 * 
 * @param cardNumber 
 */
function validateCreditCardNumber(cardNumber: string): boolean {
  // remove non digit chars 
  cardNumber = cardNumber.replace(/\D/g, "");

  // Drop the last digit from the number. 
  // The last digit is what we want to check against
  const lastDigit = parseInt(cardNumber[cardNumber.length - 1], 10);
  const withoutLastDigit = cardNumber.substring(0, cardNumber.length - 1);

  // Reverse the numbers
  const reversed = withoutLastDigit.split("").reverse();

  // Multiply the digits in odd positions (1, 3, 5, etc.) by 2 
  // and subtract 9 to any result higher than 9.
  // We start at index 0 so we will use even numbers.
  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 !== 0) continue;

    const number = parseInt(reversed[i], 10);
    const multipled = number * 2;
    const result = multipled > 9 ? multipled - 9 : multipled;
    reversed[i] = result.toString();
  }

  // Add all numbers together
  const sum = reversed.reduce((acc, curr) => (
    acc + parseInt(curr, 10)
  ), 0);

  // If last digit plus the sum is divisible by 10 
  // the card number is valid.
  return (sum + lastDigit) % 10 === 0;
}

function checkIfCreditCardIsSupported(
  cardNumber: string
): undefined | AcceptedCardsType {

  for (const c in ACCEPTED_CREDIT_CARDS) {
    const card = c as AcceptedCardsType;
    const regex = ACCEPTED_CREDIT_CARDS[card];

    if (regex.test(cardNumber)) return card;
  }
  return undefined;
}

function validateCreditCardSecurityCode(
  cardType: AcceptedCardsType,
  securityCode: string): boolean {

  if (cardType === "americanExpress" && securityCode.length !== 4) {
    return false;
  } else if (cardType !== "americanExpress" && securityCode.length !== 3) {
    return false;
  } else {
    return true;
  }
}

function validateExpiration(
  expiration: { month: string, year: string }
): boolean {

  const now = new Date();
  const monthNow = now.getMonth() + 1;
  const yearNow = now.getFullYear();

  const cardMonth = parseInt(expiration.month);
  const cardYear = parseInt(expiration.year);

  if (cardYear < yearNow) return false;
  if (cardYear === yearNow && cardMonth < monthNow) return false;

  return true;
}


