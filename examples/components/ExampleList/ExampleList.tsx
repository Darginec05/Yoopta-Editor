import Link from 'next/link';
import s from './ExampleList.module.scss';
import { useRouter } from 'next/router';
import { SourceLink } from '../SourceLink/SourceLink';

const examples = [
  { path: '/basic', title: 'Basic' },
  { path: '/offline', title: 'Offline' },
  { path: '/media', title: 'Media' },
  { path: '/render', title: 'Rendering' },
  { path: '/styling', title: 'Styling' },
];

const ExampleList = () => {
  const router = useRouter();

  const currentPath = router.asPath;

  return (
    <div className={s.main}>
      <h1 style={{ color: currentPath === '/styling' ? '#fff' : '#000' }}>List of examples</h1>

      <ul className={s.exampleList}>
        {examples.map(({ path, title }) => {
          return (
            <li>
              <Link href={path} className={s.example} shallow>
                {title}
              </Link>
              {currentPath === path && <SourceLink example={path} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { ExampleList };
