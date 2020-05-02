import Link from "next/link";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { Row } from "../Row";
import { BackgroundBlack } from "../Background";
import { Logo } from "../Logo";
import { SearchBox } from "../SearchBox/SearchBox";
import { Padded } from "../Padded";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";
import { MenuIcon } from "../MenuIcon";
import { ShoppingCartNavigationIcon } from "../ShoppingCart/ShoppingCartNavigationIcon";
import { NavigationBarDropDown } from "./NavigationBarDropDown";
import { Positioned } from "../Positioned";
import { WishListNavigationIcon } from "../WishList/WishListNavigationIcon";
import { AppTheme } from "../../themes/AppTheme";
import { Category, SiteLogo } from "../../queries/types";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { joinCategoriesOnLastNames } from "../../util/joinCategoriesOnLastName";

export const NAV_HEIGHT = "85px";

const MenuContainer = styled.div`
  padding-left: 10px;

  @media ${mediaDevices.mobileM} {
    padding-left: 20px;
  }
`;

const NavLinkItem = styled.a<{ isActive: boolean }>`
  position: relative;

  width: 100px;
  height: 50px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  cursor: pointer;
  transition: all 0.3s ease-in;

  color: ${(props) =>
    props.isActive ? props.theme.colors.green : props.theme.colors.white};
`;

const NavLinkBottomBorderCoverStrip = styled.div<{ state: string }>`
  width: 100px;
  height: 10px;
  border-radius: 5px 5px 0px 0px;
  background-color: ${(props) => props.theme.colors.green};
  ${(props) => props.state === "exiting" && "transform: scaleX(0)"};
  transition: transform 500ms ease-out;
`;

const initNavigationBarState = {
  timeOfLastMouseEnter: 0,
  dropDownOption: "",
  dropDownActive: false,
  searchBoxActive: false,
};

type NavigationBarState = typeof initNavigationBarState;

type NavigationBarProps = {
  siteLogo: SiteLogo;
  navigationContent: Category[];
  isSideDrawerOpen: boolean;
  onClickSideDrawer: () => void;
};

/**
 * Navigation Bar that displays the website logo, WishList and Shopping Cart,
 * and on lasrger screens the navigation content as dropdown items and a SearchBox.
 *
 * On smaller screens the navigation content and SearchBox are not on the bar.
 * A button to open and close the SideDrawer is displayed on the left side.
 *
 * @param siteLogo
 * @param navigationContent
 * @param isSideDrawerOpen
 * @param onClcikSideDrawer
 */
export function NavigationBar({
  siteLogo,
  navigationContent,
  isSideDrawerOpen,
  onClickSideDrawer,
}: NavigationBarProps) {
  // Time that must pass after timeOfLastMouseEnter
  const MOUSE_ENTER_WAIT_TIME = 100;

  const [state, setState] = useState<NavigationBarState>(
    initNavigationBarState
  );

  // For keyboard users, if a navigation item is selected via keyboard 
  // we give focus to the first item in the drop down so keyboard users 
  // can quickly navigate. 
  const [giveDropDownFocus, setDropDownFocus] = useState(false);

  // Creates shell parent Categories for categories with same last name,
  // so NavBar is less cluttered and dropdowns are more full.
  const [navContent, setNavContent] = useState(
    joinCategoriesOnLastNames(navigationContent)
  );

  // Toggles open/close of SearchBox and always closes Dropdown to avoid clutter.
  const handleSearchOpenClose = () => {
    setState({
      ...state,
      dropDownActive: false,
      searchBoxActive: !state.searchBoxActive,
    });
  };

  // Opens dropdown of given option if mouse hovers over Navigation Item.
  // We need to get the time of the hover so we can avoid
  // a buggy experience for large touchscreen users.
  // A touch can trigger onClick and onMouseEnter, so by tracking when
  // the mouse enters, we can avoid abruptly closing the dropdown.
  const handleNavLinkItemMouseEnter = (option: string) => {
    setState({
      ...state,
      timeOfLastMouseEnter: Date.now(),
      dropDownActive: true,
      dropDownOption: option,
      searchBoxActive: false,
    });
  };

  // Toggles Dropdown open/close with given option.
  // Checks if MOUSE_ENTER_WAIT_TIME has passed so that
  // the dropdown doesn't abruptly close on touchscreen users who triggered
  // click events and mouse enter events back to back.
  const handleNavLinkItemClick = (
    option: string,
    shouldGiveDropDownItemFocus?: boolean
  ) => {
    if (Date.now() - state.timeOfLastMouseEnter > MOUSE_ENTER_WAIT_TIME) {
      setState({
        ...state,
        dropDownActive:
          state.dropDownActive && option === state.dropDownOption
            ? false
            : true,
        dropDownOption: option,
        searchBoxActive: false,
      });
    } else {
      setState({
        ...state,
        dropDownActive: true,
        dropDownOption: option,
        searchBoxActive: false,
      });
    }
  };

  // Closes Dropdown if MOUSE_ENTER_WAIT_TIME has passed from
  // timeOfLastMouseEnter. We check this to avoid closing the
  // dropdown for touch screen users who can trigger mouseLeave events
  // right after they select an item.
  const handleCloseNavDropDown = () => {
    if (Date.now() - state.timeOfLastMouseEnter > MOUSE_ENTER_WAIT_TIME)
      setState({ ...state, dropDownActive: false });
  };

  useEffect(() => {
    setNavContent(joinCategoriesOnLastNames(navigationContent));
  }, [navigationContent]);

  return (
    <Positioned zIndex={parseInt(AppTheme.zIndexes.navigationBar, 10)}>
      <BackgroundBlack>
        <Row alignCenter justifyBetween>
          <DisplayAtMedia mobile tablet>
            <MenuContainer>
              <MenuIcon onClick={onClickSideDrawer} isOpen={isSideDrawerOpen} />
            </MenuContainer>
          </DisplayAtMedia>

          <DisplayAtMedia mobile tablet>
            <Padded padding={"20px 20px 20px 50px"}>
              <Link href={"/"}>
                <a>
                  <Logo siteLogo={siteLogo} />
                </a>
              </Link>
            </Padded>
          </DisplayAtMedia>

          <DisplayAtMedia laptop desktop>
            <Padded padding={"20px 20px 20px 20px"}>
              <Link href={"/"}>
                <a>
                  <Logo siteLogo={siteLogo} />
                </a>
              </Link>
            </Padded>
          </DisplayAtMedia>

          {!isSideDrawerOpen && (
            <DisplayAtMedia laptop desktop>
              <Positioned left={"85px"}>
                <Row justifyCenter>
                  {navContent.map((item) => (
                    <NavLinkItem
                      onMouseEnter={() =>
                        handleNavLinkItemMouseEnter(item.Name)
                      }
                      onClick={() => handleNavLinkItemClick(item.Name)}
                      // When a keyboard user hits the enter key 
                      // give the dropdown focus and handle its open/close state.
                      onKeyPress={accessibleEnterKeyPress(() => {
                        setDropDownFocus(true);
                        handleNavLinkItemClick(item.Name);
                      })}
                      isActive={
                        state.dropDownActive &&
                        state.dropDownOption === item.Name
                      }
                      tabIndex={0}
                      aria-label={`${
                        state.dropDownActive &&
                        state.dropDownOption === item.Name
                          ? "Close"
                          : "Open"
                      } submenu for ${item.Name}`}
                      key={`DropDown${item.Name}`}
                    >
                      {item.Name}
                      <Transition
                        in={
                          state.dropDownActive &&
                          state.dropDownOption === item.Name
                        }
                        mountOnEnter
                        unmountOnExit
                        timeout={{
                          appear: 10,
                          enter: 100,
                          exit: state.dropDownOption === item.Name ? 500 : 0,
                        }}
                      >
                        {(state) => (
                          <Positioned absolute top={"44px"} zIndex={5}>
                            <NavLinkBottomBorderCoverStrip state={state} />
                          </Positioned>
                        )}
                      </Transition>
                    </NavLinkItem>
                  ))}
                </Row>
              </Positioned>
            </DisplayAtMedia>
          )}

          <Padded padding={"0px 20px"}>
            <Row alignCenter justifyCenter>
              <DisplayAtMedia laptop desktop>
                <Padded padRight={"10px"}>
                  <SearchBox
                    isActive={state.searchBoxActive}
                    onActiveClick={handleSearchOpenClose}
                  />
                </Padded>
              </DisplayAtMedia>
              <Padded padRight={"10px"}>
                <WishListNavigationIcon />
              </Padded>
              <ShoppingCartNavigationIcon />
            </Row>
          </Padded>
        </Row>
      </BackgroundBlack>
      <NavigationBarDropDown
        giveFocus={giveDropDownFocus}
        isActive={state.dropDownActive && !isSideDrawerOpen}
        onMouseLeave={handleCloseNavDropDown}
        navigationContentItem={
          navContent.filter((item) => item.Name === state.dropDownOption)[0]
        }
      />
    </Positioned>
  );
}
