import Link from 'next/link';
import s from './ExampleList.module.scss';
import { useRouter } from 'next/router';

const ExampleList = () => {
  const router = useRouter();

  return (
    <div className={s.main}>
      <h1 style={{ color: router.asPath === '/styling' ? '#fff' : '#000' }}>List of examples</h1>

      <ul className={s.exampleList}>
        <li>
          <Link href="/basic" className={s.example}>
            Basic
          </Link>
        </li>
        <li>
          <Link href="/offline" className={s.example}>
            Offline
          </Link>
        </li>
        <li>
          <Link href="/media" className={s.example}>
            Media
          </Link>
        </li>
        <li>
          <Link href="/render" className={s.example}>
            Rendering
          </Link>
        </li>
        <li>
          <Link href="/styling" className={s.example}>
            Styling
          </Link>
        </li>
      </ul>
    </div>
  );
};

export { ExampleList };
