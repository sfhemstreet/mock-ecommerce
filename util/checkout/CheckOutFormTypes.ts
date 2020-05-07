import { CheckOutForm } from "../../storage/checkout/checkoutTypes";
import { initCreditCardInfo } from "./CreditCardOptions";

export type Billing = CheckOutForm["billing"];
export type BillingKeys = keyof CheckOutForm["billing"];
export type ShippingAddress = CheckOutForm["shippingAddress"];
export type ShippingAddressKeys = keyof CheckOutForm["shippingAddress"];
export type BillingShippingSharedKeys = BillingKeys & ShippingAddressKeys;

export type CreditCardInfo = typeof initCreditCardInfo;
export type CreditCardInfoKeys = keyof CreditCardInfo;

export type AllFieldsKeys = BillingKeys | ShippingAddressKeys | CreditCardInfo;