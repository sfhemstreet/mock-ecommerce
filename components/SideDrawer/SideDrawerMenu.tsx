import { useState } from "react";
import { Contained } from "../Contained";
import {
  NavigationContent,
  NavigationContentItem
} from "../../content/navigation/navigationContentTypes";
import { Row } from "../Row";
import { Column } from "../Column";
import { SearchBox } from "../SearchBox";
import { SportsAtticLogoSmall } from "../SportsAtticLogo";
import { Txt } from "../Txt";
import { SideDrawerMenuItem } from "./SideDrawerMenuItem";
import { Padded } from "../Padded";
import { Transformed } from "../Transformed";
import { BackArrowButton } from "../BackArrowButton";

const TRANSITION_TIME = 300;
const TRANSITION = `all ${TRANSITION_TIME}ms ease-in-out`;

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
  // SearchBox text and active setter
  const [searchBoxText, setSearchBoxText] = useState("");
  const [isSearchBoxActive, setSearchBoxActive] = useState(false);

  // Stack holds nested content, allowing us to go deeper and to go back
  const [contentStack, setContentStack] = useState(
    new Array<NavigationContentItem>()
  );
  // Stack length is used to animate the view position.
  // When backing out of nested content this length changes before we pop the stack
  // so that the content doesnt just dissappear.
  const [contentStackLength, setContentStackLength] = useState(0);
  // Keeps track of back button click to make sure stack is accurate with animation timing
  let clickTimer: number = Date.now();

  const handleSearchActive = () => {
    setSearchBoxActive(!isSearchBoxActive);
  };

  const handleMenuItemClick = (item: NavigationContentItem): void => {
    if (item.items) {
      const now = Date.now();
      // Makes sure we are waiting for removal from stack before pushing onto it
      if (
        now - clickTimer > TRANSITION_TIME &&
        contentStack.length === contentStackLength
      ) {
        const stack = [...contentStack];
        stack.push(item);
        const stackLength = stack.length;
        setContentStack(stack);
        setContentStackLength(stackLength);
      }
    }
  };

  const handleBackButtonClick = () => {
    clickTimer = Date.now();
    // Set stack length first to animate out of stack
    const stackLength =
      contentStack.length - 1 > 0 ? contentStack.length - 1 : 0;
    setContentStackLength(stackLength);

    // wait till animation is over to pop stack
    setTimeout(() => {
      const stack = [...contentStack];
      stack.pop();
      setContentStack(stack);
    }, TRANSITION_TIME);
  };

  return (
    <Contained width={`${sideDrawerWidth}px`} padding={"13px 0px"}>
      {/* 
        Displays Logo and SearchBox in a row. 
        When in the contentStack displays BackArrowButton and the name field of current contentStack item. 
      */}
      <Padded padBottom={"8px"}>
        <Transformed
          isTransformed={contentStackLength > 0}
          transform={`translateX(-${sideDrawerWidth}px)`}
          transition={TRANSITION}
        >
          <Contained width={`${sideDrawerWidth * 2}px`}>
            <Row alignCenter>
              <Contained width={`${sideDrawerWidth}px`}>
                <Row alignCenter justifyEvenly>
                  <SportsAtticLogoSmall />
                  <SearchBox
                    isActive={isSearchBoxActive}
                    text={searchBoxText}
                    onActiveClick={handleSearchActive}
                    onTextChange={e => setSearchBoxText(e.target.value)}
                  />
                </Row>
              </Contained>
              <BackArrowButton onClick={handleBackButtonClick} />
              {contentStack.length > 0 && (
                <Txt padding={"0px 20px"} big>
                  {contentStack[contentStack.length - 1].name}
                </Txt>
              )}
            </Row>
          </Contained>
        </Transformed>
      </Padded>

      {/*
        Displays headers of navigationContent and renders row for contentStack items.
      */}
      <Transformed
        isTransformed={contentStackLength > 0}
        transform={`translateX(-${sideDrawerWidth * contentStackLength}px)`}
        transition={TRANSITION}
      >
        <Contained width={`${sideDrawerWidth * (contentStackLength ?? 1)}px`}>
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
            {contentStack.map((item, itemIndex) => (
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
