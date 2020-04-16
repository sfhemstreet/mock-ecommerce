import { wishListReducer } from './wishlist/wishListReducer';
import { WishListActionTypes } from './wishlist/wishListTypes';
import { shoppingCartReducer } from './shoppingCart/shoppingCartReducer';
import { StoredProductList, ModalsState } from './types';
import { storedProductListInitState, searchHistoryInitState, modalsInitState } from './constants';
import { ShoppingCartActionTypes } from './shoppingCart/shoppingCartTypes';
import { SearchItemList, SearchHistoryActionTypes } from './searchHistory/searchHistoryTypes';
import { searchHistoryReducer } from './searchHistory/searchHistoryReducer';
import { ModalActionTypes } from './modals/modalTypes';
import { modalReducer } from './modals/modalReducer';

/** Type of state stored in localStorage */ 
type StorageStateType = StoredProductList | SearchItemList | ModalsState;

/** key for getting and updating WishList state */
export const WISHLIST = "WISHLIST";

/** key for getting and updating Shopping Cart state */
export const SHOPPING_CART = "SHOPPING_CART";

/** key for getting and updating Search history */
export const SEARCH_HISTORY = "SEARCH_HISTORY";

/** key for opening and closing Modals */
export const MODAL = "MODAL";

export type KeyType = 
  typeof WISHLIST | 
  typeof SHOPPING_CART | 
  typeof SEARCH_HISTORY | 
  typeof MODAL

function getInitStateByKey(key: KeyType) {
  switch (key) {
    case WISHLIST: return storedProductListInitState;
    case SHOPPING_CART: return storedProductListInitState;
    case SEARCH_HISTORY: return searchHistoryInitState;
    case MODAL: return modalsInitState
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
      return JSON.parse(serializedState) as StoredProductList;
    } catch (err) {
      console.log('ERROR: getLocalStorageState', err);
      return getInitStateByKey(key);
    }
  } else {
    console.log("storage.ts : Cannot get local storage");
    return getInitStateByKey(key);
  }
}

function setLocalStorageState(state: StorageStateType, key: KeyType): void {
  if (typeof window !== 'undefined' && window) {
    try {
      const serializedState = JSON.stringify(state);
      console.log('Saving state in localStorage', serializedState);
      localStorage.setItem(key, serializedState)
    } catch (err) {
      console.log("ERROR: setLocalStorageState", err);
    }
  } else {
    console.log("storage.ts : Cannot set local stoage");
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
 * Updates WishList in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {mutateFn} mutateFn mutate function from "swr" package
 * @param {WishListActionTypes} action action from wishListActions.ts
 * @param {wishlist} wishlist if you have the current state of the wishlist supply it here
 */
export async function updateWishList(mutateFn: any, action: WishListActionTypes, wishlist?: StoredProductList ) {
  if (!wishlist) 
    wishlist = await storage(WISHLIST) as StoredProductList;

  const updatedWishlist = wishListReducer(wishlist, action);
  setLocalStorageState(updatedWishlist, WISHLIST);
  return mutateFn(WISHLIST, updatedWishlist);
}


/** 
 * Updates ShoppingCart in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {mutateFn} mutateFn mutate function from "swr" package
 * @param {ShoppingCartActionTypes} action action from shoppingCartActions.ts
 * @param {StoredProductList} shoppingCart if you have the current state of the shoppingCart supply it here
 */
export async function updateShoppingCart(mutateFn: any, action: ShoppingCartActionTypes, shoppingCart?: StoredProductList) {
  if (!shoppingCart) 
    shoppingCart = await storage(SHOPPING_CART) as StoredProductList;

  const updatedShoppingCart = shoppingCartReducer(shoppingCart, action);
  setLocalStorageState(updatedShoppingCart, SHOPPING_CART);
  return mutateFn(SHOPPING_CART, updatedShoppingCart);
}


/** 
 * Updates Search History in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {mutateFn} mutateFn mutate function from "swr" package
 * @param {SearchHistoryActionTypes} action action from searchHistoryActions.ts
 * @param {SearchItemList} searchHistory if you have the current state of the seachHistory supply it here
 */
export async function updateSearchHistory(mutateFn: any, action: SearchHistoryActionTypes, searchHistory?: SearchItemList) {
  if (!searchHistory) 
    searchHistory = await storage(SEARCH_HISTORY) as SearchItemList;

  const updatedSearchHistory = searchHistoryReducer(searchHistory, action);
  setLocalStorageState(updatedSearchHistory, SEARCH_HISTORY);
  return mutateFn(SEARCH_HISTORY, updatedSearchHistory);
}

/** 
 * Updates Modal State in localStorage and in SWR cache. Supply the mutate function from "swr" package.
 * 
 * @param {mutateFn} mutateFn mutate function from "swr" package
 * @param {ModalActionTypes} action action from modalActions.ts
 * @param {ModalsState} modalsState if you have the current state of the modals supply it here
 */
export async function updateModalsState(mutateFn: any, action: ModalActionTypes, modalsState?: ModalsState) {
  if (!modalsState) 
    modalsState = await storage(MODAL) as ModalsState;

  const updatedModalsState = modalReducer(modalsState, action);
  setLocalStorageState(updatedModalsState, MODAL);
  return mutateFn(MODAL, updatedModalsState);
}

/**
 * Function to access WishList state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {WISHLIST} key "WISHLIST"
 */
export async function getWishlist(key: typeof WISHLIST): Promise<StoredProductList> {
  return await storage(key) as StoredProductList;
} 

/**
 * Function to access ShoppingCart state saved in localStorage, supply to useSWR as second argument.
 * 
 * @param {SHOPPING_CART} key "SHOPPING_CART"
 */
export async function getShoppingCart(key: typeof SHOPPING_CART): Promise<StoredProductList> {
  return await storage(key) as StoredProductList;
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