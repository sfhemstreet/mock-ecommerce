export type StoredProduct = {
  timeAdded: number;
  id: string;
  Name: string;
  Price: number;
  Discount: number;
  MSRP: number;
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

export type ModalsState = {
  wishlist: Modal,
  shoppingCart: Modal
}

export type Modal = {
  isOpen: boolean;
  isEditting: boolean;
}