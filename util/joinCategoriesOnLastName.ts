import { Category } from "../queries/types";

/**
 * Creates Parent Categories for categories with same "Last Name". 
 * 
 * ie "Clothing" is last name of "Men's Clothing"
 * 
 * All children are put into SubCategories field of parent.
 * Created Parent categories have id, slug and Name of their childrens "Last Name".
 * 
 * @param categories 
 */
export const joinCategoriesOnLastNames = (categories: Category[]) => {
  const lastWords: { [key: string]: Category[] } = {};

  for (const cat of categories) {
    const last = cat.Name.substring(cat.Name.lastIndexOf(" ")).trim();
    lastWords[last] = lastWords[last]
      ? [...lastWords[last], cat]
      : (lastWords[last] = [cat]);
  }

  return Object.keys(lastWords).map(
    (key) =>
      ({
        id: key,
        slug: key,
        Name: key,
        SubCategories: lastWords[key].map((cat) => cat),
      } as Category)
  );
};