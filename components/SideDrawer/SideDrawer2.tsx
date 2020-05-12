import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import { MenuIcon } from "../MenuIcon";
import { getWindowDimensions } from "../../util/getWindowDimensions";
import { Transition } from "react-transition-group";
import { AppTheme } from "../../themes/AppTheme";

type SideDrawerContainerProps = {
  drawerHeight: string;
  drawerWidth: number;
  zIndex: number;
  showBorder: boolean;
};

const SideDrawerContainer = styled.div<SideDrawerContainerProps>`
  width: ${(props) => props.drawerWidth};
  height: ${(props) => props.drawerHeight};

  position: fixed;
  top: 0;
  left: 0;

  overflow-x: hidden;
  z-index: ${(props) => props.zIndex};

  background: ${(props) => props.theme.colors.black};

  border-right: ${(props) =>
    props.showBorder ? `1px solid ${props.theme.colors.white}` : "none"};

  transition: ${(props) => props.theme.transitions.sideDrawer};
`;

// When resizing or on first render we want siebar off screen
const SIDEDRAWER_OFF_SCREEN = 100000;
const INIT_SCREEN_WIDTH = 200000;

export type SideDrawerProps = {
  open?: boolean;
  minWidth?: number;
  maxWidth?: number;
  drawerHeight?: string;
  zIndex?: number;
};

/**
 * SideDrawer that extends from left side of screen, from minWidth (closed) to maxWidth (open).
 */
export const SideDrawer: FunctionComponent<SideDrawerProps> = ({
  open = false,
  minWidth = 0,
  maxWidth = 370,
  drawerHeight = "100vh",
  zIndex = 20,
  children,
}): JSX.Element => {
  // Screen width is used to calculate right position of the SideDrawer
  const [screenWidth, setScreenWidth] = useState(INIT_SCREEN_WIDTH);

  // The current right border position of the SideDrawer
  const [sideDrawerPosition, setSideDrawerPosition] = useState(
    SIDEDRAWER_OFF_SCREEN
  );

  // Used to remove SideDrawer when screen is resized. Fixes resizing bug.
  const [isVisible, setIsVisible] = useState(true);

  const handleScreenResize = (): void => {
    // Remove side drawer so the drawer is percieved to be the same width
    setIsVisible(false);

    // Get width of screen for correct drawer position.
    const { width } = getWindowDimensions();
    setScreenWidth(width);

    // Set the drawer position and display it again.
    const initSideDrawerPosition = open ? width - maxWidth : width - minWidth;
    setSideDrawerPosition(initSideDrawerPosition);
    setIsVisible(true);
  };

  useEffect(() => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, [open]);

  // Check if maxWidth is bigger than the screen width - 10.
  // Adjust maxWidth if invalid.
  try {
    if (process.env.NODE_ENV === "development" && maxWidth > screenWidth - 10) {
      throw new Error("maxWidth is greater than width of display");
    }
  } catch (err) {
    console.log(err);
    maxWidth = screenWidth - 10;
  }

  return (
    <>
      {/*  This will always be true unless the screen is being resized. 
      When the screen is resized do not display the sidedrawer, this fixes weird side effects. */}
      {isVisible && (
        <SideDrawerContainer
          style={{
            right: sideDrawerPosition,
            pointerEvents: open ? "auto" : "none",
          }}
          drawerHeight={drawerHeight}
          drawerWidth={maxWidth}
          zIndex={zIndex}
          showBorder={open}
        >
          {/* Only show children when
          - drawer is open and draggableWidth is false
          - draggableWidth is true but its not really close to closed position
            */}
          {
            <Transition
              in={open}
              timeout={{
                appear: 0,
                enter: 0,
                exit: 500,
              }}
              mountOnEnter
              unmountOnExit
            >
              {children}
            </Transition>
          }
        </SideDrawerContainer>
      )}
    </>
  );
};
