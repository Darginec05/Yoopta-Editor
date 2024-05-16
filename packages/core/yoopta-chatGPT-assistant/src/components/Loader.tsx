import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.container}>
      <div className={s.dot} />
      <div className={s.dot} />
      <div className={s.dot} />
    </div>
  );
};

export { Loader };
