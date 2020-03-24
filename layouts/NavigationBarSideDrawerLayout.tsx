import React, { FunctionComponent, useState } from "react";
import { BackgroundBlackGradient } from "../components/Background";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { FullPageContainer } from "../components/FullPageContainer";
import { SideDrawer } from "../components/SideDrawer/SideDrawer";
import { Transformed } from "../components/Transformed";
import { Filtered } from "../components/Filtered";
import { AppTheme } from "../themes/AppTheme";
import { NavigationContent } from '../content/navigation/navigationContentTypes';
import { SideDrawerMenu } from "../components/SideDrawer/SideDrawerMenu";

type NavigationBarSideDrawerLayoutProps = {
  navigationContent: NavigationContent,
  filterChildrenWhenSideDrawerOpen?: boolean;
  sideDrawerOpenWidth?: number;
  sideDrawerClosedWidth?: number;
  sideDrawerBorderWidth?: number;
};

/**
 * Displays a Navigation Bar and uses a SideDrawer on smaller displays.
 * When SideDrawer is active, children has optional blur and grayscale effect.
 * @param {NavigationContent} navigationContent 
 * @param {boolean} filterChildrenWhenSideDrawerOpen Puts blurr and grayscalee effect on children when SideDrawer is open.
 * @param {number} sideDrawerOpenWidth Width in px that sideDrawer will open to.
 * @param {number} sideDrawerClosedWidth Width in px that sideDrawer will close to.
 * @param {number} sideDrawerBorderWidth width in px of border, can be used open and close the sidedrawer thru dragging.
 */
export const NavigationBarSideDrawerLayout: FunctionComponent<NavigationBarSideDrawerLayoutProps> = ({
  navigationContent,
  filterChildrenWhenSideDrawerOpen,
  sideDrawerOpenWidth = 300,
  sideDrawerClosedWidth = -20,
  sideDrawerBorderWidth = 1,
  children
}): JSX.Element => {
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <FullPageContainer>
      <BackgroundBlackGradient>
        <SideDrawer
          open={isSideDrawerOpen}
          setOpen={() => setSideDrawerOpen(!isSideDrawerOpen)}
          minWidth={sideDrawerClosedWidth}
          maxWidth={sideDrawerOpenWidth}
          borderWidth={sideDrawerBorderWidth}
        >
          <SideDrawerMenu 
            sideDrawerWidth={sideDrawerOpenWidth}
            navigationContent={navigationContent}
          />
        </SideDrawer>
        <Transformed
          isTransformed={isSideDrawerOpen}
          transform={`translateX(${sideDrawerOpenWidth}px)`}
          transition={AppTheme.transitions.sideDrawer}
        >
          <NavigationBar
            isSideDrawerOpen={isSideDrawerOpen}
            onClickSideDrawer={() => setSideDrawerOpen(!isSideDrawerOpen)}
            navigationContent={navigationContent}
          />
          <Filtered
            isActive={isSideDrawerOpen && filterChildrenWhenSideDrawerOpen}
            filter={"blur(1px) grayscale(100%)"}
            transition={AppTheme.transitions.sideDrawer}
          >
            {children}
          </Filtered>
        </Transformed>
      </BackgroundBlackGradient>
    </FullPageContainer>
  );
};
