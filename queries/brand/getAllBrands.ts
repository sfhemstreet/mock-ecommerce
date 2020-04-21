import { fetchQuery } from '../../util/fetchQuery';
import { Brand } from '../types';

export async function getAllBrands() {
  const GET_ALL_BRANDS = `
    {
      brands {
        id
        Name
        Logo {
          url
        }
      }
    }
  `;

  const res = await fetchQuery(GET_ALL_BRANDS);
  const { data: { brands } } = await res.json();

  if (!brands) {
    throw new Error("No brands in getAllBrands");
  }

  return brands as Brand[];
}