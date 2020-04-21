export type ProductPreview = {
  id: string;
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
}

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

export type Category = {
  id: string;
  Name: string;
  SubCategories?: Category[];
};

export type SubCategory = {
  id: string;
  Name: string;
  ParentCategory: {
    id: string;
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
  Name: string;
  Logo: {
    url: string;
  }
}