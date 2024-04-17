import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Yoopta-Editor</title>
        <meta name="description" content="Yoopta-Editor" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
