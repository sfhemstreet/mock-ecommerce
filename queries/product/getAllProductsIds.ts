import { getProductsBaseQuery } from "./getProducts";

const GET_ALL_PRODUCTS_IDS = `
  {
    products {
      id
    }
  }
`;

export async function getAllProductsIds() {
  const productIds: {id: string}[] = await getProductsBaseQuery(GET_ALL_PRODUCTS_IDS);
  const ids = productIds.map(product => product.id);
  return ids;
}