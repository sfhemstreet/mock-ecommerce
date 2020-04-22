import { fetchQuery } from "../../util/fetchQuery";
import { Category } from "../types";

export const getCategoryBySlug = async (slug: string) => {

  const GET_CATEGORY_BY_SLUG = `
    {
      categories(where: {slug: "${slug}"}) {
        id
        slug
        Name
        SubCategories {
          id
          slug
          Name
        }
      }
    }
  `;

  const res = await fetchQuery(GET_CATEGORY_BY_SLUG);
  const { data: { categories } } = await res.json();

  if (!categories) {
    throw new Error("No category data")
  }

  return categories[0] as Category
}