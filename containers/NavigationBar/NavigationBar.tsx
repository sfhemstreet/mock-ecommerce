import { useState } from "react";
import styled from "styled-components";
import { Row } from "../../components/Row";
import { BackgroundBlack } from "../../components/Background";
import { SportsAtticLogo } from "../../components/SportsAtticLogo";
import { SearchBox } from "../../components/SearchBox";
import { Padded } from "../../components/Padded";
import { DisplayAtMedia } from "../../components/DisplayAtMedia";
import { MenuIcon } from "../../components/MenuIcon";
import { ShoppingCartIcon } from "../../components/ShoppingCartIcon";
import { NavigationBarDropDown } from "./NavigationBarDropDown";
import { Positioned } from "../../components/Positioned";
import { NavigationBarItemData } from "./NavigationBarItemData";
import {
  CLOTHING,
  ACTIVITIES,
  BRANDS,
  SALE,
  NavigationBarItemOptionType
} from "./NavigationBarItemOptions";
import { FadeIn } from "../../keyframes/FadeIn";

const NavLinkItem = styled.a<{ isActive: boolean }>`
  position: relative;
  padding: 20px 0px;
  width: 100px;
  text-align: center;

  border-style: solid;
  border-color: ${props =>
    props.isActive ? props.theme.colors.white : "transparent"};
  border-bottom-color: transparent;
  border-width: 1px;
  border-radius: 10px 10px 0px 0px;

  background-color: ${props =>
    props.isActive ? props.theme.colors.green : "transparent"};

  cursor: pointer;
  transition: all 0.2s ease-in;
`;

const NavLinkBottomBorderCoverStrip = styled.div`
  width: 100px;
  height: 6px;
  background-color: ${props => props.theme.colors.green};
  animation: ${FadeIn} 0.2s ease-in;
`;

const initNavigationBarState = {
  dropDownOption: "",
  dropDownActive: false,
  searchBoxText: "",
  searchBoxActive: false
};

type NavigationBarProps = {
  isSideDrawerOpen: boolean;
  onClickSideDrawer: () => void;
};

export function NavigationBar({
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
  const handleNavLinkItemFocus = (option: NavigationBarItemOptionType) => {
    setState({
      ...state,
      dropDownActive: true,
      dropDownOption: option,
      searchBoxActive: false
    });
  };

  return (
    <Positioned>
      <BackgroundBlack>
        <Row alignCenter justifyBetween>
          <DisplayAtMedia mobile tablet>
            <Padded padding={"0px 20px"}>
              <MenuIcon onClick={onClickSideDrawer} isOpen={isSideDrawerOpen} />
            </Padded>
          </DisplayAtMedia>

          <Padded padding={"20px"}>
            <SportsAtticLogo />
          </Padded>

          {!isSideDrawerOpen && (
            <DisplayAtMedia laptop desktop>
              <Positioned left={"60px"}>
                <Row justifyCenter>
                  <NavLinkItem
                    onMouseEnter={() => handleNavLinkItemFocus(CLOTHING)}
                    onFocus={() => handleNavLinkItemFocus(CLOTHING)}
                    isActive={
                      state.dropDownActive && state.dropDownOption === CLOTHING
                    }
                    tabIndex={0}
                  >
                    Clothing
                    {state.dropDownActive && state.dropDownOption === CLOTHING && (
                      <Positioned absolute top={"60px"} zIndex={5}>
                        <NavLinkBottomBorderCoverStrip />
                      </Positioned>
                    )}
                  </NavLinkItem>
                  <NavLinkItem
                    onMouseEnter={() => handleNavLinkItemFocus(ACTIVITIES)}
                    onFocus={() => handleNavLinkItemFocus(ACTIVITIES)}
                    isActive={
                      state.dropDownActive &&
                      state.dropDownOption === ACTIVITIES
                    }
                    tabIndex={0}
                  >
                    Activities
                    {state.dropDownActive &&
                      state.dropDownOption === ACTIVITIES && (
                        <Positioned absolute top={"60px"} zIndex={5}>
                          <NavLinkBottomBorderCoverStrip />
                        </Positioned>
                      )}
                  </NavLinkItem>
                  <NavLinkItem
                    onMouseEnter={() => handleNavLinkItemFocus(BRANDS)}
                    onFocus={() => handleNavLinkItemFocus(BRANDS)}
                    isActive={
                      state.dropDownActive && state.dropDownOption === BRANDS
                    }
                    tabIndex={0}
                  >
                    Brands
                    {state.dropDownActive && state.dropDownOption === BRANDS && (
                      <Positioned absolute top={"60px"} zIndex={5}>
                        <NavLinkBottomBorderCoverStrip />
                      </Positioned>
                    )}
                  </NavLinkItem>
                  <NavLinkItem
                    onMouseEnter={() => handleNavLinkItemFocus(SALE)}
                    onFocus={() => handleNavLinkItemFocus(SALE)}
                    isActive={
                      state.dropDownActive && state.dropDownOption === SALE
                    }
                    tabIndex={0}
                  >
                    Sale
                    {state.dropDownActive && state.dropDownOption === SALE && (
                      <Positioned absolute top={"60px"} zIndex={5}>
                        <NavLinkBottomBorderCoverStrip />
                      </Positioned>
                    )}
                  </NavLinkItem>
                </Row>
              </Positioned>
            </DisplayAtMedia>
          )}

          <DisplayAtMedia laptop desktop>
            <Padded padding={"0px 20px"}>
              <Row alignCenter justifyCenter>
                <Padded padRight={"10px"}>
                  <SearchBox
                    isActive={state.searchBoxActive}
                    onActiveClick={handleSearchOpenClose}
                    text={state.searchBoxText}
                    onTextChange={evt =>
                      setState({
                        ...state,
                        searchBoxText: evt.target.value
                      })
                    }
                  />
                </Padded>
                <ShoppingCartIcon numberOfItems={2} />
              </Row>
            </Padded>
          </DisplayAtMedia>
        </Row>
      </BackgroundBlack>
      <NavigationBarDropDown
        isActive={state.dropDownActive}
        onMouseLeave={() => setState({ ...state, dropDownActive: false })}
        
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est et
          cupiditate facere laborum quas, exercitationem nihil eius fugiat
          eligendi cum nisi libero hic amet, laboriosam, cumque quisquam?
          Debitis, unde exercitationem?
        </div>
      </NavigationBarDropDown>
    </Positioned>
  );
}
