import type { AppProps } from 'next/app'
import '../styles/globals.css';
import 'yopta-editor/dist/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
