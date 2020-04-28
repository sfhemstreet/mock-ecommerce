import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { GetStaticProps, GetStaticPaths } from "next";
import { Category, ProductPreview } from "../../queries/types";
import { getAllCategoryIdsSlugs } from "../../queries/categories/getAllCategoryIdsSlugs";
import { ProductsPageContent } from "../../components/ProductsPageContent/ProductsPageContent";
import { getCategoryBySlug } from "../../queries/categories/getCategoryBySlug";
import { getTopProductsByCategorySlug } from "../../queries/product/getTopProductsByCategorySlug";
import Head from "next/head";

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
    <>
      <Head>
        <title>{category.Name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="Description"
          content={`${category.Name}, ${category.SubCategories?.map(
            cat => `${cat.Name}`
          ).join(" ")} products for sale. ${products
            .map(
              prod =>
                `${prod.Name} made by ${prod.Brand.Name}, for ${prod.Price} US dollars, available in ${prod.AvailableSizes} sizes and ${prod.AvailableColors} colors.`
            )
            .join(" ")}`}
        ></meta>
      </Head>
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.categorySlug;

  if (typeof slug !== "string") {
    console.log("slug from params was not a string, which is bad.");
    return { props: {} };
  }

  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const category = await getCategoryBySlug(slug);
  const products = await getTopProductsByCategorySlug(slug);

  return {
    props: {
      navigationBarSideDrawerData,
      category,
      products
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllCategoryIdsSlugs();
  const paths = ids.map(id => ({
    params: { categorySlug: id.slug }
  }));

  return {
    paths,
    fallback: false
  };
};
