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
import { getNavigationBarSideDrawerData, NavigationBarSideDrawerData } from "../../queries/getNavigationBarSideDrawerData";

// <BrandLogo src={process.env.BACKEND_URL + product.Brand.Logo.url} />

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
      <CategoryLinkBox
        mainCategory={product.Category}
        subCategory={product.Subcategory}
      />
      <Centered>
        <Contained width={"300px"}> 
          <Row justifyBetween alignCenter>
            <Column>
              <Txt small>{product.Brand.Name}</Txt>
              <Txt bold>{product.Name}</Txt>
            </Column>
          </Row>
        </Contained>
      </Centered>
      <Centered padding={'5px'}>
        <ProductImageDisplay photos={product.Pictures} thumbnails={product.Thumbnails}  />
      </Centered>
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
