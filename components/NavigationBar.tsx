import { useState, useReducer } from "react";
import styled from "styled-components";
import { Row } from "../components/Row";
import { BackgroundBlack } from "./Background";
import { SportsAtticLogo } from "./SportsAtticLogo";
import { SearchBox } from "./SearchBox";
import { Padded } from "./Padded";
import { DisplayAtMedia } from "./DisplayAtMedia";
import { MenuIcon } from "./MenuIcon";
import {
  MainLayoutAction,
  SEARCH,
  SIDE_DRAWER,
  TYPING_SEARCH
} from "../layouts/MainLayout";

const NavLinkItem = styled.a`
  padding: 20px 30px;
  cursor: pointer;

  :hover {
    color: ${props => props.theme.colors.yellow};
  }
`;

type NavigationBarProps = {
  isMenuOpen: boolean;
  isSearching: boolean;
  searchText: string;
  dispatch: (value: MainLayoutAction) => void;
};

export function NavigationBar({
  isMenuOpen,
  isSearching,
  searchText,
  dispatch
}: NavigationBarProps) {
  return (
    <BackgroundBlack>
      <Row alignCenter justifyBetween>
        <DisplayAtMedia mobile tablet>
          <Padded pad={"0px 20px"}>
            <MenuIcon
              onClick={() => dispatch({ type: SIDE_DRAWER })}
              isOpen={isMenuOpen}
            />
          </Padded>
        </DisplayAtMedia>

        <NavLinkItem>
          <SportsAtticLogo />
        </NavLinkItem>

        <DisplayAtMedia laptop desktop>
          <Row justifyCenter>
            <NavLinkItem>Clothing</NavLinkItem>
            <NavLinkItem>Activities</NavLinkItem>
            <NavLinkItem>Brands</NavLinkItem>
            <NavLinkItem>Sale</NavLinkItem>
          </Row>
        </DisplayAtMedia>

        <Padded pad={"0px 20px 0px 0px"}>
          <SearchBox
            isActive={isSearching}
            onActiveClick={() => dispatch({ type: SEARCH })}
            text={searchText}
            onTextChange={evt =>
              dispatch({ type: TYPING_SEARCH, payload: evt.target.value })
            }
          />
        </Padded>
      </Row>
    </BackgroundBlack>
  );
}
