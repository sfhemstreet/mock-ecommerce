import { getProductsBaseQuery } from "./getProducts";
import { ProductPreview, ProductPreviewQuery } from "../types";

export const getTopProductsByCategorySlug = async (slug: string) => {

  // add limit: param to this in future
  const GET_TOP_PRODUCTS_BY_CATEGORY_SLUG = `
    {	
      products(where: { Category: {slug: "${slug}"} }, sort: "Ranking:asc") {
        ${ProductPreviewQuery}
      }
    }
  `;

  const products = await getProductsBaseQuery(GET_TOP_PRODUCTS_BY_CATEGORY_SLUG);

  return products as ProductPreview[]
}