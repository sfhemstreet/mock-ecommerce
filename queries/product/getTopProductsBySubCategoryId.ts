import { getProductsBaseQuery } from "./getProducts";
import { ProductPreview } from "../types";

export const getTopProductsBySubCategoryId = async (id: string) => {
  const GET_TOP_PRODUCTS_BY_SUB_CATEGORY = `
    {	
      products(where: { Subcategory: {id: ${id}} }, sort: "Ranking:asc", limit: 10) {
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

  const products = await getProductsBaseQuery(GET_TOP_PRODUCTS_BY_SUB_CATEGORY);

  return products as ProductPreview[];
}