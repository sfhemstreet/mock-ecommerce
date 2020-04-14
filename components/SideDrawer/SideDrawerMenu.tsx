import { useState } from "react";
import { Contained } from "../Contained";
import { Row } from "../Row";
import { Column } from "../Column";
import { SearchBox } from "../SearchBox/SearchBox";
import { LogoSmall } from "../Logo";
import { Txt } from "../Txt";
import { SideDrawerMenuItem } from "./SideDrawerMenuItem";
import { Padded } from "../Padded";
import { Transformed } from "../Transformed";
import { BackArrowButton } from "../BackArrowButton";
import { Category } from "../../queries/navigationBarSideDrawerLayout/getCategories";
import { SiteLogo } from "../../queries/navigationBarSideDrawerLayout/getSiteLogo";

const TRANSITION_TIME = 300;
const TRANSITION = `all ${TRANSITION_TIME}ms ease-in-out`;

type SideDrawerMenuProps = {
  siteLogo: SiteLogo;
  navigationContent: Category[];
  sideDrawerWidth: number;
};

/**
 * Displays SearchBox and NavigationContent `headers` in column, inside of SideDrawer.
 * Uses a stack to navigate thru nested `items` in each NavigationContentItem.
 * @param {SiteLogo} siteLogo 
 * @param {Category[]} navigationContent NavigationContent to display
 * @param {number} sideDrawerWidth Width of parent SideDrawer in px
 *
 * @todo Add Link from next/link to headers and last subItems
 */
export const SideDrawerMenu = ({
  siteLogo,
  navigationContent,
  sideDrawerWidth
}: SideDrawerMenuProps): JSX.Element => {
  // SearchBox active setter
  const [isSearchBoxActive, setSearchBoxActive] = useState(false);

  // Stack holds nested content, allowing us to go deeper and to go back
  const [contentStack, setContentStack] = useState(
    new Array<Category>()
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

  const handleMenuItemClick = (item: Category): void => {
    if (item.SubCategories) {
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
                  <LogoSmall siteLogo={siteLogo}/>
                  <SearchBox
                    isActive={isSearchBoxActive}
                    onActiveClick={handleSearchActive}
                  />
                </Row>
              </Contained>
              <BackArrowButton onClick={handleBackButtonClick} />
              {contentStack.length > 0 && (
                <Txt padding={"0px 20px"} big>
                  {contentStack[contentStack.length - 1].Name}
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
              {navigationContent.map((header, index) => (
                <SideDrawerMenuItem
                  navigationContentItem={header}
                  onClick={item => handleMenuItemClick(item)}
                  width={`${sideDrawerWidth}px`}
                  hasBottomBorder={
                    navigationContent.length - 1 === index
                  }
                  key={`SideDrawerMenuHeader${header.Name}`}
                />
              ))}
            </Column>
            {contentStack.map((item, itemIndex) => (
              <Column key={`NestedNavigationColumn${item.Name}${itemIndex}`}>
                {item.SubCategories?.map((subItem, subItemIndex) => (
                  <SideDrawerMenuItem
                    navigationContentItem={subItem}
                    onClick={subItem => handleMenuItemClick(subItem)}
                    width={`${sideDrawerWidth}px`}
                    hasBottomBorder={
                      item.SubCategories && item.SubCategories.length - 1 === subItemIndex
                    }
                    key={`NestedNavigationSubItem${subItem.Name}${subItemIndex}`}
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
