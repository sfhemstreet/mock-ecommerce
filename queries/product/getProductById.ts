import { fetchQuery } from "../../util/fetchQuery";
import { sortProductPhotos } from "../../util/sortProductPhotos";
import { ProductInfo } from "../types";



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