import { ExampleList } from '@/components/ExampleList/ExampleList';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ExampleList />
      <Component {...pageProps} />
    </div>
  );
}
