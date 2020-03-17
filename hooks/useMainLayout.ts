type NavigationBarState = {
  isSearching: boolean;
  searchText: string;
  sideMenuOpen: boolean;
};

export const initNavigationBarState: NavigationBarState = {
  isSearching: false,
  searchText: "",
  sideMenuOpen: false
};

export const SIDE_DRAWER = "SIDE_DRAWER";
export const SEARCH = "SEARCH";
export const TYPING_SEARCH = "TYPING_SEARCH";

interface SideDrawerAction {
  type: "SIDE_DRAWER";
}

interface SearchAction {
  type: "SEARCH";
}

interface TypingSearchAction {
  type: "TYPING_SEARCH";
  payload: string;
}

export type NavigationBarAction = SideDrawerAction | SearchAction | TypingSearchAction;

export function mainLayOutReducer(
  state: NavigationBarState,
  action: NavigationBarAction
): NavigationBarState {
  switch (action.type) {
    case SIDE_DRAWER:
      return {
        ...state,
        isSearching: false,
        sideMenuOpen: !state.sideMenuOpen
      };
    case SEARCH:
      return {
        ...state,
        isSearching: !state.isSearching,
        sideMenuOpen: false
      };
    case TYPING_SEARCH:
      return {
        ...state,
        searchText: action.payload
      };
    default:
      return state;
  }
}