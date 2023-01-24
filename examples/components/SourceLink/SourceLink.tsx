import { useRouter } from 'next/router';
import s from './SourceLink.module.scss';

const ROOT_PATH = 'https://github.com/Darginec05/Yopta-Editor/tree/master/examples/pages';

const SourceLink = () => {
  const router = useRouter();

  if (router.asPath === '/') return null;

  const to = `${ROOT_PATH}${router.asPath}/index.tsx`;

  return (
    <div className={s.sourceLink}>
      <a href={to} target="_blank">
        Source code
      </a>
    </div>
  );
};

export { SourceLink };
