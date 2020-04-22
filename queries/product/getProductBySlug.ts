import { fetchQuery } from "../../util/fetchQuery";
import { sortProductPhotos } from "../../util/sortProductPhotos";
import { ProductInfo } from "../types";



export async function getProductBySlug(slug: string) {
  const GET_PRODUCT_BY_SLUG = `
    {
      products(where: {slug: "${slug}"}) {
        id
        slug
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
          slug
          Name
        }
        Subcategory {
          id
          slug
          Name
        }
      }
    }
  `;

  const res = await fetchQuery(GET_PRODUCT_BY_SLUG);
  const { data: { products } } = await res.json();

  if (!products) {
    throw new Error("Fetch product by id error");
  }

  const prod: ProductInfo = products[0];

  // Organize thumbnails and photos by number in photo name
  const photos = sortProductPhotos(prod.Pictures); 
  const thumbs = sortProductPhotos(prod.Thumbnails);

  prod.Pictures = photos;
  prod.Thumbnails = thumbs;

  return prod;
}