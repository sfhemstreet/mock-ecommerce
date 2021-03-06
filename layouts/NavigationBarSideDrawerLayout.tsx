import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { BackgroundBlackGradient } from "../components/Background";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { FullPageContainer } from "../components/FullPageContainer";
import { SideDrawer } from "../components/SideDrawer/SideDrawer";
import { Transformed } from "../components/Transformed";
import { Filtered } from "../components/Filtered";
import { AppTheme } from "../themes/AppTheme";
import { SideDrawerMenu } from "../components/SideDrawer/SideDrawerMenu";
import { NavigationBarSideDrawerData } from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { Footer } from "../components/Footer";

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
`;

type NavigationBarSideDrawerLayoutProps = {
  data: NavigationBarSideDrawerData;
  filterChildrenWhenSideDrawerOpen?: boolean;
  sideDrawerOpenWidth?: number;
};

/**
 * Displays a Navigation Bar and uses a SideDrawer on smaller displays.
 * When SideDrawer is active, children has optional blur and grayscale effect.
 * @param {NavigationBarSideDrawerData} navigationBarSideDrawerData
 * @param {boolean} filterChildrenWhenSideDrawerOpen Puts blurr and grayscalee effect on children when SideDrawer is open.
 * @param {number} sideDrawerOpenWidth Width in px that sideDrawer will open to.
 * @param {number} sideDrawerClosedWidth Width in px that sideDrawer will close to.
 * @param {number} sideDrawerBorderWidth width in px of border, can be used open and close the sidedrawer thru dragging.
 */
export const NavigationBarSideDrawerLayout: FunctionComponent<NavigationBarSideDrawerLayoutProps> = ({
  data,
  filterChildrenWhenSideDrawerOpen,
  sideDrawerOpenWidth = 300,
  children,
}): JSX.Element => {
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <FullPageContainer >
      <BackgroundBlackGradient>
        <SideDrawer
          open={isSideDrawerOpen}
          width={sideDrawerOpenWidth}
        >
          <SideDrawerMenu
            siteLogo={data.siteLogo}
            sideDrawerWidth={sideDrawerOpenWidth}
            navigationContent={data.navCategories}
            close={() => setSideDrawerOpen(false)}
          />
        </SideDrawer>
        <BodyContainer
          onClick={() => {
            if (isSideDrawerOpen) setSideDrawerOpen(false);
          }}
        >
          <Transformed
            isTransformed={isSideDrawerOpen}
            transform={`translateX(${sideDrawerOpenWidth}px)`}
            transition={AppTheme.transitions.sideDrawer}
          >
            <NavigationBar
              isSideDrawerOpen={isSideDrawerOpen}
              onClickSideDrawer={() => setSideDrawerOpen(!isSideDrawerOpen)}
              navigationContent={data.navCategories}
              siteLogo={data.siteLogo}
            />
            <Filtered
              isActive={isSideDrawerOpen && filterChildrenWhenSideDrawerOpen}
              filter={"grayscale(100%)"}
              transition={AppTheme.transitions.sideDrawer}
            >
              {children}
            </Filtered>
            <Footer />
          </Transformed>
        </BodyContainer>
      </BackgroundBlackGradient>
    </FullPageContainer>
  );
};
