import Cookie from "js-cookie";
import React from "react";

export const WISH_LIST_COOKIE_NAME = "WISH_LIST_DATA";
export const SHOPPING_CART_NAME = "SHOPPING_CART_DATA";

export type ShoppingCartWishListCookieData = {
  products?: {
    id: string;
    name: string;
    size: string;
    color: string;
    quantity: string;
  }[];
};

export type ShoppingCartWishListContextType = {
  wishList: ShoppingCartWishListCookieData | undefined;
  shoppingCart: ShoppingCartWishListCookieData | undefined;
}

export function getShoppingCartWishListCookies(): ShoppingCartWishListContextType {
  if (typeof document === "undefined") {
    return {
      wishList: undefined,
      shoppingCart: undefined
    }
  }

  const wishList: ShoppingCartWishListCookieData = Cookie.getJSON(
    WISH_LIST_COOKIE_NAME
  );
  const shoppingCart: ShoppingCartWishListCookieData = Cookie.getJSON(
    SHOPPING_CART_NAME
  );

  return {
    wishList,
    shoppingCart
  }
}

export const ShoppingCartWishListContext = React.createContext(getShoppingCartWishListCookies())