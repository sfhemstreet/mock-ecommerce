import { fetchQuery } from "../../util/fetchQuery";
import { sortProductPhotos } from "../../util/sortProductPhotos";
import { ProductInfo, ProductInfoQuery } from "../types";



export async function getProductById(id: string) {
  const GET_PRODUCT_BY_ID = `
    {
      product(id: ${id}) {
        ${ProductInfoQuery}
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