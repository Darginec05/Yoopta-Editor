import type { AppProps } from 'next/app'
import '../styles/globals.scss';
import 'yopta-editor/dist/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
