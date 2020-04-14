import { fetchQuery } from "../../util/fetchQuery";

export type Category = {
  id?: string;
  Name: string;
  SubCategories?: Category[];
};

const GET_CATEGORIES = `
  {
    categories {
      id
      Name
      SubCategories {
        id
        Name
      }
    }
  }
`;

export async function getNavigationCategories() {
  const res = await fetchQuery(GET_CATEGORIES);

  const {
    data: { categories }
  } = await res.json();

  if (!categories) {
    throw new Error("Categories not fetched.");
  }

  const cats: Category[] = categories;

  // sort by first letter of last word
  cats.sort((a, b) => {
    const one = (a.Name.lastIndexOf(" ") >= 0 && a.Name.lastIndexOf(" ") + 1 < a.Name.length) 
      ? a.Name.charCodeAt(a.Name.lastIndexOf(" ") + 1) 
      : a.Name.charCodeAt(0);

    const two = (b.Name.lastIndexOf(" ") >= 0 && b.Name.lastIndexOf(" ") + 1 < b.Name.length) 
      ? b.Name.charCodeAt(b.Name.lastIndexOf(" ") + 1) 
      : b.Name.charCodeAt(0);

    //console.log(a,b)
    //console.log(one, two);

    return one - two;
  });

  return cats;
}


export async function getCategories() {
  const res = await fetchQuery(GET_CATEGORIES);

  const {
    data: { categories }
  } = await res.json();

  if (!categories) {
    throw new Error("Categories not fetched.");
  }

  return categories;
}

export type CategoryWithProducts = {
  id: number
}

