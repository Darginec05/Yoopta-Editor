import NextHead from 'next/head';

const hostname = 'https://yopta-editor-darginec05.vercel.app';
const keywords =
  'react,javascript,editor,contenteditable,wysiwyg,slate,rich-text-editor,wysiwyg-editor,rich-text,notion,notion-editor';

const Head = () => {
  return (
    <NextHead>
      <title>{'Yoopta-Editor - open-source rich-text editor'}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=360, initial-scale=1, shrink-to-fit=no" />
      <link rel="canonical" href={`${hostname}/examples/withBasicExample`} />
      <link type="image/x-icon" href="/favicon.ico" rel="shortcut icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" sizes="16x16" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f9a32a" />
      <meta name="apple-mobile-web-app-title" content="Yoopta-Editor - open-source rich-text editor" />
      <meta name="application-name" content="Yoopta-Editor - open-source rich-text editor" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="twitter:title" content="Yoopta-Editor - open-source rich-text editor" />
      <meta
        property="twitter:description"
        content={
          'With Yoopta-Editor, you can effortlessly create a robust and versatile editor that rivals the likes of Notion and Medium.'
        }
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@LebovskiYoo" />
      <meta name="twitter:image" content={`${hostname}/apple-touch-icon.png`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={hostname?.replace('https://', '')} />
      <meta property="og:url" content={`${hostname}/examples/withBasicExample`} />
      <meta property="og:image" content={`${hostname}/apple-touch-icon.png`} />
      <meta property="og:title" content={'Yoopta-Editor - open-source rich-text editor'} />
      <meta
        property="og:description"
        content={
          'With Yoopta-Editor, you can effortlessly create a robust and versatile editor that rivals the likes of Notion and Medium.'
        }
      />
      <meta itemProp="name" content={'Yoopta-Editor - open-source rich-text editor'} />
      <meta name="keywords" content={keywords} />
      <meta
        name="description"
        content={
          'With Yoopta-Editor, you can effortlessly create a robust and versatile editor that rivals the likes of Notion and Medium.'
        }
      />
      <meta itemProp="image" content={`${hostname}/apple-touch-icon.png`} />
    </NextHead>
  );
};

export { Head };
