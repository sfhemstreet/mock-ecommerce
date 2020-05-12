import React, { useEffect, useState } from "react";
import App from "next/app";
import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AppTheme } from "../themes/AppTheme";
import { NextComponentType, NextPageContext } from "next";

type MyThemeType = typeof AppTheme;

export interface ThemeWrapper {
  theme: MyThemeType;
  noFocus: boolean;
}

const GlobalStyle = createGlobalStyle<ThemeWrapper>`
    body {
      margin: 0 auto;
      font-family: ${(props) => props.theme.typography.fontFamily};
      background-color: ${(props) => props.theme.colors.black};
      color: ${(props) => props.theme.colors.white}; 
    }

    ${props => props.noFocus === true && " :focus { outline: none; }"}
  `;

interface MyAppProps extends App {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {

  // Do not show the :focus ring around elements 
  // unless user hits Tab on keyboard.
  const [noFocus, setFocus] = useState(true);

  const handleTabKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === "Tab")
      setFocus(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleTabKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleTabKeyPress, false);
    };
  }, []);

  return (
    <>
      <Head>
        <title>E Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={AppTheme}>
        <GlobalStyle noFocus={noFocus} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
