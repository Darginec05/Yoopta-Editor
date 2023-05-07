import Link from 'next/link';
import s from './ExampleList.module.scss';

const ExampleList = () => {
  return (
    <div className={s.list}>
      <div className={s.button}>
        <Link href="/examples/basic">Basic</Link>
      </div>
      <div className={s.button}>
        <Link href="/examples/taxonomy">With dark theme</Link>
      </div>
      <div className={s.button}>
        <Link href="/examples/medium">Medium example</Link>
      </div>
      <div className={s.button}>
        <Link href="/examples/notion">Notion example</Link>
      </div>
      <div className={s.button}>
        <Link href="/examples/justrender">Just render</Link>
      </div>
    </div>
  );
};

export { ExampleList };
