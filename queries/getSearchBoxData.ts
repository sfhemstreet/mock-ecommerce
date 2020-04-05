import { fetchQuery } from '../util/fetchQuery';

export type SearchBoxData = {
  data: {
    products: {
      id: number;
      Name: string;
      Brand: {
        id: number;
        Name: string;
        Logo: {
          url: string;
        }
      }
      Category: {
        id: number;
        Name: string;
      }
      Subcategory: {
        id: number; 
        Name: string;
      }
    }[]
  }
}

const GET_SEARCH_BOX_DATA = `
  {
    products {
      id
      Name
      Thumbnails {
        name
        url
      }
      Brand {
        id 
        Name
        Logo {
          url
        }
      }
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

export async function getSearchBoxData() {
  const res = await fetchQuery(GET_SEARCH_BOX_DATA);
  const { data: { products } } = await res.json();
  
  if (!products) {
    throw new Error("Fetch error, get search box data");
  }

  const searchBoxData: SearchBoxData = products;

  return searchBoxData;
}