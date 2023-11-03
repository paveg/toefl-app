import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { api } from "~/utils/api";
import "../app/globals.css"
import { MultiProvider } from "~/components/providers/multi-provider";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>TOEFL app</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="TOEFL app"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <MultiProvider>
          <Component {...pageProps} />
        </MultiProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider >
    </>
  );
};

export default api.withTRPC(MyApp);
