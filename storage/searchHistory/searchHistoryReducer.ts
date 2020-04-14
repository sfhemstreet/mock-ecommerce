import { SearchItemList, SearchHistoryActionTypes } from "./searchHistoryTypes";
import { searchHistoryInitState } from "../constants";
import { ADD_ITEM_TO_SEARCH_HISTORY, REMOVE_ITEM_FROM_SEARCH_HISTORY, DELETE_SEARCH_HISTORY } from "./searchHistoryConstants";

export function searchHistoryReducer(state = searchHistoryInitState, action: SearchHistoryActionTypes): SearchItemList {
  switch (action.type) {
    case ADD_ITEM_TO_SEARCH_HISTORY: 
      return {
        ...state,
        items: [...state.items.filter(item => item.text !== action.payload.text), action.payload]
      }
    case REMOVE_ITEM_FROM_SEARCH_HISTORY:
      return {
        ...state,
        items: [...state.items.filter(item => item.text !== action.payload.text)]
      }
    case DELETE_SEARCH_HISTORY: 
      return searchHistoryInitState;
    default:
      return state;
  }
}