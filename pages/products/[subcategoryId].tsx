import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { SubCategory, ProductPreview } from "../../queries/types";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { GetStaticProps, GetStaticPaths } from "next";
import { getSubCategoryById } from "../../queries/categories/getSubCategoryById";
import { getTopProductsBySubCategoryId } from "../../queries/product/getTopProductsBySubCategoryId";
import { getAllSubCategoryIds } from "../../queries/categories/getAllSubCategoryIds";
import { CategoryLinkBox } from "../../components/CategoryLinkBox";
import { useState } from "react";
import { ProductsPageContent } from "../../components/ProductsPageContent/ProductsPageContent";

type SubCategoryPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  subcategory: SubCategory;
  products: ProductPreview[];
};

export default function CategoryPage({
  products,
  subcategory,
  navigationBarSideDrawerData
}: SubCategoryPageProps): JSX.Element {
  return (
    <NavigationBarSideDrawerLayout
      data={navigationBarSideDrawerData}
      filterChildrenWhenSideDrawerOpen
    >
      <CategoryLinkBox
        mainCategory={subcategory.ParentCategory}
        subCategory={{ id: subcategory.id, Name: subcategory.Name }}
      />
      <ProductsPageContent title={subcategory.Name} products={products} />
    </NavigationBarSideDrawerLayout>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.subcategoryId;

  if (typeof id !== "string") {
    console.log("id from params was not a string, which is bad.");
    return { props: {} };
  }

  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const subcategory = await getSubCategoryById(id);
  const products = await getTopProductsBySubCategoryId(id);

  return {
    props: {
      navigationBarSideDrawerData,
      subcategory,
      products
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const subids = await getAllSubCategoryIds();
  const paths = subids.map(id => ({
    params: { subcategoryId: id }
  }));

  return {
    paths,
    fallback: false
  };
};
