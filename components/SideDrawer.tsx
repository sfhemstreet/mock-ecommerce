import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import { MenuIcon } from "./MenuIcon";

type SideDrawerContainerProps = {
  drawerHeight: string;
  drawerWidth: number;
  zIndex: number;
  animated: boolean;
};

const SideDrawerContainer = styled.div<SideDrawerContainerProps>`
  width: ${props => props.drawerWidth};
  height: ${props => props.drawerHeight};

  position: absolute;
  top: 0;
  left: 0;

  overflow-x: hidden;
  z-index: ${props => props.zIndex};

  background: ${props => props.theme.colors.black};

  transition: ${props => (props.animated ? `all 0.3s ease-out` : "none")};
`;

type SideDrawerBorderProps = {
  borderWidth: number;
  drawerHeight: string;
  zIndex: number;
  animated: boolean;
};

const SideDrawerBorder = styled.div<SideDrawerBorderProps>`
  width: ${props => `${props.borderWidth}px`};
  height: ${props => props.drawerHeight};

  position: absolute;
  top: 0;

  z-index: ${props => props.zIndex};

  background: ${props => props.theme.colors.white};

  transition: ${props => (props.animated ? `all 0.3s ease-out` : "none")};

  cursor: ew-resize;
`;

type OpenCloseButtonContainerProps = {
  zIndex: number;
  animated: boolean;
};

const OpenCloseButtonContainer = styled.div<OpenCloseButtonContainerProps>`
  position: absolute;
  top: 10px;

  z-index: ${props => props.zIndex};

  transition: ${props => (props.animated ? `all 0.3s ease-out` : "none")};
`;

interface WindowDimensions {
  width: number;
  height: number;
}

export function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export type SideDrawerProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  showDrawerButton?: boolean;
  draggableWidth?: boolean;
  permanentlyOpen?: boolean;
  minWidth?: number;
  maxWidth?: number;
  drawerHeight?: string;
  zIndex?: number;
  background?: string;
  borderColor?: string;
  borderWidth?: number;
  drawerButtonWidth?: number;
  drawerButtonColor?: string;
  drawerButtonHoverColor?: string;
};

/**
 * Extendable SideDrawer
 * @param {(boolean) => void} setOpen Function to call that will either open or close the drawer
 * @param {boolean} open If drawer will start at fully open or closed. Default value: false
 * @param {boolean} showDrawerButton Choose to display open and close button.
 * When true, minWidth will be adjusted to always show the button,
 * and draggableWidth will be set to false. Default value: false
 * @param {boolean} draggableWidth When true, SideDrawer is draggable between minWidth and maxWidth.
 * When false the SideDrawer can either be fully open at maxWidth or closed at minWidth. Default value: false
 * @param {boolean} permanentlyOpen sets SideDrawer to always be open. Removes drawer button. Default value: false
 * @param {number} minWidth Minimum width SideDrawer takes up on screen, in px. Default value: 0
 * @param {number} maxWidth Maximum width SideDrawer takes up on screen, in px. Default value: 370
 * @param {string} drawerHeight Height of SideDrawer. Default value: "100vh"
 * @param {number} zIndex zIndex for SideDrawer. Default value: 5
 * @param {string} background Background of SideDrawer. Default value: "#111"
 * @param {number} borderWidth Width of SideDrawer border in px. Default value: 10
 * @param {number} drawerButtonWidth Width of DrawerButton, in px. Default value: 33
 */
export const SideDrawer: FunctionComponent<SideDrawerProps> = ({
  open = false,
  setOpen = (open: boolean) => {},
  showDrawerButton = false,
  draggableWidth = false,
  permanentlyOpen = false,
  minWidth = 0,
  maxWidth = 370,
  drawerHeight = "100vh",
  zIndex = 5,
  borderWidth = 10,
  drawerButtonWidth = 33,
  children
}): JSX.Element => {
  const [screenWidth, setScreenWidth] = useState(200000);
  const [sideDrawerPosition, setSideDrawerPosition] = useState(100000);

  const handleScreenResize = (): void => {
    // Get width of screen for correct drawer position calculations.
    const { width } = getWindowDimensions();
    setScreenWidth(width);

    // Set the initial drawer position.
    const initSideDrawerPosition = open ? width - maxWidth : width - minWidth;
    setSideDrawerPosition(initSideDrawerPosition);
  };

  useEffect(() => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, [open]);

  // Check for valid borderWidth
  try {
    if (borderWidth < 1) {
      throw new Error("borderWidth must be greater than or equal to 1");
    }
  } catch (err) {
    console.log(err);
    borderWidth = 1;
  }

  // Check if maxWidth is bigger than the screen width.
  // Adjust maxWidth if invalid.
  try {
    if (maxWidth > screenWidth) {
      throw new Error("maxWidth is greater than width of display");
    }
  } catch (err) {
    console.log(err);
    maxWidth = screenWidth - borderWidth;
  }

  // Check minWidth and adjust if showDrawerButton is true
  // so that the button stays visible.
  if (showDrawerButton) {
    // This width makes the button visible and adds an even padding.
    const mininumVisibleWidth = screenWidth - borderWidth - 33 - 10;
    if (screenWidth - minWidth > mininumVisibleWidth) {
      minWidth = borderWidth + drawerButtonWidth + 10;
    }
  }

  // Check for draggableWidth
  if (draggableWidth) {
    borderWidth = borderWidth >= 5 ? borderWidth : 5;
    minWidth = minWidth > 0 ? minWidth : 1;
  }

  // Check for permanentlyOpen
  if (permanentlyOpen) {
    showDrawerButton = false;
    draggableWidth = false;
    open = true;
  }

  // Mouse Events
  const handleMouseStart = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!permanentlyOpen) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseStop);
    }
  };

  const handleMouseMove = (evt: MouseEvent): void => {
    const newPosition = screenWidth - evt.clientX;

    if (draggableWidth) {
      setDragPosition(newPosition);
    } else {
      setFullPosition(newPosition);
    }
  };

  const handleMouseStop = (evt: MouseEvent): void => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseStop);
  };

  // Touch Events
  const handleTouchStart = (evt: React.TouchEvent<HTMLDivElement>): void => {
    if (!permanentlyOpen) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
  };

  const handleTouchMove = (evt: TouchEvent): void => {
    const newPosition = screenWidth - evt.changedTouches[0].clientX;

    if (draggableWidth) {
      setDragPosition(newPosition);
    } else {
      setFullPosition(newPosition);
    }
  };

  const handleTouchEnd = (evt: TouchEvent): void => {
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  // Sets sideDrawerPosition to where user dragged
  const setDragPosition = (newPosition: number): void => {
    newPosition = newPosition + borderWidth / 2;

    if (
      newPosition <= screenWidth - minWidth &&
      newPosition >= screenWidth - maxWidth
    ) {
      setSideDrawerPosition(newPosition);

      if (
        newPosition >= screenWidth - maxWidth &&
        newPosition <= screenWidth - maxWidth + 25
      ) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  };

  // Sets sideDrawerPosition to full open or close based on direction of drag
  const setFullPosition = (newPosition: number): void => {
    // Slide Closed
    if (sideDrawerPosition < newPosition - 10) {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseStop);

      const drawerPosition = screenWidth - minWidth;
      setSideDrawerPosition(drawerPosition);
      setOpen(false);
    }
    // Slide Open
    else if (sideDrawerPosition > newPosition + 10) {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseStop);

      const drawerPosition = screenWidth - maxWidth;
      setSideDrawerPosition(drawerPosition);
      setOpen(true);
    }
  };

  const handleOpenCloseButtonClick = (): void => {
    const newPosition = open ? screenWidth - minWidth : screenWidth - maxWidth;
    setSideDrawerPosition(newPosition);
    setOpen(!open);
  };

  return (
    <>
      <SideDrawerContainer
        style={{ right: sideDrawerPosition }}
        drawerHeight={drawerHeight}
        drawerWidth={maxWidth}
        zIndex={zIndex}
        animated={!draggableWidth}
      >
        {/* Only show children when
          - drawer is open and draggableWidth is false
          - draggableWidth is true but its not really close to closed position
        */}
        {showDrawerButton && !draggableWidth
          ? open && children
          : sideDrawerPosition + 10 <= screenWidth - minWidth && children}
      </SideDrawerContainer>
      <SideDrawerBorder
        style={{ right: sideDrawerPosition - borderWidth / 2 }}
        borderWidth={borderWidth}
        drawerHeight={drawerHeight}
        zIndex={zIndex}
        animated={!draggableWidth}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseStart}
      />
      {showDrawerButton && (
        <OpenCloseButtonContainer
          style={{ right: sideDrawerPosition + borderWidth / 2 + 5 }}
          zIndex={zIndex + 1}
          animated={!draggableWidth}
        >
          <MenuIcon
            isOpen={open}
            onClick={handleOpenCloseButtonClick}
          />
        </OpenCloseButtonContainer>
      )}
    </>
  );
};