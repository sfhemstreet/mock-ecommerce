import { combineReducers } from 'redux';
import { shoppingCartReducer } from './shoppingCartReducer';
import { wishListReducer } from './wishListReducer';

export const rootReducer = combineReducers({ 
  shoppingCart: shoppingCartReducer, 
  wishList: wishListReducer 
});

export type RootState = ReturnType<typeof rootReducer>;