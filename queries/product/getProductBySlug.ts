import { fetchQuery } from "../../util/fetchQuery";
import { sortProductPhotos } from "../../util/sortProductPhotos";
import { ProductInfo, ProductInfoQuery } from "../types";



export async function getProductBySlug(slug: string) {
  const GET_PRODUCT_BY_SLUG = `
    {
      products(where: {slug: "${slug}"}) {
        ${ProductInfoQuery}
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
  const photosWebP = sortProductPhotos(prod.PicturesWebP);
  const thumbsWebP = sortProductPhotos(prod.ThumbnailsWebP);

  prod.Pictures = photos;
  prod.Thumbnails = thumbs;
  prod.PicturesWebP = photosWebP;
  prod.ThumbnailsWebP = thumbsWebP;

  return prod;
}