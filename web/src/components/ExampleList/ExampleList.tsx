import Link from 'next/link';
import s from './ExampleList.module.scss';

type Props = {
  links: string[];
};

const ExampleList = ({ links }: Props) => {
  return (
    <div className={s.list}>
      <div className={s.inner}>
        {links.map((link) => (
          <div className={s.button} key={link}>
            <Link href={`/examples/${link}`}>{link}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ExampleList };
