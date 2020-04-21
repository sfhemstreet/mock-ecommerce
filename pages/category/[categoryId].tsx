import styled from "styled-components";
import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { GetStaticProps, GetStaticPaths } from "next";
import { getCategoryById } from "../../queries/categories/getCategoryById";
import { getTopProductsByCategoryId } from "../../queries/product/getTopProductsByCategoryId";
import { Category, ProductPreview } from "../../queries/types";
import { getAllCategoryIds } from "../../queries/categories/getAllCategoryIds";
import { ProductsPageContent } from "../../components/ProductsPageContent/ProductsPageContent";
import { BackgroundWhite, BackgroundBlack } from "../../components/Background";

type CategoryPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  category: Category;
  products: ProductPreview[];
};

export default function CategoryPage({
  products,
  category,
  navigationBarSideDrawerData
}: CategoryPageProps): JSX.Element {
  return (
    <NavigationBarSideDrawerLayout
      data={navigationBarSideDrawerData}
      filterChildrenWhenSideDrawerOpen
    >
      
      <ProductsPageContent
        title={category.Name}
        subcategories={category.SubCategories}
        products={products}
      />  
     
      
    </NavigationBarSideDrawerLayout>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.categoryId;

  if (typeof id !== "string") {
    console.log("id from params was not a string, which is bad.");
    return { props: {} };
  }

  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const category = await getCategoryById(id);
  const products = await getTopProductsByCategoryId(id);

  return {
    props: {
      navigationBarSideDrawerData,
      category,
      products
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllCategoryIds();
  const paths = ids.map(id => ({
    params: { categoryId: id }
  }));

  return {
    paths,
    fallback: false
  };
};
