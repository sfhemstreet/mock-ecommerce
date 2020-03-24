import { useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { Row } from "../Row";
import { BackgroundBlack } from "../Background";
import { SportsAtticLogo } from "../SportsAtticLogo";
import { SearchBox } from "../SearchBox";
import { Padded } from "../Padded";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { MenuIcon } from "../MenuIcon";
import { ShoppingCartIcon } from "../ShoppingCartIcon";
import { NavigationBarDropDown } from "./NavigationBarDropDown";
import { Positioned } from "../Positioned";
import { NavigationContent } from "../../content/navigation/navigationContentTypes";

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
  height: 10px;
  border-radius: 5px 5px 0px 0px;
  background-color: ${props => props.theme.colors.green};
  ${props => props.state === "exiting" && "transform: scaleX(0)"};
  transition: transform 500ms ease-out;
`;

const initNavigationBarState = {
  dropDownOption: "",
  dropDownActive: false,
  searchBoxText: "",
  searchBoxActive: false
};

type NavigationBarProps = {
  navigationContent: NavigationContent;
  isSideDrawerOpen: boolean;
  onClickSideDrawer: () => void;
};

export function NavigationBar({
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
                  {navigationContent.headers.map(item => (
                    <NavLinkItem
                      onMouseEnter={() => handleNavLinkItemFocus(item.name)}
                      onFocus={() => handleNavLinkItemFocus(item.name)}
                      isActive={
                        state.dropDownActive && state.dropDownOption === item.name
                      }
                      tabIndex={0}
                      key={`DropDown${item.name}`}
                    >
                      {item.name}
                      <Transition
                        in={
                          state.dropDownActive && state.dropDownOption === item.name
                        }
                        mountOnEnter
                        unmountOnExit
                        timeout={{
                          appear: 10,
                          enter: 100,
                          exit: state.dropDownOption === item.name ? 500 : 0
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
        navigationContentItem={navigationContent.headers.filter(item => {
          if (item.name === state.dropDownOption){
            return item;
          } 
        })[0]}
      />
    </Positioned>
  );
}
