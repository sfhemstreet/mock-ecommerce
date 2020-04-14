import { SearchItem, SearchHistoryActionTypes } from "./searchHistoryTypes";
import { ADD_ITEM_TO_SEARCH_HISTORY, REMOVE_ITEM_FROM_SEARCH_HISTORY, DELETE_SEARCH_HISTORY } from "./searchHistoryConstants";

export function addItemToSearchHistory(item: SearchItem): SearchHistoryActionTypes {
  return {
    type: ADD_ITEM_TO_SEARCH_HISTORY,
    payload: item
  }
}

export function removeItemFromSearchHistory(item: SearchItem): SearchHistoryActionTypes {
  return {
    type: REMOVE_ITEM_FROM_SEARCH_HISTORY,
    payload: item
  }
}

export function deleteSearchHistory(): SearchHistoryActionTypes {
  return {
    type: DELETE_SEARCH_HISTORY
  }
}