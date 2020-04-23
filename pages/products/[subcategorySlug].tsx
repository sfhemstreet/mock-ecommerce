import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { SubCategory, ProductPreview } from "../../queries/types";
import { getSubCategoryBySlug } from "../../queries/categories/getSubCategoryBySlug";
import { getTopProductsBySubCategorySlug } from "../../queries/product/getTopProductsBySubCategorySlug";
import { getAllSubCategoryIdsSlugs } from "../../queries/categories/getAllSubCategoryIdsSlugs";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { GetStaticProps, GetStaticPaths } from "next";
import { CategoryLinkBox } from "../../components/CategoryLinkBox";
import { ProductsPageContent } from "../../components/ProductsPageContent/ProductsPageContent";
import Head from "next/head";

type SubCategoryPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  subcategory: SubCategory;
  products: ProductPreview[];
};

/**
 * Displays products of given subcategorySlug
 * @param products
 * @param subcategory
 * @param navigationBarSideDrawerData
 */
export default function CategoryPage({
  products,
  subcategory,
  navigationBarSideDrawerData
}: SubCategoryPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{subcategory.Name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavigationBarSideDrawerLayout
        data={navigationBarSideDrawerData}
        filterChildrenWhenSideDrawerOpen
      >
        <CategoryLinkBox
          mainCategory={subcategory.ParentCategory}
          subCategory={{
            id: subcategory.id,
            Name: subcategory.Name,
            slug: subcategory.slug
          }}
        />
        <ProductsPageContent title={subcategory.Name} products={products} />
      </NavigationBarSideDrawerLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.subcategorySlug;

  if (typeof slug !== "string") {
    console.log("slug from params was not a string, which is bad.");
    return { props: {} };
  }

  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const subcategory = await getSubCategoryBySlug(slug);
  const products = await getTopProductsBySubCategorySlug(slug);

  return {
    props: {
      navigationBarSideDrawerData,
      subcategory,
      products
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const subids = await getAllSubCategoryIdsSlugs();
  const paths = subids.map(id => ({
    params: { subcategorySlug: id.slug }
  }));

  return {
    paths,
    fallback: false
  };
};
