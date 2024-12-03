import NextHead from 'next/head';

const hostname = 'https://yopta-editor-darginec05.vercel.app';

type Props = {
  title?: string;
  description?: string;
  content?: string;
  keywords?: string;
};

const Head = (props: Props) => {
  const title = props.title || 'Yoopta-Editor - open-source rich-text editor';
  const description =
    props.description ||
    'Using Yoopta-Editor you can effortlessly create a robust and versatile editor that rivals the likes of Notion and Medium.';
  const content = props.content || 'Yoopta-Editor - open-source rich-text editor';
  const keywords =
    props.keywords ||
    'react,javascript,editor,contenteditable,wysiwyg,slate,rich-text-editor,wysiwyg-editor,rich-text,notion,notion-editor';

  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=360, initial-scale=1, shrink-to-fit=no" />
      <link rel="canonical" href="https://github.com/Darginec05/Yopta-Editor" />
      <link type="image/x-icon" href="/favicon.ico" rel="shortcut icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" sizes="16x16" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f9a32a" />
      <meta name="apple-mobile-web-app-title" content={content} />
      <meta name="application-name" content={content} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="twitter:title" content={content} />
      <meta property="twitter:description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@LebovskiYoo" />
      <meta name="twitter:image" content={`${hostname}/apple-touch-icon.png`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Yopta-Editor" />
      <meta property="og:url" content="https://github.com/Darginec05/Yopta-Editor" />
      <meta property="og:image" content={`${hostname}/apple-touch-icon.png`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta itemProp="name" content={title} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta itemProp="image" content={`${hostname}/apple-touch-icon.png`} />
    </NextHead>
  );
};

export { Head };
