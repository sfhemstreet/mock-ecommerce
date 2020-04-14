import { fetchQuery } from "../../util/fetchQuery";
import { sortProductPhotos } from "../../util/sortProductPhotos";

export type ProductInfo = {
  id: string;
  Brand: {
    id: string;
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
    id: string;
    Name: string;
  }
  Subcategory: {
    id: string;
    Name: string;
  }
  Preview: {
    url: string;
  }
}

export async function getProductById(id: string) {
  const GET_PRODUCT_BY_ID = `
    {
      product(id: ${id}) {
        id
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
        Preview {
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