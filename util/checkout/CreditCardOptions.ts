

export const CREDIT_CARD_OPTIONS = [
  {
    name: "VISA",
    image: "/images/visa.png",
  },
  {
    name: "MasterCard",
    image: "/images/mastercard.png",
  },
  {
    name: "American Express",
    image: "/images/americanexpress.png",
  },
];

export const ACCEPTED_CREDIT_CARDS = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  americanExpress: /^3[47][0-9]{13}$/,
};

export type AcceptedCardsType = keyof typeof ACCEPTED_CREDIT_CARDS;

export const CREDIT_CARD_EXPIRATION_MONTHS = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export const getCreditCardExpirationYears = () => {
  const numberOfYears = 30;
  const minYear = new Date().getFullYear();
  const yearArray = new Array<string>();

  for (let i = 0; i < numberOfYears; i++) {
    const year = minYear + i;
    yearArray.push(`${year}`);
  }

  return yearArray
}

export const initCreditCardInfo = {
  cardNumber: "",
  cardSecurityCode: "",
  expiration: {
    month: CREDIT_CARD_EXPIRATION_MONTHS[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
  },
};

export const CREDIT_CARD_FORM_ORDER = {
  cardNumber: 1,
  cardSecurityCode: 2,
  expiration: 3
}