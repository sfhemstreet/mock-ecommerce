import { fetchQuery } from "../util/fetchQuery";

export type Category = {
  id?: number;
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

  // We want to organize the content into more SubCategories. 
  // Anything with 'Clothing' is put into Clothing and same with 'Equipment' 
  const myCategories = new Array<Category>();

  const clothingCategory = {
    Name: "Clothing",
    SubCategories: new Array<Category>()
  };

  const equipmentCategory = {
    Name: "Equipment",
    SubCategories: new Array<Category>()
  };

  categories.forEach((category: Category) => {
    if (category.Name.includes("Clothing")) {
      clothingCategory.SubCategories.push(category);
    } else if (category.Name.includes("Equipment")) {
      equipmentCategory.SubCategories.push(category);
    } else {
      myCategories.push(category);
    }
  });

  myCategories.push(clothingCategory);
  myCategories.push(equipmentCategory);

  return myCategories;
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

/*
{
  categories {
    Name
    SubCategories {
      Name
      Products {
        id
          Name
          Price
          Brand {
            Name
            Logo {
              url
            }
          }
          Preview {
            hash
            url
          }
      }
  	}  
  }
} 
*/