import Link from 'next/link';
import s from '../styles/Home.module.scss';
import { ExampleList } from '../components/ExampleList/ExampleList';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/basic');
  }, []);

  return null;
}
