import { Transition } from "react-transition-group";
import styled from "styled-components";
import { NavigationBarDropDownItem } from "./NavigationBarDropDownItem";
import { Category } from "../../queries/types";


const NavigationBarDropDownContainer = styled.div<{ state: string }>`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  ${props => props.state !== "entered" && "bottom: -10px"};

  overflow: hidden;

  display: ${props => props.state === "unmount" ? "none" : "block"};
  opacity: ${props => (props.state === "entered" ? 1 : 1)};

  transition: all 0.5s ease-in-out;

  width: auto;
  height: ${props => (props.state === "entered" ? "70px" : "1px")};

  padding: ${props => (props.state === "entered" ? "20px" : "0px")};

  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};

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
  navigationContentItem?: Category;
};

/**
 * Drop down for the navigation bar
 * @param {boolean} isActive
 * @param {() => void} onMouseLeave
 * @param {NavigationContentItem} navigationContentItem
 */
export const NavigationBarDropDown = ({
  isActive,
  onMouseLeave,
  navigationContentItem
}: NavigationBarDropDownProps): JSX.Element => {
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
            <NavigationBarDropDownItem navigationContentItem={navigationContentItem} />
          </NavigationBarDropDownContainer>
        )}
      </Transition>
    </>
  );
};
