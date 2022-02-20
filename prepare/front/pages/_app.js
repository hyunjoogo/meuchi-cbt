import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

const Meuchi = ({Component, pageProps}) => (
  <>
    <Head>
      <title>Meuchi</title>
    </Head>
    <Component {...pageProps}/>
  </>
);

export function reportWebVitals(metric) {
  console.log(metric);
}

export default Meuchi
