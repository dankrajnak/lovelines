import Document, { Html, Head, Main, NextScript } from "next/document";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import React from "react";
config.autoAddCss = false;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style>{dom.css()}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
