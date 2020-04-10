import { WishListState, WishListItem, WishListActionTypes } from "./wishListTypes";
import { ADD_ITEM_TO_WISHLIST, ADD_ALL_ITEMS_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST, REMOVE_ALL_ITEMS_FROM_WISHLIST } from "./wishListConstants";

const wishListInitState: WishListState = {
  products: new Array<WishListItem>()
}

export const wishListReducer = (state = wishListInitState, action: WishListActionTypes): WishListState => {
  switch (action.type) {
    case ADD_ITEM_TO_WISHLIST:
      console.log('adding item to wishlist')
      // check if item is in products already
      const indexOfProduct = state.products.findIndex(product => product.productId === action.payload.item.productId);
      if (indexOfProduct !== -1) {
        const product = state.products[indexOfProduct];
        // check if item is exactly the same size and color as the one already in wishlist
        if (product.productSize === action.payload.item.productSize &&
          product.productColor === action.payload.item.productColor) {
          // since its the same exact item increase quantity by item quantity 
          const changedProduct = Object.assign({}, product);
          changedProduct.quantity = changedProduct.quantity + action.payload.item.quantity;
          // Filter state to get rid of old product and insert chnagedProduct
          return Object.assign({}, state, { products: [...state.products.filter((_, index) => index !== indexOfProduct), changedProduct] })
        }
      }
      // item is not already in wishlist, just add it to products
      return Object.assign({}, state, { products: [...state.products, action.payload.item] })
    case ADD_ALL_ITEMS_TO_WISHLIST:
      return Object.assign({}, state, { products: [...action.payload.items] })
    case REMOVE_ITEM_FROM_WISHLIST:
      return Object.assign({}, state, { products: [...state.products.filter(product => product.productId !== action.payload.id)] })
    case REMOVE_ALL_ITEMS_FROM_WISHLIST:
      return Object.assign({}, wishListInitState);
    default:
      return state;
  }
}