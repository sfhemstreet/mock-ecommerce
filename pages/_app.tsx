import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MainTheme } from '../themes/mainTheme';

type MainThemeType = typeof MainTheme;

export interface ThemeWrapper {
  theme: MainThemeType;
}

const GlobalStyle = createGlobalStyle<ThemeWrapper>`
  body {
    margin: 0 auto;
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <> 
        <Head>
          <title>E Store</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <ThemeProvider theme={MainTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}