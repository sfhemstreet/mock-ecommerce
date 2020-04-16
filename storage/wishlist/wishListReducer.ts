import { ADD_ITEM_TO_WISHLIST, ADD_ALL_ITEMS_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST, REMOVE_ALL_ITEMS_FROM_WISHLIST, EDIT_WISHLIST_ITEM } from "./wishListConstants";
import { WishListActionTypes } from "./wishListTypes";
import { StoredProductList, StoredProduct } from "../types";
import { storedProductListInitState } from "../constants";

export const wishListReducer = (state = storedProductListInitState, action: WishListActionTypes): StoredProductList => {
  if (state === undefined) {
    console.log('uuuuuuuuuuu')
  }
  switch (action.type) {
    case ADD_ITEM_TO_WISHLIST:
      // check if item is in products already
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
            products: [
              ...state.products.filter(
                (_, index) => index !== indexOfProduct), changedProduct
            ]
          }
        }
      }
      
      // item is not already in wishlist, just add it to products
      return { ...state, products: [...state.products, action.payload.item] }

    case ADD_ALL_ITEMS_TO_WISHLIST:
      return { ...state, products: [...action.payload.items] }

    case EDIT_WISHLIST_ITEM: 
      return {
        ...state, 
        products: [...state.products.map(product => {
          if (product.id === action.payload.item.id && product.timeAdded === action.payload.item.timeAdded) 
            return action.payload.item;
          else
            return product;
        })]
      }

    case REMOVE_ITEM_FROM_WISHLIST:
      return {
        ...state,
        products: [...state.products.filter(product =>
          !(product.id === action.payload.id && product.timeAdded === action.payload.timeAdded)
        )]
      }

    case REMOVE_ALL_ITEMS_FROM_WISHLIST:
      return { ...state, products: [] }

    default:
      return state;
  }
}