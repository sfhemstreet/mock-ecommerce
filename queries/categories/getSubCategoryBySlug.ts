import { fetchQuery } from "../../util/fetchQuery";
import { SubCategory } from "../types";

export const getSubCategoryBySlug = async (slug: string) => {

  const GET_SUB_CATEGORY_BY_SLUG = `
    {
      subcategories(where: {slug: "${slug}"}) {
        id
        slug
        Name
        ParentCategory {
          id
          slug
          Name
        }
      }
    }
  `;

  const subCatRes = await fetchQuery(GET_SUB_CATEGORY_BY_SLUG);
  const { data: { subcategories } } = await subCatRes.json();

  if (!subcategories) {
    throw new Error("No sub category data")
  }

  return subcategories[0] as SubCategory
}