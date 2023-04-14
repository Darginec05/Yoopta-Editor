import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ExampleList } from '../components/ExampleList/ExampleList';
import { SocialLinks } from '../components/SocialLinks/SocialLinks';

import '../styles/globals.scss';
// import '@yopta/editor/dist/index.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Yopta-Editor</title>
        <meta
          name="description"
          content={
            'Discover notion-like editor with similar behaviour. Our user-friendly interface, good UX, big plans and open source.'
          }
        />
        <meta name="title" content={`Yopta-Editor`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`https://yopage.co/blog/0zntIA46L4/W0epdDpnRa`} />
        <meta name="twitter:title" content={`Yopta-Editor`} />
        <meta
          name="twitter:description"
          content={
            'Discover notion-like editor with similar behaviour. Our user-friendly interface, good UX, big plans and open source.'
          }
        />
        <meta name="twitter:creator" content="@tapflow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Yopta-Editor`} />
        <meta
          property="og:description"
          content={
            'Discover notion-like editor with similar behaviour. Our user-friendly interface, good UX, big plans and open source.'
          }
        />
        <meta name="keywords" content="editor, notion, yopta-editor, rich-text, wysiwyg, content, blog, rich-editor" />
        <meta name="author" content="Akhmed Ibragimov" />
        <meta property="og:site_name" content={'Yopta-Editor'} />
        <meta property="og:url" content={`https://yopage.co/blog/0zntIA46L4/W0epdDpnRa`} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=5, viewport-fit=cover"
        />
      </Head>
      <div>
        {!router.asPath.startsWith('/dev') && (
          <>
            <ExampleList />
            <SocialLinks />
          </>
        )}

        <Component {...pageProps} />
      </div>
    </>
  );
}
