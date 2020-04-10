import { ShoppingCartState, ShoppingCartItem, ShoppingCartActionTypes } from "./shoppingCartTypes"
import { ADD_ITEM_TO_SHOPPING_CART, ADD_ALL_ITEMS_TO_SHOPPING_CART, REMOVE_ITEM_FROM_SHOPPING_CART, REMOVE_ALL_ITEMS_FROM_SHOPPING_CART } from "./shoppingCartConstants"

const shoppingCartInitState: ShoppingCartState = {
  products: new Array<ShoppingCartItem>()
}

export const shoppingCartReducer = (state = shoppingCartInitState, action: ShoppingCartActionTypes): ShoppingCartState => {
  console.log('in shopping cart reducer')
  switch (action.type) {
    case ADD_ITEM_TO_SHOPPING_CART:
      return {
        products: [...state.products, action.payload.item]
      }
    case ADD_ALL_ITEMS_TO_SHOPPING_CART:
      return {
        products: [...action.payload.items]
      }
    case REMOVE_ITEM_FROM_SHOPPING_CART:
      return {
        products: [...state.products.filter(product => product.productId !== action.payload.id)]
      }
    case REMOVE_ALL_ITEMS_FROM_SHOPPING_CART:
      return {
        products: []
      }
    default:
      return state;
  }
}