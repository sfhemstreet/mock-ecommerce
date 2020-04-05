import styled from "styled-components";
import { GetStaticProps } from "next";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Padded } from "../components/Padded";
import { getTop4Products, ProductPreview } from "../queries/getProducts";
import {
  getHomePageContent,
  HomePageContent
} from "../queries/getHomePageContent";
import { mediaDevices } from "../components/DisplayAtMedia";
import { Centered } from "../components/Centered";
import { Txt } from "../components/Txt";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../queries/getNavigationBarSideDrawerData";
import { ProductPreviewCardsList } from "../components/ProductPreviewCard/ProductPreviewCardsList";

type CoverImgProps = {
  mobileSrc: string;
  tabletSrc: string;
  laptopSrc: string;
  desktopSrc: string;
};

const CoverImg = styled.div<CoverImgProps>`
  width: 100%;
  height: 200px;
  background-image: ${props => `url(${props.mobileSrc})`};
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center top;

  @media ${mediaDevices.mobileL} {
    background-image: ${props => `url(${props.tabletSrc})`};
  }

  @media ${mediaDevices.tablet} {
    background-image: ${props => `url(${props.laptopSrc})`};
  }

  @media ${mediaDevices.laptopL} {
    background-image: ${props => `url(${props.desktopSrc})`};
  }
`;

type HomeProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  homePageContent: HomePageContent;
  topFourProducts: ProductPreview[];
};

const Home = ({
  navigationBarSideDrawerData,
  homePageContent,
  topFourProducts
}: HomeProps): JSX.Element => {
  return (
    <NavigationBarSideDrawerLayout
      filterChildrenWhenSideDrawerOpen
      data={navigationBarSideDrawerData}
    >
      <CoverImg
        mobileSrc={process.env.BACKEND_URL + homePageContent.mobileCover.url}
        tabletSrc={process.env.BACKEND_URL + homePageContent.tabletCover.url}
        laptopSrc={process.env.BACKEND_URL + homePageContent.laptopCover.url}
        desktopSrc={process.env.BACKEND_URL + homePageContent.desktopCover.url}
      />
      <Padded padding={"10px"}>
        <Txt alignCenter underline padding={"5px"}>
          {homePageContent.subtitle}
        </Txt>
      </Padded>
      <Padded padding={"0px 5px 5px 5px"}>
        <Txt alignCenter padding={"0px 0px 8px 0px"}>
          {homePageContent.content}
        </Txt>
        <Centered>
          <ProductPreviewCardsList products={topFourProducts} />
        </Centered>
      </Padded>
    </NavigationBarSideDrawerLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const topFourProducts = await getTop4Products();
  const homePageContent = await getHomePageContent();

  return {
    props: {
      navigationBarSideDrawerData,
      topFourProducts,
      homePageContent
    }
  };
};

export default Home;
