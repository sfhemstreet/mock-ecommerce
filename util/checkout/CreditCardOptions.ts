export const initCreditCardInfo = {
  cardNumber: "",
  cardSecurityCode: "",
  expiration: {
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  },
};

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