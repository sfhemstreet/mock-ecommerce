import { fetchQuery } from "../../util/fetchQuery";
import { Category } from "../types";


export const getCategoryById = async (id: string) => {

  const GET_CATEGORY_BY_ID = `
    {
      category(id: ${id}) {
        id
        Name
        Name
        SubCategories {
          id
          Name
        }
      }
    }
  `;

  const res = await fetchQuery(GET_CATEGORY_BY_ID);
  const { data: { category } } = await res.json();

  if (!category) {
    throw new Error("No category data")
  }

  return category as Category
}