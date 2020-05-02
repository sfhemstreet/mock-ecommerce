import { fetchQuery } from '../../util/fetchQuery';
import { BrandWithProducts, ProductPreviewQuery } from '../types';

export async function getBrandWithProductsBySlug(slug: string) {
  const GET_BRANDS_WITH_PRODUCTS_BY_SLUG = `
    {
      brands (where: {slug: "${slug}"}) {
        id
        slug
        Name
        Logo {
          url
        }
        Products {
          ${ProductPreviewQuery}
        }
      }
    }
  `;

  const res = await fetchQuery(GET_BRANDS_WITH_PRODUCTS_BY_SLUG);
  const { data: { brands } } = await res.json();

  if (!brands) {
    throw new Error("No brands in getAllBrands");
  }

  return brands[0] as BrandWithProducts;
}