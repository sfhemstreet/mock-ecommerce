import { fetchQuery } from '../../util/fetchQuery';

export const getAllSubCategoryIdsSlugs = async () => {
  const GET_ALL_SUBCATEGORY_SLUGS = `
    {
      subcategories {
        id
        slug
      }
    }
  `;

  const res = await fetchQuery(GET_ALL_SUBCATEGORY_SLUGS);
  const { data: { subcategories } } = await res.json();

  if (!subcategories) {
    throw new Error("No categories slugs...");
  }

  return [...subcategories.map((cat: { id: string, slug: string }) => 
    ({ id: cat.id, slug: cat.slug }))] as { id: string, slug: string }[];
}