
/**
 * This uses the Luhn Formula to see if a credit card has a valid number. 
 * 
 * This does NOT validate a credit card, it only checks if the credit card number 
 * given COULD be a valid credit card number.
 * 
 * @param cardNumber 
 */
export function validateCreditCardNumber(cardNumber: string): boolean {

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

  // Add all number together
  const sum = reversed.reduce((acc, curr) => (
    acc + parseInt(curr, 10)
  ), 0);

  // Check if last digit of sum is equal to the 
  // initial last digit we got from the cardNumber.
  const lastDigitOfSum = (sum % 10);

  return  (sum + lastDigit) % 10 === 0;
}