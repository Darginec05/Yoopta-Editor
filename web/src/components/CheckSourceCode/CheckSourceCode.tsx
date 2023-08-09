import s from './CheckSourceCode.module.scss';

type Props = {
  example: string;
};

const CheckSourceCode = ({ example }: Props) => {
  return (
    <div className={s.root}>
      <div className={s.linkWrap}>
        <a
          target="_blank"
          href={`https://github.com/Darginec05/Yopta-Editor/blob/master/web/src/examples/${example}.tsx`}
          rel="noopener"
          className={s.link}
        >
          Source code for <strong>{example}</strong>
        </a>
      </div>
      <div className={s.linkWrap}>
        <a target="_blank" href={`https://github.com/Darginec05/Yopta-Editor`} rel="noopener" className={s.link}>
          Give <strong>Yoopta-Editor</strong> ⭐️ star
        </a>
      </div>
    </div>
  );
};

export { CheckSourceCode };
