import { getProductsBaseQuery } from "./getProducts";


export type ProductPreview = {
  id: number;
  Name: string;
  Price: string;
  Brand: {
    Name: string;
    Logo: {
      url: string;
    }
  }
  Preview: {
    name: string;
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
        Name
        Logo {
          url
        }
      }
      Preview {
        name
        url
      }
    }
  }
`;

export async function getTop4Products() {
  const products: ProductPreview[] = await getProductsBaseQuery(GET_TOP_4_PRODUCTS);
  return products;
}