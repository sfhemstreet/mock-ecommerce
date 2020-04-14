import { ADD_ITEM_TO_SEARCH_HISTORY, REMOVE_ITEM_FROM_SEARCH_HISTORY, DELETE_SEARCH_HISTORY } from "./searchHistoryConstants";

export type SearchItem = {
  text: string;
}

export type SearchItemList = {
  items: SearchItem[]
}

export interface AddItemToSearchHistoryAction {
  type: typeof ADD_ITEM_TO_SEARCH_HISTORY;
  payload: SearchItem;
}

export interface RemoveItemFromSearchHistoryAction {
  type: typeof REMOVE_ITEM_FROM_SEARCH_HISTORY;
  payload: SearchItem;
}

export interface DeleteSearchHistoryAction {
  type: typeof DELETE_SEARCH_HISTORY
}

export type SearchHistoryActionTypes = AddItemToSearchHistoryAction | RemoveItemFromSearchHistoryAction | DeleteSearchHistoryAction;