import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ThunkMiddleware from 'redux-thunk';
import { rootReducer } from './rootReducer';

const middleware = <any>[ThunkMiddleware];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger();
  middleware.push(logger);
}

function getOrCreateStore() {

  

  return createStore(rootReducer, applyMiddleware(...middleware));
}

export const store = getOrCreateStore() 

