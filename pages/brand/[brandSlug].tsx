import {
  NavigationBarSideDrawerData,
  getNavigationBarSideDrawerData
} from "../../queries/navigationBarSideDrawerLayoutQueries/getNavigationBarSideDrawerData";
import { NavigationBarSideDrawerLayout } from "../../layouts/NavigationBarSideDrawerLayout";
import { GetStaticProps, GetStaticPaths } from "next";
import { Category, ProductPreview, BrandWithProducts } from "../../queries/types";
import { getAllCategoryIdsSlugs } from "../../queries/categories/getAllCategoryIdsSlugs";
import { ProductsPageContent } from "../../components/ProductsPageContent/ProductsPageContent";
import { getCategoryBySlug } from "../../queries/categories/getCategoryBySlug";
import { getTopProductsByCategorySlug } from "../../queries/product/getTopProductsByCategorySlug";
import Head from "next/head";
import { getAllBrands } from "../../queries/brand/getAllBrands";
import { getBrandWithProductsBySlug } from "../../queries/brand/getBrandWithProductsBySlug";

type CategoryPageProps = {
  navigationBarSideDrawerData: NavigationBarSideDrawerData;
  brand: BrandWithProducts;
};

export default function BrandPage({
  brand,
  navigationBarSideDrawerData
}: CategoryPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{brand.Name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="Description"
          content={`${brand.Name}`}
        ></meta>
      </Head>
      <NavigationBarSideDrawerLayout
        data={navigationBarSideDrawerData}
        filterChildrenWhenSideDrawerOpen
      >
        <ProductsPageContent
          title={brand.Name}
          products={brand.Products}
          displayCategoryFilter
          displaySubcategoryFilter
        />
      </NavigationBarSideDrawerLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.brandSlug;

  if (typeof slug !== "string") {
    //console.log("slug from params was not a string, which is bad.");
    return { props: {} };
  }

  const navigationBarSideDrawerData = await getNavigationBarSideDrawerData();
  const brand = await getBrandWithProductsBySlug(slug);

  return {
    props: {
      navigationBarSideDrawerData,
      brand,
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const brands = await getAllBrands();
  const paths = brands.map(brand => ({
    params: { brandSlug: brand.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

