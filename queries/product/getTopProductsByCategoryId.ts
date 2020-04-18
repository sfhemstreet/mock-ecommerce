import { getProductsBaseQuery } from "./getProducts";
import { ProductPreview } from "../types";

export const getTopProductsByCategoryId = async (id: string) => {

  // add limit: param to this in future
  const GET_TOP_PRODUCTS_BY_CATEGORY_ID = `
    {	
      products(where: { Category: {id: ${id}} }, sort: "Ranking:asc") {
        id
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

  const products = await getProductsBaseQuery(GET_TOP_PRODUCTS_BY_CATEGORY_ID);

  return products as ProductPreview[]
}