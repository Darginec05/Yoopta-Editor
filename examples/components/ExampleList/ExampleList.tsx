import Link from 'next/link';
import s from './ExampleList.module.scss';

const ExampleList = () => {
  return (
    <div className={s.main}>
      <h1>List of examples</h1>

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
