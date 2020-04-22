import { fetchQuery } from '../../util/fetchQuery';

export const getAllCategoryIdsSlugs = async () => {
  const GET_ALL_CATEGORY_SLUGS = `
    {
      categories {
        id
        slug
      }
    }
  `;

  const res = await fetchQuery(GET_ALL_CATEGORY_SLUGS);
  const { data: { categories } } = await res.json();

  if (!categories) {
    throw new Error("No categories slugs...");
  }

  return [...categories.map((cat: { id: string, slug: string }) => 
    ({ id: cat.id, slug: cat.slug }))] as { id: string, slug: string }[];
}