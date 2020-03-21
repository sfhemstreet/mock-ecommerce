import { useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { Row } from "../components/Row";
import { BackgroundBlack } from "../components/Background";
import { SportsAtticLogo } from "../components/SportsAtticLogo";
import { SearchBox } from "../components/SearchBox";
import { Padded } from "../components/Padded";
import { DisplayAtMedia } from "../components/DisplayAtMedia";
import { MenuIcon } from "../components/MenuIcon";
import { ShoppingCartIcon } from "../components/ShoppingCartIcon";
import { NavigationBarDropDown } from "../components/NavigationBarDropDown";
import { Positioned } from "../components/Positioned";
import { FadeIn } from "../keyframes/FadeIn";

const NavLinkItem = styled.a<{ isActive: boolean }>`
  position: relative;
  padding: 20px 0px;
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
  height: 7px;
  border-radius: 5px 5px 0px 0px;
  background-color: ${props => props.theme.colors.green};
  ${props => props.state === "exiting" && "transform: scaleX(0)"};
  transition: transform 500ms ease-out;
`;

export const CLOTHING = "Clothing";
export const ACTIVITIES = "Activities";
export const BRANDS = "Brand";
export const SALE = "Sale";
export type NavigationBarItemOptionType =
  | typeof CLOTHING
  | typeof ACTIVITIES
  | typeof BRANDS
  | typeof SALE;

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

  const navItems: NavigationBarItemOptionType[] = [
    CLOTHING,
    ACTIVITIES,
    BRANDS,
    SALE
  ];

  return (
    <Positioned zIndex={4}>
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
                  {navItems.map(item => (
                    <NavLinkItem
                      onMouseEnter={() => handleNavLinkItemFocus(item)}
                      onFocus={() => handleNavLinkItemFocus(item)}
                      isActive={
                        state.dropDownActive && state.dropDownOption === item
                      }
                      tabIndex={0}
                      key={`DropDown${item}`}
                    >
                      {item}
                      <Transition
                        in={
                          state.dropDownActive && state.dropDownOption === item
                        }
                        mountOnEnter
                        unmountOnExit
                        timeout={{
                          appear: 10,
                          enter: 100,
                          exit: state.dropDownOption === item ? 500 : 0
                        }}
                      >
                        {state => (
                          <Positioned absolute top={"55px"} zIndex={5}>
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
                    text={state.searchBoxText}
                    onTextChange={evt =>
                      setState({
                        ...state,
                        searchBoxText: evt.target.value
                      })
                    }
                  />
                </Padded>
              </DisplayAtMedia>
              <ShoppingCartIcon numberOfItems={1} />
            </Row>
          </Padded>
        </Row>
      </BackgroundBlack>
      <NavigationBarDropDown
        isActive={state.dropDownActive && !isSideDrawerOpen}
        onMouseLeave={() => setState({ ...state, dropDownActive: false })}
      >
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
          laboriosam corrupti quasi aperiam voluptatibus qui quod dignissimos
          atque! Consequuntur impedit officia mollitia, amet ab totam quis quam
          esse vero odit. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Omnis voluptatibus recusandae illum doloribus incidunt nulla
          modi nemo doloremque mollitia, officiis laudantium aliquam minus,
          facere ex eius velit repudiandae quia ducimus?
        </div>
      </NavigationBarDropDown>
    </Positioned>
  );
}
