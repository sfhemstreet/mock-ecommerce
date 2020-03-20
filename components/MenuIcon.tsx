import React from "react";
import styled from "styled-components";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";


const MenuIconContainer = styled.div`
  width: 33px;
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

  position: absolute;

  top: ${props => `${props.top}px`};
  transform: ${props => `rotate(${props.angle}deg)`};

  transition: all 0.5s ease-in-out;

  ${MenuIconContainer}:hover & {
    background: ${props => props.theme.colors.rose};
  }
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
  >
    <MenuIconLine
      top={isOpen ? 11 : 0}
      angle={isOpen ? 45 : 0}
    />
    <MenuIconLine
      top={isOpen ? 11 : 11}
      angle={isOpen ? -135 : 0}
    />
    <MenuIconLine
      top={isOpen ? 11 : 22}
      angle={isOpen ? -45 : 0}
    />
  </MenuIconContainer>
);