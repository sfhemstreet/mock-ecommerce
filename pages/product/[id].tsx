import styled from "styled-components";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getProductById,
  ProductInfo,
  getAllProductsIds
} from "../../queries/getProducts";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { CategoryLinkBox } from "../../components/CategoryLinkBox";
import { Row } from "../../components/Row";
import { BrandLogo } from "../../components/BrandLogo";
import { Column } from "../../components/Column";
import { Txt } from "../../components/Txt";
import { Padded } from "../../components/Padded";
import { Centered } from "../../components/Centered";
import { Contained } from "../../components/Contained";
import { ProductImageDisplay } from "../../components/ProductImageDisplay/ProductImageDisplay";
import {
  getNavigationBarSideDrawerData,
  NavigationBarSideDrawerData
} from "../../queries/getNavigationBarSideDrawerData";
import { mediaDevices, DisplayAtMedia } from "../../components/DisplayAtMedia";
import { ProductPurchaseOptions } from "../../components/ProductPurchaseOptions/ProductPurchaseOptions";

// <BrandLogo src={process.env.BACKEND_URL + product.Brand.Logo.url} />
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

const ProductDescriptionContainer = styled.div`
  max-width: 700px;
  display: flex;
  justify-content: center;
`;

const ProductOptionsContainer = styled.div`
  padding: 20px;
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
          <Padded padding={"3px"}>
            <ProductOptionsContainer>
              <Column>
                <Centered padding={"10px"}>
                  <Row justifyCenter>
                    <Column>
                      <Txt alignCenter>
                        {product.Brand.Name}
                      </Txt>
                      <Txt big bold alignCenter>
                        {product.Name}
                      </Txt>
                    </Column>
                    <Padded padLeft={"20px"}>
                      <BrandLogo
                        src={process.env.BACKEND_URL + product.Brand.Logo.url}
                        alt={`${product.Brand.Name} Logo`}
                      />
                    </Padded>
                  </Row>
                </Centered>
                <ProductPurchaseOptions product={product} />
              </Column>
            </ProductOptionsContainer>
          </Padded>
        </PictureAndPurchaseOptionsContainer>
        <Centered>
          <ProductDescriptionContainer>
            <Txt padding={"20px 55px 40px 50px"}>{product.Description}</Txt>
          </ProductDescriptionContainer>
        </Centered>
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
