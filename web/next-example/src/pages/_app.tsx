import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </NextThemesProvider>
  );
}
