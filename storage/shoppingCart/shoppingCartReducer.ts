import { ADD_ITEM_TO_SHOPPING_CART, ADD_ALL_ITEMS_TO_SHOPPING_CART, REMOVE_ITEM_FROM_SHOPPING_CART, REMOVE_ALL_ITEMS_FROM_SHOPPING_CART, EDIT_SHOPPING_CART_ITEM } from "./shoppingCartConstants"
import { StoredProductList, StoredProduct } from "../types";
import { ShoppingCartActionTypes } from "./shoppingCartTypes";
import { storedProductListInitState } from "../constants";

export const shoppingCartReducer = (state = storedProductListInitState, action: ShoppingCartActionTypes): StoredProductList => {
  switch (action.type) {
    case ADD_ITEM_TO_SHOPPING_CART:
      // check if item is in shopping cart
      const indexOfProduct = state.products.findIndex(product => product.id === action.payload.item.id);
    
      if (indexOfProduct !== -1) {
        const product = state.products[indexOfProduct];
        // check if item is exactly the same size and color as the one already in wishlist
        if (product.Size === action.payload.item.Size &&
          product.Color === action.payload.item.Color) {
          // since its the same exact item increase quantity by item quantity 
          const changedProduct: StoredProduct = { ...product };
          changedProduct.Quantity = changedProduct.Quantity + action.payload.item.Quantity;
          // Filter state to get rid of old product and insert chnagedProduct
          return { 
            ...state,
            products: [...state.products.filter((_, index) => index !== indexOfProduct), changedProduct] 
          }
        }
      }
      return {
        ...state,
        products: [...state.products, action.payload.item]
      }
    case ADD_ALL_ITEMS_TO_SHOPPING_CART:
      return { 
        ...state, 
        products: [...action.payload.items] 
      }
    case EDIT_SHOPPING_CART_ITEM:
      return {
        ...state, 
        products: [...state.products.map(product => {
          if (product.id === action.payload.item.id && product.timeAdded === action.payload.item.timeAdded) 
            return action.payload.item;
          else
            return product;
        })]
      }
    case REMOVE_ITEM_FROM_SHOPPING_CART:
      return { 
        ...state, 
        products: [...state.products.filter(product => 
          !(product.id === action.payload.id && product.timeAdded === action.payload.timeAdded)
        )] 
      }
    case REMOVE_ALL_ITEMS_FROM_SHOPPING_CART:
      return { 
        ...state, 
        products: [] 
      }
    default:
      return state;
  }
}