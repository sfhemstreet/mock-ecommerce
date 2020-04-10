import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ThunkMiddleware from 'redux-thunk';
import { rootReducer, RootState } from './rootReducer';
import { ShoppingCartState } from './shoppingCartTypes';
import { WishListState } from './wishListTypes';

const REDUX_STATE = "REDUX_STATE";

export function getLocalStorageState(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem(REDUX_STATE);

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);

  } catch (err) {

    console.log('ERROR: getLocalStorageState', err);

    return undefined;
  }
}

export function setLocalStorageState(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(REDUX_STATE, serializedState)
  } catch (err) {
    console.log("ERROR: setLocalStorageState", err);
  }
}

export function getOrCreateStore() {
  const middleware = <any>[ThunkMiddleware];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger();
    middleware.push(logger);
  }

  const persistedState = getLocalStorageState();

  const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));
  
  store.subscribe(() => {
    console.log('updaing local storage in store.js')

    setLocalStorageState({
      wishList: store.getState().wishList,
      shoppingCart: store.getState().shoppingCart
    });
  });

  return store;
}





