import { getProductsBaseQuery } from "./getProducts";
import { ProductPreview } from "../types";

const GET_TOP_4_PRODUCTS = `
  {
    products(sort: "Ranking:desc", where: {IsAvailable: true, Ranking_gte: 4}, limit: 4) {
      id
      slug
      Name
      Price
      Discount
      AvailableColors
      AvailableSizes
      Ranking
      Brand {
        id
        Name
        Logo {
          url
        }
      }
      Preview {
        url
      }
    }
  }
`;

export async function getTop4Products() {
  const products: ProductPreview[] = await getProductsBaseQuery(GET_TOP_4_PRODUCTS);
  return products;
}