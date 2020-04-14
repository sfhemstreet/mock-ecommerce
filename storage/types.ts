export type StoredProduct = {
  id: string;
  Name: string;
  Price: number;
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
  Color: string;
  Size: string;
  Quantity: number;
}

export type StoredProductList = {
  products: StoredProduct[]
}