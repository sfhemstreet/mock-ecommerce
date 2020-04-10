import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import App from "next/app";
import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AppTheme } from "../themes/AppTheme";
import { NextComponentType, NextPageContext } from "next";
import { getOrCreateStore, setLocalStorageState, getLocalStorageState } from "../redux/store";
import { addAllItemsToWishList } from '../redux/wishListActions';
import { addAllItemsToShoppingCart } from '../redux/shoppingCartActions';

type MyThemeType = typeof AppTheme;

export interface ThemeWrapper {
  theme: MyThemeType;
}

const GlobalStyle = createGlobalStyle<ThemeWrapper>`
  body {
    margin: 0 auto;
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }
`;

interface MyAppProps extends App {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const store = getOrCreateStore();

  useEffect(() => {
    const state = getLocalStorageState();
    if (state) {
      console.log("getting localstorgae state and dispatching in _app")
      store.dispatch(addAllItemsToShoppingCart(state.shoppingCart.products));
      store.dispatch(addAllItemsToWishList(state.wishList.products));
    }

    store.subscribe(() => {
      console.log('updaing local storage in store.js')
  
      setLocalStorageState({
        wishList: store.getState().wishList,
        shoppingCart: store.getState().shoppingCart
      });
    });
  });

  return (
    <Provider store={store}>
      <Head>
        <title>E Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={AppTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;