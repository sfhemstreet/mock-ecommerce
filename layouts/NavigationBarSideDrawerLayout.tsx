import React, { FunctionComponent, useState } from "react";
import { BackgroundBlackGradient } from "../components/Background";
import { NavigationBar } from "../containers/NavigationBar";
import { FullPageContainer } from "../components/FullPageContainer";
import { SideDrawer } from "../components/SideDrawer";
import { Transformed } from "../components/Transformed";
import { Filtered } from "../components/Filtered";
import { AppTheme } from "../themes/AppTheme";

type NavigationBarSideDrawerLayoutProps = {
  filterChildrenWhenSideDrawerOpen?: boolean;
};

/**
 * Displays a Navigation Bar and uses a SideDrawer on smaller displays.
 * When SideDrawer is active, children has optional blur and grayscale effect.
 * @param {boolean} filterChildrenWhenSideDrawerOpen Puts blurr and grayscalee effect on children when SideDrawer is open
 */
export const NavigationBarSideDrawerLayout: FunctionComponent<NavigationBarSideDrawerLayoutProps> = ({
  filterChildrenWhenSideDrawerOpen,
  children
}): JSX.Element => {
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <FullPageContainer>
      <BackgroundBlackGradient>
        <SideDrawer
          open={isSideDrawerOpen}
          setOpen={() => setSideDrawerOpen(!isSideDrawerOpen)}
          minWidth={-20}
          maxWidth={300}
          borderWidth={1}
        />
        <Transformed
          isTransformed={isSideDrawerOpen}
          transform={"translateX(300px)"}
          transition={AppTheme.transitions.sideDrawer}
        >
          <NavigationBar
            isSideDrawerOpen={isSideDrawerOpen}
            onClickSideDrawer={() => setSideDrawerOpen(!isSideDrawerOpen)}
          />
          <Filtered
            isActive={isSideDrawerOpen && filterChildrenWhenSideDrawerOpen}
            filter={"blur(1px) grayscale(50%)"}
            transition={AppTheme.transitions.sideDrawer}
          >
            {children}
          </Filtered>
        </Transformed>
      </BackgroundBlackGradient>
    </FullPageContainer>
  );
};
