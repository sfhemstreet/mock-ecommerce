import React from "react";
import styled from "styled-components";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";

const MenuIconContainer = styled.div`
  width: 34px;
  height: 28px;
  position: relative;
  cursor: pointer;
`;

type MenuIconLineProps = {
  top: number;
  angle: number;
};

const MenuIconLine = styled.div<MenuIconLineProps>`
  width: 33px;
  height: 6px;
  background: ${props => props.theme.colors.white};

  /* position: absolute;
  top: ${props => `${props.top}px`}; */
  transform: ${props => `translateY(${props.top}px) rotate(${props.angle}deg)`};

  transition: all 0.5s ease-in-out;
`;

export type MenuIconProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const MenuIcon = ({
  onClick,
  isOpen,
}: MenuIconProps): JSX.Element => (
  <MenuIconContainer 
    onClick={onClick}
    onKeyPress={ accessibleEnterKeyPress(onClick) }
    tabIndex={0}
    aria-label={isOpen ? "Close side drawer menu" : "Open side drawer menu"}
    role="button"
  >
    <MenuIconLine
      top={isOpen ? 11 : 0}
      angle={isOpen ? 45 : 0}
    />
    <MenuIconLine
      top={isOpen ? 5 : 5}
      angle={isOpen ? -135 : 0}
    />
    <MenuIconLine
      top={isOpen ? -1 : 10}
      angle={isOpen ? -45 : 0}
    />
  </MenuIconContainer>
);