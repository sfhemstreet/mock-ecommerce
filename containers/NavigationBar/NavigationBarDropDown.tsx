import { Transition } from "react-transition-group";
import styled from "styled-components";
import { FunctionComponent, useState } from "react";

const NavigationBarDropDownContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;

  display: none;

  width: auto;
  height: 0px;

  transition: all 300ms ease-in-out;

  padding: 30px;

  background-color: ${props => props.theme.colors.green};

  border-style: solid;
  border-color: ${props => props.theme.colors.white};
  border-width: 1px;
`;

const transitionStyles = {
  entering: {
    opacity: 1,
    display: "block",
    height: "auto"
  },
  entered: {
    opacity: 1,
    display: "block",
    height: "auto"
  },
  exiting: {
    opacity: 0,
    display: "none",
    height: "0px"
  },
  exited: {
    opacity: 0,
    display: "none",
    height: "0px"
  },
  unmounted: {
    opacity: 0,
    display: "none",
    height: "0px"
  }
};

type NavigationBarDropDownProps = {
  isActive: boolean;
  onMouseLeave: () => void;
};

/**
 * Drop down for the navigation bar
 * @param {boolean} isActive
 * @param {() => void} onMouseLeave
 */
export const NavigationBarDropDown: FunctionComponent<NavigationBarDropDownProps> = ({
  isActive,
  onMouseLeave,
  children
}): JSX.Element => {
  return (
    <Transition appear in={isActive} timeout={300}>
      {state => {
        //console.log(state);
        return (
          <NavigationBarDropDownContainer
            isVisible={isActive}
            onMouseLeave={onMouseLeave}
            style={{ ...transitionStyles[state] }}
          >
            {children}
          </NavigationBarDropDownContainer>
        );
      }}
    </Transition>
  );
};
