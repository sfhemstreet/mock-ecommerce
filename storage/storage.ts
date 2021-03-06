import { wishListReducer } from './wishlist/wishListReducer';
import { WishListActionTypes, WishList } from './wishlist/wishListTypes';
import { shoppingCartReducer } from './shoppingCart/shoppingCartReducer';


import { ShoppingCartActionTypes, ShoppingCart } from './shoppingCart/shoppingCartTypes';
import { SearchItemList, SearchHistoryActionTypes } from './searchHistory/searchHistoryTypes';
import { searchHistoryReducer } from './searchHistory/searchHistoryReducer';
import { ModalActionTypes, ModalsState } from './modals/modalTypes';
import { modalReducer } from './modals/modalReducer';
import { productHistoryInitState } from './productHistory/productHistoryConstants';
import { ProductHistoryState, ProductHistoryActionTypes } from './productHistory/productHistoryTypes';
import { productHistoryReducer } from './productHistory/productHistoryReducer';
import { modalsInitState } from './modals/modalConstants';
import { searchHistoryInitState } from './searchHistory/searchHistoryConstants';
import { shoppingCartInitState } from './shoppingCart/shoppingCartConstants';
import { wishlistInitState } from './wishlist/wishListConstants';
import { checkoutFormInitState } from './checkout/checkoutConstants';
import { CheckOutForm, CheckOutFormActionTypes } from './checkout/checkoutTypes';
import { checkoutReducer } from './checkout/checkoutReducer';
import { mutate } from 'swr';

/** Type of state stored in localStorage */ 
type StorageStateType = ShoppingCart | WishList | SearchItemList | ModalsState | ProductHistoryState | CheckOutForm;

/** key for getting and updating WishList state */
export const WISHLIST = "WISHLIST";

/** key for getting and updating Shopping Cart state */
export const SHOPPING_CART = "SHOPPING_CART";

/** key for getting and updating Search history */
export const SEARCH_HISTORY = "SEARCH_HISTORY";

/** key for opening and closing Modals */
export const MODAL = "MODAL";

/** key for Product History state */
export const PRODUCT_HISTORY = "PRODUCT_HISTORY";

/** key for Checkout Form state */
export const CHECKOUT_FORM = "CHECKOUT_FORM";

export type KeyType = 
  typeof WISHLIST | 
  typeof SHOPPING_CART | 
  typeof SEARCH_HISTORY | 
  typeof MODAL |
  typeof PRODUCT_HISTORY |
  typeof CHECKOUT_FORM;

function getInitStateByKey(key: KeyType) {
  switch (key) {
    case WISHLIST: return wishlistInitState;
    case SHOPPING_CART: return shoppingCartInitState;
    case SEARCH_HISTORY: return searchHistoryInitState;
    case MODAL: return modalsInitState;
    case PRODUCT_HISTORY: return productHistoryInitState;
    case CHECKOUT_FORM: return checkoutFormInitState;
    default: return undefined;
  }
}

function getLocalStorageState(key: KeyType) {
  if (typeof window !== 'undefined' && window) {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState) {
        return getInitStateByKey(key);
      }
      return JSON.parse(serializedState);
    } catch (err) {
      //console.log('ERROR: getLocalStorageState', err);
      return getInitStateByKey(key);
    }
  } else {
    //console.log("storage.ts : Cannot get local storage");
    return getInitStateByKey(key);
  }
}

function setLocalStorageState(state: StorageStateType, key: KeyType): void {
  if (typeof window !== 'undefined' && window) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState)
    } catch (err) {
      //console.log("ERROR: setLocalStorageState", err);
    }
  } else {
    //console.log("storage.ts : Cannot set local stoage");
  }
}


function getSessionStorageState(key: KeyType) {
  if (typeof window !== 'undefined' && window) {
    try {
      const serializedState = sessionStorage.getItem(key);
      if (!serializedState) {
        return getInitStateByKey(key);
      }
      return JSON.parse(serializedState);
    } catch (err) {
      //console.log('ERROR: getSessionStorageState', err);
      return getInitStateByKey(key);
    }
  } else {
    //console.log("storage.ts : Cannot get session storage");
    return getInitStateByKey(key);
  }
}

function setSessionStorageState(state: StorageStateType, key: KeyType): void {
  if (typeof window !== 'undefined' && window) {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem(key, serializedState)
    } catch (err) {
      //console.log("ERROR: setSessionStorageState", err);
    }
  } else {
    //console.log("storage.ts : Cannot set session stoage");
  }
}

/** 
 * Function to access state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {KeyType} key Type of storage you want to get, use a key as defined by KeyType
*/
export async function storage(key: KeyType): Promise<StorageStateType | undefined> {
  const data = getLocalStorageState(key);
  return data;
}

/** 
 * Function to access state saved in sessionStorage, supply to useSWR as second argument.
 * 
 * @param {KeyType} key Type of storage you want to get, use a key as defined by KeyType
*/
export async function tempstorage(key: KeyType): Promise<StorageStateType | undefined> {
  const data = getSessionStorageState(key);
  return data;
}


// SETTERS

/** 
 * Updates WishList in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {WishListActionTypes} action action from wishListActions.ts
 * @param {wishlist} wishlist if you have the current state of the wishlist supply it here
 */
export async function mutateWishList(action: WishListActionTypes, wishlist?: WishList ) {
  if (!wishlist) 
    wishlist = await storage(WISHLIST) as WishList;

  const updatedWishlist = wishListReducer(wishlist, action);
  setLocalStorageState(updatedWishlist, WISHLIST);
  return mutate(WISHLIST, updatedWishlist);
}


/** 
 * Updates ShoppingCart in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {ShoppingCartActionTypes} action action from shoppingCartActions.ts
 * @param {StoredProductList} shoppingCart if you have the current state of the shoppingCart supply it here
 */
export async function mutateShoppingCart(action: ShoppingCartActionTypes, shoppingCart?: ShoppingCart) {
  if (!shoppingCart) 
    shoppingCart = await storage(SHOPPING_CART) as ShoppingCart;

  const updatedShoppingCart = shoppingCartReducer(shoppingCart, action);
  setLocalStorageState(updatedShoppingCart, SHOPPING_CART);
  return mutate(SHOPPING_CART, updatedShoppingCart);
}


/** 
 * Updates Search History in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {SearchHistoryActionTypes} action action from searchHistoryActions.ts
 * @param {SearchItemList} searchHistory if you have the current state of the seachHistory supply it here
 */
export async function mutateSearchHistory(action: SearchHistoryActionTypes, searchHistory?: SearchItemList) {
  if (!searchHistory) 
    searchHistory = await storage(SEARCH_HISTORY) as SearchItemList;

  const updatedSearchHistory = searchHistoryReducer(searchHistory, action);
  setLocalStorageState(updatedSearchHistory, SEARCH_HISTORY);
  return mutate(SEARCH_HISTORY, updatedSearchHistory);
}

/** 
 * Updates Modal State in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {ModalActionTypes} action action from modalActions.ts
 * @param {ModalsState} modalsState if you have the current state of the modals supply it here
 */
export async function mutateModalsState(action: ModalActionTypes, modalsState?: ModalsState) {
  if (!modalsState) 
    modalsState = await storage(MODAL) as ModalsState;

  const updatedModalsState = modalReducer(modalsState, action);
  setLocalStorageState(updatedModalsState, MODAL);
  return mutate(MODAL, updatedModalsState);
}

/** 
 * Updates Product History in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {ProductHistoryActionTypes} action action from productHistoryActions.ts
 * @param {ProductHistoryState} productHistoryState if you have the current state of Product History supply it here
 */
export async function mutateProductHistory(action: ProductHistoryActionTypes, productHistory?: ProductHistoryState) {
  if (!productHistory) 
    productHistory = await storage(PRODUCT_HISTORY) as ProductHistoryState;

  const updatedProductHistoryState = productHistoryReducer(productHistory, action);
  setLocalStorageState(updatedProductHistoryState, PRODUCT_HISTORY);
  return mutate(PRODUCT_HISTORY, updatedProductHistoryState, false);
}

/** 
 * Updates Checkout Form in sessionStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {CheckOutFormActionTypes} action action from productHistoryActions.ts
 * @param {ProductHistoryState} checkoutForm if you have the current state of Checkout Form supply it here
 */
export async function mutateCheckoutForm(action: CheckOutFormActionTypes, checkoutForm?: CheckOutForm) {
  if (!checkoutForm)
    checkoutForm = await tempstorage(CHECKOUT_FORM) as CheckOutForm;

  const updatedCheckoutForm = checkoutReducer(checkoutForm, action);
  setSessionStorageState(updatedCheckoutForm, CHECKOUT_FORM);
  return mutate(CHECKOUT_FORM, updatedCheckoutForm);
}


// GETTERS

/**
 * Function to access WishList state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {WISHLIST} key "WISHLIST"
 */
export async function getWishlist(key: typeof WISHLIST): Promise<WishList> {
  return await storage(key) as WishList;
} 

/**
 * Function to access ShoppingCart state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {SHOPPING_CART} key "SHOPPING_CART"
 */
export async function getShoppingCart(key: typeof SHOPPING_CART): Promise<ShoppingCart> {
  return await storage(key) as ShoppingCart;
} 

/**
 * Function to access SearchHistory state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {SEARCH_HISTORY} key "SEARCH_HISTORY"
 */
export async function getSearchHistory(key: typeof SEARCH_HISTORY): Promise<SearchItemList> {
  return await storage(key) as SearchItemList;
} 

/** 
 * Function to access Modals state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {MODAL} key "MODAL"
 */
export async function getModalsState(key: typeof MODAL): Promise<ModalsState> {
  return await storage(key) as ModalsState;
}

/** 
 * Function to access Product History state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {PRODUCT_HISTORY} key "PRODUCT_HISTORY"
 */
export async function getProductHistory(key: typeof PRODUCT_HISTORY): Promise<ProductHistoryState> {
  return await storage(key) as ProductHistoryState;
}

/** 
 * Function to access Product History state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {CHECKOUT_FORM} key "CHECKOUT_FORM"
 */
export async function getCheckoutForm(key: typeof CHECKOUT_FORM): Promise<CheckOutForm> {
  return await tempstorage(key) as CheckOutForm;
}