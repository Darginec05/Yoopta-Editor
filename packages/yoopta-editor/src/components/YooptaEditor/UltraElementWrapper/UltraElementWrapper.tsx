import s from './UltraElementWrapper.module.scss';

const UltraElementWrapper = ({ children }) => {
  return (
    <div className={s.root}>
      <button className={s.addButton}>+</button>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export { UltraElementWrapper };
