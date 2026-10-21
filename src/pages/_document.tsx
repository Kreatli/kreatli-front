import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7828c8" />
        <meta name="msapplication-TileColor" content="#7828c8" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <script
          // Runs before first paint: lets CSS skip the app loader overlay for signed-out visitors.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: "try{document.documentElement.dataset.session=localStorage.getItem('token')?'token':'none'}catch(e){document.documentElement.dataset.session='none'}",
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: React.Children.toArray([initialProps.styles]),
  };
};

export default MyDocument;
