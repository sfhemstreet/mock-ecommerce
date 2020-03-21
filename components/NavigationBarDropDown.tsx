import { Transition } from "react-transition-group";
import styled from "styled-components";
import { FunctionComponent, useState } from "react";

const NavigationBarDropDownContainer = styled.div<{ state: string }>`
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;
  ${props => (props.state !== "entered" && 'bottom: -10px')};

  overflow: hidden;

  display: ${props =>
    props.state === "entering" ||
    props.state === "entered" ||
    props.state === "exiting" ||
    props.state === "exited"
      ? "block"
      : "none"};
  opacity: ${props => (props.state === "entered" ? 1 : 1)};

  transition: all 0.5s ease-in-out;

  width: auto;
  height: ${props => (props.state === "entered" ? '170px' : '1px')};

  padding: ${props => (props.state === "entered" ? '30px' : '0px')};

  background-color: ${props => props.theme.colors.green};

  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: ${props => props.theme.colors.white};
  border-bottom-color: ${props => props.theme.colors.white};
  border-top-width: 1px;
  border-bottom-width: 1px;
`;

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
    <>
      <Transition
        in={isActive}
        mountOnEnter
        unmountOnExit
        timeout={{ appear: 0, enter: 10, exit: 500 }}
      >
        {state => (
          <NavigationBarDropDownContainer
            onMouseLeave={onMouseLeave}
            state={state}
          >
            {children}
          </NavigationBarDropDownContainer>
        )}
      </Transition>
    </>
  );
};
