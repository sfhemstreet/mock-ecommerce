import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { AppTheme } from "../themes/AppTheme";

export default class MyDocument extends Document<any> {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
          enhanceComponent: Component => props => sheet.collectStyles(<Component {...props} />)
        });

      const initialProps = await Document.getInitialProps(context);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (  
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap"
            rel="stylesheet"
          /> 
          {this.props.styleTags}
        </Head>
        <body id={AppTheme.mainContainerId}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
