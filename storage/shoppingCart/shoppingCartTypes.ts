import { 
  ADD_ITEM_TO_SHOPPING_CART, 
  ADD_ALL_ITEMS_TO_SHOPPING_CART,
  REMOVE_ITEM_FROM_SHOPPING_CART, 
  REMOVE_ALL_ITEMS_FROM_SHOPPING_CART, 
  EDIT_SHOPPING_CART_ITEM
} from "./shoppingCartConstants";

export type ShoppingCartProduct = {
  timeAdded: number;
  id: string;
  slug: string;
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

export type ShoppingCart = {
  products: ShoppingCartProduct[]
}

export interface AddShoppingCartItemAction {
  type: typeof ADD_ITEM_TO_SHOPPING_CART;
  payload: {
    item: ShoppingCartProduct
  }
}

export interface AddAllShoppingCartItemsAction {
  type: typeof ADD_ALL_ITEMS_TO_SHOPPING_CART;
  payload: {
    items: ShoppingCartProduct[]
  }
}

export interface EditShoppingCartItemAction {
  type: typeof EDIT_SHOPPING_CART_ITEM;
  payload: { item: ShoppingCartProduct }
}

export interface RemoveShoppingCartItemAction {
  type: typeof REMOVE_ITEM_FROM_SHOPPING_CART;
  payload: { id: string, timeAdded: number }
}

export interface RemoveAllShoppingCartItemsAction {
  type: typeof REMOVE_ALL_ITEMS_FROM_SHOPPING_CART;
}

export type ShoppingCartActionTypes = AddShoppingCartItemAction | EditShoppingCartItemAction | AddAllShoppingCartItemsAction | RemoveShoppingCartItemAction | RemoveAllShoppingCartItemsAction;
