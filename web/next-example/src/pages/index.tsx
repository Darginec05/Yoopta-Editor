import Image from 'next/image';
import { Inter } from 'next/font/google';
import YooptaBasicExample from '@/examples/withBasicExample';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <YooptaBasicExample />;
}
