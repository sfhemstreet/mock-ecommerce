export const initCreditCardInfo = {
  cardNumber: "",
  cardSecurityCode: "",
  expiration: {
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  },
};

export type CreditCardInfo = typeof initCreditCardInfo;
export type CreditCardInfoKeys = keyof CreditCardInfo;

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