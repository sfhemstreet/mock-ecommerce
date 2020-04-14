import { getProductsBaseQuery } from "./getProducts";

export type ProductPreview = {
  id: string;
  Name: string;
  Price: number;
  Brand: {
    id: string;
    Name: string;
    Logo: {
      url: string;
    }
  }
  Preview: {
    url: string;
  }
}

const GET_TOP_4_PRODUCTS = `
  {
    products(sort: "Ranking:desc", where: {IsAvailable: true, Ranking_gte: 4}, limit: 4) {
      id
      Name
      Price
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