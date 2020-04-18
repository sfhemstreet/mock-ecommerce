import { fetchQuery } from '../../util/fetchQuery';

export const getAllCategoryIds = async () => {
  const GET_ALL_CATEGORY_IDS = `
    {
      categories {
        id
      }
    }
  `;
   
  const res = await fetchQuery(GET_ALL_CATEGORY_IDS);
  const { data: { categories } } = await res.json();

  if (!categories) {
    throw new Error("No categories ids...");
  }

  return [...categories.map((cat: {id: string}) => cat.id)] as string[];
}