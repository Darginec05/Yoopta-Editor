import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Yoopta-Editor</title>
        <meta
          name="description"
          content={
            'Discover notion-like editor with similar behaviour. Our user-friendly interface, good UX, big plans and open source.'
          }
        />
        <meta name="title" content={`Yoopta-Editor`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`https://yopage.co/blog/0zntIA46L4/W0epdDpnRa`} />
        <meta name="twitter:title" content={`Yoopta-Editor`} />
        <meta
          name="twitter:description"
          content={
            'Discover notion-like editor with similar behaviour. Our user-friendly interface, good UX, big plans and open source.'
          }
        />
        <meta name="twitter:creator" content="@tapflow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Yoopta-Editor`} />
        <meta
          property="og:description"
          content={
            'Discover notion-like editor with similar behaviour. Our user-friendly interface, good UX, big plans and open source.'
          }
        />
        <meta name="keywords" content="editor, notion, yoopta-editor, rich-text, wysiwyg, content, blog, rich-editor" />
        <meta name="author" content="Akhmed Ibragimov" />
        <meta property="og:site_name" content={'Yoopta-Editor'} />
        <meta property="og:url" content={`https://yopage.co/blog/0zntIA46L4/W0epdDpnRa`} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=5, viewport-fit=cover"
        />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
