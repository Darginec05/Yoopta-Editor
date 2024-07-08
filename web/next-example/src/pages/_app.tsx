import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AmplitudeScript } from '@/components/Amplitude/Amplitude';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AmplitudeScript />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </NextThemesProvider>
  );
}
