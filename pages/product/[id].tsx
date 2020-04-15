import styled from "styled-components";
import { GetStaticPaths, GetStaticProps } from "next";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { CategoryLinkBox } from "../../components/CategoryLinkBox";
import { Column } from "../../components/Column";
import { Txt } from "../../components/Txt";
import { Padded } from "../../components/Padded";
import { Centered } from "../../components/Centered";
import { ProductImageDisplay } from "../../components/ProductImageDisplay/ProductImageDisplay";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../../queries/navigationBarSideDrawerLayout/getNavigationBarSideDrawerData";
import { mediaDevices, DisplayAtMedia } from "../../components/DisplayAtMedia";
import { ProductPurchaseOptions } from "../../components/ProductPurchaseOptions/ProductPurchaseOptions";
import { getAllProductsIds } from "../../queries/product/getAllProductsIds";
import { ProductInfo, getProductById } from "../../queries/product/getProductById";

const ProductPageContainer = styled.div`
  background: white;
  color: ${props => props.theme.colors.black};
`;

const PictureAndPurchaseOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${mediaDevices.tablet} {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }
`;

const SmallScreenDescriptionContainer = styled.div`
  max-width: 700px;
  display: flex;
  justify-content: center;
`;

const LargeScreenDescriptionContainer = styled.div`
  max-width: 310px;
  display: flex;
  justify-content: center;
`;

const ProductOptionsContainer = styled.div`
  padding: 0px;
`;

type ProductPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  product: ProductInfo;
};

export default function SingleProductPage({
  navigationBarSideDrawerData,
  product
}: ProductPageProps) {

  return (
    <NavigationBarSideDrawerLayout
      data={navigationBarSideDrawerData}
      filterChildrenWhenSideDrawerOpen
    >
      <ProductPageContainer>
        <CategoryLinkBox
          mainCategory={product.Category}
          subCategory={product.Subcategory}
        />
        <PictureAndPurchaseOptionsContainer>
          <Padded padding={"3px"}>
            <ProductImageDisplay
              photos={product.Pictures}
              thumbnails={product.Thumbnails}
            />
          </Padded>
          <Padded padding={"0px"}>
            <ProductOptionsContainer>
              <Column alignCenter>
                <ProductPurchaseOptions product={product} />
                <DisplayAtMedia desktop>
                  <LargeScreenDescriptionContainer>
                    <Txt padding={"20px 0px"}>{product.Description}</Txt>
                  </LargeScreenDescriptionContainer>
                </DisplayAtMedia>
              </Column>
            </ProductOptionsContainer>
          </Padded>
        </PictureAndPurchaseOptionsContainer>
        <DisplayAtMedia mobile tablet laptop>
          <Centered>
            <SmallScreenDescriptionContainer>
              <Txt padding={"20px 20px 40px 20px"}>{product.Description}</Txt>
            </SmallScreenDescriptionContainer>
          </Centered>
        </DisplayAtMedia>
      </ProductPageContainer>
    </NavigationBarSideDrawerLayout>
  );
}


export const getStaticProps: GetStaticProps = async context => {

  const id = context.params?.id;

  if (typeof id !== "string") {
    console.log("id from params was not a string, which is bad.");
    return { props: {} };
  }

  const product = await getProductById(id);
  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();

  return {
    props: {
      navigationBarSideDrawerData,
      product
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllProductsIds();
  const paths = ids.map(id => ({
    params: { id }
  }));

  return {
    paths,
    fallback: false
  };
};



