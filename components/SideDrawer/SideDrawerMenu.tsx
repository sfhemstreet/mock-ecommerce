import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Contained } from "../Contained";
import {
  NavigationContent,
  NavigationContentItem
} from "../../content/navigation/navigationContentTypes";
import { Row } from "../Row";
import { SearchBox } from "../SearchBox";
import { SportsAtticLogoSmall } from "../SportsAtticLogo";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { SideDrawerMenuItem } from "./SideDrawerMenuItem";
import { Padded } from "../Padded";
import { Transformed } from "../Transformed";
import { BackArrowButton } from "../BackArrowButton";

type SideDrawerMenuState = {
  searchText: string;
  isSearchActive: boolean;
  subMenuStack: NavigationContentItem[];
  subMenuStackLength: number;
  isSubMenuOpen: boolean;
};

const initSideDrawerMenuState: SideDrawerMenuState = {
  searchText: "",
  isSearchActive: false,
  subMenuStack: [],
  subMenuStackLength: 0,
  isSubMenuOpen: false
};

type SideDrawerMenuProps = {
  navigationContent: NavigationContent;
  sideDrawerWidth: number;
};

/**
 * Displays SearchBox and NavigationContent `headers` in column, inside of SideDrawer.
 * Uses a stack to navigate thru nested `items` in each NavigationContentItem.
 *
 * @param {NavigationContent} navigationContent NavigationContent to display
 * @param {number} sideDrawerWidth Width of parent SideDrawer in px
 *
 * @todo Add Link from next/link to headers and last subItems
 */
export const SideDrawerMenu = ({
  navigationContent,
  sideDrawerWidth
}: SideDrawerMenuProps): JSX.Element => {
  const [state, setState] = useState(initSideDrawerMenuState);

  const handleSearchActive = () => {
    setState({
      ...state,
      isSearchActive: !state.isSearchActive
    });
  };

  const handleMenuItemClick = (item: NavigationContentItem): void => {
    if (item.items) {
      const stack = [...state.subMenuStack];
      stack.push(item);
      const stackLength = state.subMenuStackLength + 1;
      setState({
        ...state,
        isSubMenuOpen: true,
        subMenuStack: stack,
        subMenuStackLength: stackLength
      });
    }
  };

  const handleBackButtonClick = () => {
    const stackLength =
      state.subMenuStackLength > 0 ? state.subMenuStackLength - 1 : 0;
    const stack = [...state.subMenuStack];
    stack.pop();
    
    setState({
      ...state,
      isSubMenuOpen: stackLength ? true : false,
      subMenuStackLength: stackLength,
      subMenuStack: stack
    });

    // setTimeout(() => {
    //   setState({
    //     ...state,
        
    //   });
    // }, 700);

  };

  return (
    <Contained width={`${sideDrawerWidth}px`} padding={"13px 0px"}>
      {/* 
        Displays Logo and SearchBox in a row. 
        When isSubMenuOpen is true, displays BackArrowButton and the name field of current subMenuStack item. 
      */}
      <Padded padBottom={"8px"}>
        <Transformed
          isTransformed={state.isSubMenuOpen}
          transform={`translateX(-${sideDrawerWidth}px)`}
        >
          <Contained width={`${sideDrawerWidth * 2}px`}>
            <Row alignCenter>
              <Contained width={`${sideDrawerWidth}px`}>
                <Row alignCenter justifyEvenly>
                  <SportsAtticLogoSmall />
                  <SearchBox
                    isActive={state.isSearchActive}
                    text={state.searchText}
                    onActiveClick={handleSearchActive}
                    onTextChange={e =>
                      setState({ ...state, searchText: e.target.value })
                    }
                  />
                </Row>
              </Contained>
              <BackArrowButton onClick={handleBackButtonClick} />
              {state.subMenuStack.length > 0 && (
                <Txt padding={"0px 20px"}>
                  {state.subMenuStack[state.subMenuStack.length - 1].name}
                </Txt>
              )}
            </Row>
          </Contained>
        </Transformed>
      </Padded>

      {/*
        Displays headers of navigationContent and renders all subMenuStack items when isSubMenuOpen is true.
      */}
      <Transformed
        isTransformed={state.isSubMenuOpen}
        transform={`translateX(-${sideDrawerWidth *
          state.subMenuStackLength}px)`}
      >
        <Contained
          width={`${sideDrawerWidth * (state.subMenuStackLength ?? 1)}px`}
        >
          <Row>
            <Column>
              {navigationContent.headers.map((header, index) => (
                <SideDrawerMenuItem
                  navigationContentItem={header}
                  onClick={item => handleMenuItemClick(item)}
                  width={`${sideDrawerWidth}px`}
                  hasBottomBorder={
                    navigationContent.headers.length - 1 === index
                  }
                  key={`SideDrawerMenuHeader${header.name}`}
                />
              ))}
            </Column>
            {state.subMenuStack.map((item, itemIndex) => (
              <Column key={`NestedNavigationColumn${item.name}${itemIndex}`}>
                {item.items?.map((subItem, subItemIndex) => (
                  <SideDrawerMenuItem
                    navigationContentItem={subItem}
                    onClick={subItem => handleMenuItemClick(subItem)}
                    width={`${sideDrawerWidth}px`}
                    hasBottomBorder={
                      item.items && item.items.length - 1 === subItemIndex
                    }
                    key={`NestedNavigationSubItem${subItem.name}${subItemIndex}`}
                  />
                ))}
              </Column>
            ))}
          </Row>
        </Contained>
      </Transformed>
    </Contained>
  );
};
