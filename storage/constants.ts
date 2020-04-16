import { StoredProductList, StoredProduct, ModalsState } from "./types";
import { SearchItemList, SearchItem } from "./searchHistory/searchHistoryTypes";

export const storedProductListInitState: StoredProductList = {
  products: Array<StoredProduct>()
}

export const searchHistoryInitState: SearchItemList = {
  items: Array<SearchItem>()
}

export const modalsInitState: ModalsState = {
  wishlist: {
    isOpen: false,
    isEditting: false,
  },
  shoppingCart: {
    isOpen: false,
    isEditting: false,
  }
}

