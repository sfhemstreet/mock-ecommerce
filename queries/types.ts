export type ProductPreview = {
  id: string;
  slug: string;
  Name: string;
  Price: number;
  Discount: number;
  AvailableColors: string;
  AvailableSizes: string;
  Ranking: number;
  Brand: {
    id: string;
    Name: string;
    Logo: {
      url: string;
    }
  }
  Preview: {
    url: string;
  }
  PreviewWebP: {
    url: string;
  }
  Category: {
    id: string;
    slug: string;
    Name: string;
  }
  Subcategory: {
    id: string;
    slug: string;
    Name: string;
  }
}

export const ProductPreviewQuery = `
  id
  slug
  Name
  Price
  Discount
  AvailableColors
  AvailableSizes
  Ranking
  Brand {
    id
    Name
    Logo {
      url
    }
  }
  Preview {
    url
  }
  PreviewWebP {
    url
  }
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
`;

export type ProductInfo = {
  id: string;
  slug: string;
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
  ThumbnailsWebP: {
    name: string;
    url: string;
  }[]
  Pictures: {
    name: string;
    url: string;
  }[]
  PicturesWebP: {
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
    slug: string;
    Name: string;
  }
  Subcategory: {
    id: string;
    slug: string;
    Name: string;
  }
  Preview: {
    url: string;
  }
  PreviewWebP: {
    url: string;
  }
}

export const ProductInfoQuery = `
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
  ThumbnailsWebP {
    name
    url
  }
  Pictures {
    name
    url
  }
  PicturesWebP {
    name
    url
  }
  Preview {
    url
  }
  PreviewWebP {
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
`;

export type Category = {
  id: string;
  slug: string;
  Name: string;
  SubCategories?: Category[];
};

export type SubCategory = {
  id: string;
  slug: string;
  Name: string;
  ParentCategory: {
    id: string;
    slug: string;
    Name: string;
  }
}

export type SiteLogo = {
  NormalLogo: {
    url: string;
  }
  SmallLogo: {
    url: string;
  }
}

export type Brand = {
  id: string;
  slug: string;
  Name: string;
  Logo: {
    url: string;
  }
}

export interface BrandWithProducts extends Brand {
  Products: ProductPreview[]
}