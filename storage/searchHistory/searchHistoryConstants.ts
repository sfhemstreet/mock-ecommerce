import { SearchItemList, SearchItem } from "./searchHistoryTypes";

export const ADD_ITEM_TO_SEARCH_HISTORY = "ADD_ITEM_TO_SEARCH_HISTORY";
export const REMOVE_ITEM_FROM_SEARCH_HISTORY = "REMOVE_ITEM_FROM_SEARCH_HISTORY";
export const DELETE_SEARCH_HISTORY = "DELETE_SEARCH_HISTORY";

export const searchHistoryInitState: SearchItemList = {
  items: Array<SearchItem>()
}