import { StoredProductList, StoredProduct } from "./types";
import { SearchItemList, SearchItem } from "./searchHistory/searchHistoryTypes";

export const storedProductListInitState: StoredProductList = {
  products: Array<StoredProduct>()
}

export const searchHistoryInitState: SearchItemList = {
  items: Array<SearchItem>()
}