import { getProductsBaseQuery } from "./getProducts";

const GET_ALL_PRODUCTS_IDS = `
  {
    products {
      id
      slug
    }
  }
`;

export async function getAllProductsIdsSlugs() {
  const productIds: {id: string, slug: string}[] = await getProductsBaseQuery(GET_ALL_PRODUCTS_IDS);

  return productIds;
}