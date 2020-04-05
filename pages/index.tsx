import styled from "styled-components";
import { GetStaticProps } from "next";
import { NavigationBarSideDrawerLayout } from "../layouts/NavigationBarSideDrawerLayout";
import { Column } from "../components/Column";
import { Padded } from "../components/Padded";
import { Category, getNavigationCategories } from "../queries/getCategories";
import { getTop5Products, ProductPreview } from "../queries/getProducts";
import {
  getHomePageContent,
  HomePageContent
} from "../queries/getHomePageContent";
import { Contained } from "../components/Contained";
import { mediaDevices } from "../components/DisplayAtMedia";
import { Positioned } from "../components/Positioned";
import { Centered } from "../components/Centered";
import { Txt } from "../components/Txt";
import { ProductPreviewCard } from "../components/ProductPreviewCard/ProductPreviewCard";
import { FlexBox } from "../components/FlexBox";
import { getSiteLogo, SiteLogo } from "../queries/getSiteLogo";
import { getSearchBoxData, SearchBoxData } from "../queries/getSearchBoxData";
import { getNavigationBarSideDrawerData, NavigationBarSideDrawerData } from "../queries/getNavigationBarSideDrawerData";

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
  topFiveProducts: ProductPreview[];
};

const Home = ({
  navigationBarSideDrawerData,
  homePageContent,
  topFiveProducts
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
        <FlexBox justifyCenter>
          {topFiveProducts.map(productInfo => (
            <Padded padding={"3px"} key={productInfo.id}>
              <ProductPreviewCard productInfo={productInfo} />
            </Padded>
          ))}
        </FlexBox>
      </Padded>
    </NavigationBarSideDrawerLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const topFiveProducts = await getTop5Products();
  const homePageContent = await getHomePageContent();

  return {
    props: {
      navigationBarSideDrawerData,
      topFiveProducts,
      homePageContent,
    }
  };
};

export default Home;
