import Link from 'next/link';
import { useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { Row } from "../Row";
import { BackgroundBlack } from "../Background";
import { Logo } from "../Logo";
import { SearchBox } from "../SearchBox/SearchBox";
import { Padded } from "../Padded";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { MenuIcon } from "../MenuIcon";
import { ShoppingCartNavigationIcon } from "../ShoppingCart/ShoppingCartNavigationIcon";
import { NavigationBarDropDown } from "./NavigationBarDropDown";
import { Positioned } from "../Positioned";
import { WishListNavigationIcon } from "../WishList/WishListNavigationIcon";
import { AppTheme } from '../../themes/AppTheme';
import { Category, SiteLogo } from '../../queries/types';

export const NAV_HEIGHT = "85px";

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
  const [state, setState] = useState(initNavigationBarState);

  // Closes Dropdown and opens/closes the SearchBox
  const handleSearchOpenClose = () => {
    setState({
      ...state,
      dropDownActive: false,
      searchBoxActive: !state.searchBoxActive
    });
  };

  // Closes SearchBox if open and sets dropDown state to active with given option
  const handleNavLinkItemFocus = (option: string) => {
    setState({
      ...state,
      dropDownActive: true,
      dropDownOption: option,
      searchBoxActive: false
    });
  };

  return (
    <Positioned zIndex={parseInt(AppTheme.zIndexes.navigationBar, 10)} >
      <BackgroundBlack>
        <Row alignCenter justifyBetween>
          <DisplayAtMedia mobile tablet laptop>
            <Padded padding={"0px 20px"}>
              <MenuIcon onClick={onClickSideDrawer} isOpen={isSideDrawerOpen} />
            </Padded>
          </DisplayAtMedia>

          <Padded padding={"20px 20px 20px 50px"}>
            <Link href={"/"}>
              <a>
                <Logo siteLogo={siteLogo}/>
              </a>
            </Link>
          </Padded>

          {!isSideDrawerOpen && (
            <DisplayAtMedia desktop>
              <Positioned left={"60px"}>
                <Row justifyCenter>
                  {navigationContent.map(item => (
                    <NavLinkItem
                      onMouseEnter={() => handleNavLinkItemFocus(item.Name)}
                      onFocus={() => handleNavLinkItemFocus(item.Name)}
                      isActive={
                        state.dropDownActive && state.dropDownOption === item.Name
                      }
                      tabIndex={0}
                      key={`DropDown${item.Name}`}
                    >
                      {item.Name}
                      <Transition
                        in={
                          state.dropDownActive && state.dropDownOption === item.Name
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
              <DisplayAtMedia desktop>
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
        navigationContentItem={navigationContent.filter(item => {
          if (item.Name === state.dropDownOption){
            return item;
          } 
        })[0]}
      />
    </Positioned>
  );
}
