import { Transition } from "react-transition-group";
import styled from "styled-components";
import { NavigationBarDropDownItem } from "./NavigationBarDropDownItem";
import { Category } from "../../queries/types";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useRef, useEffect } from "react";

const NavigationBarDropDownContainer = styled.div<{ state: string }>`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  ${props => props.state !== "entered" && "bottom: -10px"};

  overflow: hidden;

  display: ${props => (props.state === "unmount" ? "none" : "block")};
  opacity: ${props => (props.state === "entered" ? 1 : 1)};

  transition: all 0.5s ease-in-out;

  width: auto;
  height: ${props => (props.state === "entered" ? "160px" : "1px")};

  padding: ${props => (props.state === "entered" ? "20px" : "0px")};

  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};

  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.white};
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
  const ref = useRef<HTMLDivElement>(null);

  // Close DropDown if user clicks or hits enter key outside of dropdown.
  useEffect(() => {
    function handleOutsideClick(evt: globalThis.MouseEvent) {
      if (ref.current && evt.composedPath().includes(ref.current)) {
        return;
      }
      if (isActive) onMouseLeave();
    }

    function handleOutsideEnterKeyPress(evt: KeyboardEvent) {
      if (
        evt.key === "Enter" &&
        ref.current &&
        evt.composedPath().includes(ref.current)
      ) {
        return;
      }
      if (isActive) onMouseLeave();
    }

    document.addEventListener("click", handleOutsideClick, false);
    document.addEventListener("keypress", handleOutsideEnterKeyPress, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
      document.removeEventListener("keypress", handleOutsideEnterKeyPress,false);
    };
  }, [isActive]);

  return (
    <Transition
      in={isActive}
      mountOnEnter
      unmountOnExit
      timeout={{ appear: 0, enter: 10, exit: 500 }}
    >
      {state => (
        <NavigationBarDropDownContainer
          ref={ref}
          onMouseLeave={onMouseLeave}
          state={state}
        >
          <NavigationBarDropDownItem
            navigationContentItem={navigationContentItem}
          />
        </NavigationBarDropDownContainer>
      )}
    </Transition>
  );
};
