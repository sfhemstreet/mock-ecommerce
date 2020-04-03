import { fetchQuery } from "../util/fetchQuery";

export type ProductPreview = {
  id: number;
  Name: string;
  Price: string;
  Brand: {
    Name: string;
    Logo: {
      url: string;
    }
  }
  Preview: {
    name: string;
    url: string;
  }
}

async function getProductBaseQuery(query: string) {
  const res = await fetchQuery(query);

  const { data: { products } } = await res.json();

  //console.log('Product Query returned', products);

  if (!products) {
    throw new Error('Error getting top 5 products');
  }

  return products;
}

const GET_TOP_5_PRODUCTS = `
  {
    products(sort: "Ranking:desc", where: {IsAvailable: true, Ranking_gte: 4}, limit: 5) {
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
        name
        url
      }
    }
  }
`;

export async function getTop5Products() {
  const products: ProductPreview[] = await getProductBaseQuery(GET_TOP_5_PRODUCTS);
  return products;
}

const GET_ALL_PRODUCTS = `
  {
    products {
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
`;

export async function getAllProducts() {
  const products: ProductPreview[] = await getProductBaseQuery(GET_ALL_PRODUCTS);
  return products;
}

export async function getProductsOfCategory(category: string) {
  const query = `
    {
      products(where: { Category: { Name_contains: ${category}}}) {
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
  `;

  const products: ProductPreview[] = await getProductBaseQuery(query);
  return products;
}

export async function getProductsOfSubCategory(subcategory: string) {
  const query = `
    {
      products(where: { SubCategory: { Name_contains: ${subcategory}}}) {
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
  `;

  const products: ProductPreview[] = await getProductBaseQuery(query);
  return products;
}