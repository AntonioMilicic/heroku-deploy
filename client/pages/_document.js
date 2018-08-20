import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>Kviskoteka</title>
          <link href="/static/images/favicon.ico"
            rel="icon" type="image/x-icon" />
          <link rel="stylesheet" href="/static/default.css" />
          <link rel="stylesheet" href="/static/Assets/css/carousel.css" />
          <link rel="stylesheet" href="/static/spinner.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
