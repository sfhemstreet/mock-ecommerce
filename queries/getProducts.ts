import { fetchQuery } from "../util/fetchQuery";
import { sortProductPhotos } from "../util/sortProductPhotos";

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

async function getProductsBaseQuery(query: string) {
  const res = await fetchQuery(query);

  const { data: { products } } = await res.json();

  //console.log('Product Query returned', products);

  if (!products) {
    throw new Error('Error getting products');
  }

  return products;
}

const GET_TOP_4_PRODUCTS = `
  {
    products(sort: "Ranking:desc", where: {IsAvailable: true, Ranking_gte: 4}, limit: 4) {
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

export async function getTop4Products() {
  const products: ProductPreview[] = await getProductsBaseQuery(GET_TOP_4_PRODUCTS);
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
  const products: ProductPreview[] = await getProductsBaseQuery(GET_ALL_PRODUCTS);
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

  const products: ProductPreview[] = await getProductsBaseQuery(query);
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

  const products: ProductPreview[] = await getProductsBaseQuery(query);
  return products;
}






export type ProductInfo = {
  Brand: {
    id: number;
    Name: string;
    Logo: {
      url: string;
    }
  }
  Name: string;
  Description: string;
  Thumbnails: {
    name: string;
    url: string;
  }[]
  Pictures: {
    name: string;
    url: string;
  }[]
  Price: number;
  MSRP: number;
  Discount: number;
  IsAvailable: boolean;
  AvailableColors: string;
  AvailableSizes: string;
  Ranking: number;
  UnitsInStock: number;
  Category: {
    id: number;
    Name: string;
  }
  Subcategory: {
    id: number;
    Name: string;
  }
}

export async function getProductById(id: string) {
  const GET_PRODUCT_BY_ID = `
    {
      product(id: ${id}) {
        Brand {
          id
          Name
          Logo {
            url
          }
        }
        Name
        Description
        Thumbnails {
          name
          url
        }
        Pictures {
          name
          url
        }
        Price
        MSRP
        Discount
        IsAvailable
        AvailableColors
        AvailableSizes
        Ranking
        UnitsInStock
        Category {
          id
          Name
        }
        Subcategory {
          id
          Name
        }
      }
    }
  `;

  const res = await fetchQuery(GET_PRODUCT_BY_ID);
  const { data: { product } } = await res.json();

  if (!product) {
    throw new Error("Fetch product by id error");
  }

  const prod: ProductInfo = product;

  // Organize thumbnails and photos by number in photo name
  const photos = sortProductPhotos(prod.Pictures); 
  const thumbs = sortProductPhotos(prod.Thumbnails);

  prod.Pictures = photos;
  prod.Thumbnails = thumbs;

  return prod;
}




const GET_ALL_PRODUCTS_IDS = `
  {
    products {
      id
    }
  }
`;

export async function getAllProductsIds() {
  const productIds: {id: string}[] = await getProductsBaseQuery(GET_ALL_PRODUCTS_IDS);
  const ids = productIds.map(product => product.id);
  return ids;
}

const GET_ALL_PRODUCTS_ID_NAMES_PARENT_SUB = `
  
`;