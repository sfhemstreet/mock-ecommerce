import { getProductsBaseQuery } from "./getProducts";
import { ProductPreview } from "../types";

export const getTopProductsBySubCategorySlug = async (slug: string) => {
  const GET_TOP_PRODUCTS_BY_SUB_CATEGORY_SLUG = `
    {	
      products(where: { Subcategory: {slug: "${slug}"} }, sort: "Ranking:asc", limit: 10) {
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

  const products = await getProductsBaseQuery(GET_TOP_PRODUCTS_BY_SUB_CATEGORY_SLUG);

  return products as ProductPreview[];
}