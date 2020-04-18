import { fetchQuery } from '../../util/fetchQuery';

export const getAllSubCategoryIds = async () => {
  const GET_ALL_SUBCATEGORY_IDS = `
    {
      subcategories {
        id
      }
    }
  `;
   
  const res = await fetchQuery(GET_ALL_SUBCATEGORY_IDS);
  const { data: { subcategories } } = await res.json();

  if (!subcategories) {
    throw new Error("No categories ids...");
  }

  return [...subcategories.map((cat: {id: string}) => cat.id)] as string[];
}