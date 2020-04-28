import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
import { useOutsideClick } from "../../hooks/useOutsideClick";

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
  text-align: center;

  background-color: transparent;

  cursor: pointer;
  transition: all 0.3s ease-in;

  color: ${props =>
    props.isActive ? props.theme.colors.green : props.theme.colors.white};
`;

const NavLinkBottomBorderCoverStrip = styled.div<{ state: string }>`
  width: 100px;
  height: 10px;
  border-radius: 5px 5px 0px 0px;
  background-color: ${props => props.theme.colors.green};
  ${props => props.state === "exiting" && "transform: scaleX(0)"};
  transition: transform 500ms ease-out;
`;

const initNavigationBarState = {
  dropDownOption: "",
  dropDownActive: false,
  searchBoxActive: false
};

type NavigationBarProps = {
  siteLogo: SiteLogo;
  navigationContent: Category[];
  isSideDrawerOpen: boolean;
  onClickSideDrawer: () => void;
};

export function NavigationBar({
  siteLogo,
  navigationContent,
  isSideDrawerOpen,
  onClickSideDrawer
}: NavigationBarProps) {
  // Join categorioes which have same last word
  const joinLikeCategories = (categories: Category[]) => {
    const lastWords: { [key: string]: Category[] } = {};

    for (const cat of categories) {
      const last = cat.Name.substring(cat.Name.lastIndexOf(" ")).trim();
      lastWords[last] = lastWords[last]
        ? [...lastWords[last], cat]
        : (lastWords[last] = [cat]);
    }

    return Object.keys(lastWords).map(
      key =>
        ({
          id: key,
          slug: key,
          Name: key,
          SubCategories: lastWords[key].map(cat => cat)
        } as Category)
    );
  };

  const [state, setState] = useState(initNavigationBarState);
  const [navContent, setNavContent] = useState(
    joinLikeCategories(navigationContent)
  );

  // Closes Dropdown and opens/closes the SearchBox
  const handleSearchOpenClose = () => {
    setState({
      ...state,
      dropDownActive: false,
      searchBoxActive: !state.searchBoxActive
    });
  };

  // Closes SearchBox if open and sets dropDown state to active with given option
  const handleNavLinkItemMouseEnter = (option: string) => {
    setState({
      ...state,
      dropDownActive: true,
      dropDownOption: option,
      searchBoxActive: false
    });
  };

  // Closes SearchBox if open and sets dropDown state to active with given option
  const handleNavLinkItemKeyPressEnter = (option: string) => {


    setState({
      ...state,
      dropDownActive: state.dropDownActive && option === state.dropDownOption ? false : true,
      dropDownOption: option,
      searchBoxActive: false
    });
  };

  useEffect(() => {
    setNavContent(joinLikeCategories(navigationContent));
  }, [navigationContent]);

  return (
    <Positioned zIndex={parseInt(AppTheme.zIndexes.navigationBar, 10)} >
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
              <Positioned left={"60px"}>
                <Row justifyCenter>
                  {navContent.map(item => (
                    <NavLinkItem
                      onMouseEnter={() => handleNavLinkItemMouseEnter(item.Name)}
                      onKeyPress={accessibleEnterKeyPress(() => handleNavLinkItemKeyPressEnter(item.Name))}
                      isActive={
                        state.dropDownActive &&
                        state.dropDownOption === item.Name
                      }
                      tabIndex={0}
                      aria-label={`${state.dropDownActive && state.dropDownOption === item.Name ? "Close" : "Open"} submenu for ${item.Name}`}
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
                          exit: state.dropDownOption === item.Name ? 500 : 0
                        }}
                      >
                        {state => (
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
        isActive={state.dropDownActive && !isSideDrawerOpen}
        onMouseLeave={() => setState({ ...state, dropDownActive: false })}
        navigationContentItem={
          navContent.filter(item => item.Name === state.dropDownOption)[0]
        }
      />
    </Positioned>
  );
}
