import { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';

export function renderToHtmlString(element: ReactElement) {
  const htmlString = ReactDOMServer.renderToStaticMarkup(element);
  return htmlString;
}
