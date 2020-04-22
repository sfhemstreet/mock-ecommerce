import { fetchQuery } from "../../util/fetchQuery";
import { SubCategory } from "../types";



export const getSubCategoryById = async (id: string) => {

  const GET_SUB_CATEGORY_BY_ID = `
    {
      subcategory(id: ${id}) {
        id
        slug
        Name
        ParentCategory {
          id
          Name
        }
      }
    }
  `;

  const subCatRes = await fetchQuery(GET_SUB_CATEGORY_BY_ID);
  const { data: { subcategory } } = await subCatRes.json();

  if (!subcategory) {
    throw new Error("No sub category data")
  }

  return subcategory as SubCategory
}