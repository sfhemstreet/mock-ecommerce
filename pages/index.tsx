import styled from "styled-components";
import { GetStaticProps } from "next";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Padded } from "../components/Padded";

import {
  getHomePageContent,
  HomePageContent
} from "../queries/page/getHomePageContent";
import { mediaDevices } from "../components/DisplayAtMedia";
import { Centered } from "../components/Centered";
import { Txt } from "../components/Txt";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { ProductPreviewCardsList } from "../components/ProductPreviewCard/ProductPreviewCardsList";
import { getTop4Products } from "../queries/product/getTop4Products";
import { ProductPreview, Brand } from "../queries/types";
import { getAllBrands } from "../queries/brand/getAllBrands";
import { BrandsBanner } from "../components/BrandsBanner";

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
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center top;
  background-size: fit;

  @media ${mediaDevices.mobileL} {
    background-image: ${props => `url(${props.tabletSrc})`};
    background-attachment: fixed;
    background-position-x: center;
    background-position-y: center top;
  }

  @media ${mediaDevices.tablet} {
    background-image: ${props => `url(${props.laptopSrc})`};
    background-attachment: fixed;
    background-position-x: center;
    background-position-y: center bottom;
  }

  @media ${mediaDevices.laptopL} {
    background-image: ${props => `url(${props.desktopSrc})`};
    background-attachment: fixed;
    background-position-x: center;
    background-position-y: center top;
  }
`;

type HomeProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  homePageContent: HomePageContent;
  topFourProducts: ProductPreview[];
  brands: Brand[];
};

const Home = ({
  navigationBarSideDrawerData,
  homePageContent,
  topFourProducts,
  brands
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
      <Padded padTop={"50px"}>
        <BrandsBanner brands={brands} onSelection={(b) => {}} />
      </Padded>
    </NavigationBarSideDrawerLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const topFourProducts = await getTop4Products();
  const homePageContent = await getHomePageContent();
  const brands = await getAllBrands();

  return {
    props: {
      navigationBarSideDrawerData,
      topFourProducts,
      homePageContent,
      brands
    }
  };
};

export default Home;
