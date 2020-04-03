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
import { DisplayAtMedia } from "../components/DisplayAtMedia";
import { Positioned } from "../components/Positioned";
import { Centered } from "../components/Centered";
import { Txt } from "../components/Txt";
import { ProductPreviewCard } from "../components/ProductPreviewCard/ProductPreviewCard";

const CoverImg = styled.div<{ src: string }>`
  width: 100%;
  height: 200px;
  background-image: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-position-x: center;
`;

type HomeProps = {
  homePageContent: HomePageContent;
  navCategories: Category[];
  topFiveProducts: ProductPreview[];
};

const Home = ({
  homePageContent,
  navCategories,
  topFiveProducts
}: HomeProps): JSX.Element => {
  return (
    <NavigationBarSideDrawerLayout
      filterChildrenWhenSideDrawerOpen
      navigationContent={navCategories}
    >
      <DisplayAtMedia mobile>
        <CoverImg
          src={process.env.BACKEND_URL + homePageContent.mobileCover.url}
        />
      </DisplayAtMedia>
      <DisplayAtMedia tablet>
        <CoverImg
          src={process.env.BACKEND_URL + homePageContent.tabletCover.url}
        />
      </DisplayAtMedia>
      <DisplayAtMedia laptop>
        <CoverImg
          src={process.env.BACKEND_URL + homePageContent.laptopCover.url}
        />
      </DisplayAtMedia>
      <DisplayAtMedia desktop>
        <CoverImg
          src={process.env.BACKEND_URL + homePageContent.desktopCover.url}
        />
      </DisplayAtMedia>
      <Padded padding={"10px"}>
        <Txt big bold alignCenter>
          {homePageContent.title}
        </Txt>
        <Txt alignCenter padding={"5px"}>
          {homePageContent.subtitle}
        </Txt>
      </Padded>
      <Padded padding={"10px"}>
        <ProductPreviewCard productInfo={topFiveProducts[0]} />  
      </Padded>
    </NavigationBarSideDrawerLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const navCategories = await getNavigationCategories();
  const topFiveProducts = await getTop5Products();
  const homePageContent = await getHomePageContent();

  return {
    props: {
      homePageContent,
      navCategories,
      topFiveProducts
    }
  };
};

export default Home;
