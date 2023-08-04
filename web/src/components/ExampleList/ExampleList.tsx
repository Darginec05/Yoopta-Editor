import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import s from './ExampleList.module.scss';

type Props = {
  links: string[];
};

const ExampleList = ({ links }: Props) => {
  const router = useRouter();

  // console.log('router.pathname', router.asPath);
  const isCurrent = (path: string) => router.asPath.toLowerCase().endsWith(path);

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <h4 className={s.title}>Examples</h4>
        <div className={s.list}>
          {links.map((link) => (
            <Link
              href={`/examples/${link}`}
              className={cx(s.button, { [s.currentButton]: isCurrent(link.toLowerCase()) })}
              key={link}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ExampleList };
