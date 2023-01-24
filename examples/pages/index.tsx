import Link from 'next/link';
import s from '../styles/Home.module.scss';
import { ExampleList } from '../components/ExampleList/ExampleList';

export default function Home() {
  return (
    <div className={s.container}>
      <ExampleList />
    </div>
  );
}
