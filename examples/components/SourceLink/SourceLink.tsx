import s from './SourceLink.module.scss';

const ROOT_PATH = 'https://github.com/Darginec05/Yopta-Editor/tree/master/examples/pages';

const SourceLink = ({ example }: { example: string }) => {
  const to = `${ROOT_PATH}${example}/index.tsx`;

  return (
    <div className={s.sourceLink}>
      <a href={to} target="_blank">
        View source code
      </a>
    </div>
  );
};

export { SourceLink };
