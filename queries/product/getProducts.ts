import { fetchQuery } from "../../util/fetchQuery";


export async function getProductsBaseQuery(query: string) {
  const res = await fetchQuery(query);

  const { data: { products } } = await res.json();

  //console.log('Product Query returned', products);

  if (!products) {
    throw new Error('Error getting products');
  }

  return products;
}




