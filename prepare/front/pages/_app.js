import React, {useRef} from 'react';
import Head from 'next/head';
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import 'bootstrap/dist/css/bootstrap.min.css';

const Meuchi = ({Component, pageProps}) => {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Meuchi</title>
        </Head>
        <Component {...pageProps}/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </Hydrate>
    </QueryClientProvider>
  )
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default Meuchi
