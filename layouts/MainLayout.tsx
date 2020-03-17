import React, { FunctionComponent, Component, useReducer, useContext, Provider } from "react";
import { BackgroundBlackGradient } from "../components/Background";
import { NavigationBar } from "../components/NavigationBar";
import { FullPageContainer } from "../components/FullPageContainer";
import { SideDrawer } from "../components/SideDrawer";
import { Transformed } from "../components/Transformed";
import { Filtered } from "../components/Filtered";

type MainLayoutState = {
  isSearching: boolean;
  searchText: string;
  sideDrawerOpen: boolean;
};

export const initMainLayoutState: MainLayoutState = {
  isSearching: false,
  searchText: "",
  sideDrawerOpen: false
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

export type MainLayoutAction =
  | SideDrawerAction
  | SearchAction
  | TypingSearchAction;

export function mainLayOutReducer(
  state: MainLayoutState,
  action: MainLayoutAction
): MainLayoutState {
  switch (action.type) {
    case SIDE_DRAWER:
      return {
        ...state,
        isSearching: false,
        sideDrawerOpen: !state.sideDrawerOpen
      };
    case SEARCH:
      return {
        ...state,
        isSearching: !state.isSearching,
        sideDrawerOpen: false
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

export const MainLayout: FunctionComponent = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(mainLayOutReducer, initMainLayoutState);

  return (
    <FullPageContainer>
      <BackgroundBlackGradient>
        <SideDrawer
          open={state.sideDrawerOpen}
          setOpen={() => dispatch({ type: SIDE_DRAWER })}
          minWidth={-20}
          maxWidth={300}
          borderWidth={1}
        />
        <Transformed
          isTransformed={state.sideDrawerOpen}
          transform={"translateX(300px)"}
          transition={"all 0.3s ease-out"}
        >
          <NavigationBar 
            isMenuOpen={state.sideDrawerOpen}
            isSearching={state.isSearching}
            searchText={state.searchText}
            dispatch={dispatch}
          />
          <Filtered
            isActive={state.sideDrawerOpen}
            filter={"blur(1px) grayscale(50%)"}
            transition={"0.3s ease-in-out"}
          >
            {children}
          </Filtered>
        </Transformed>
      </BackgroundBlackGradient>
    </FullPageContainer>
  );
};
