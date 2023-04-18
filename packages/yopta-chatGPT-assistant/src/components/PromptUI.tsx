import FlighIcon from './Flight.svg';
import s from './PromptUI.module.scss';

const PromptUI = ({ value, onChange, askChatGPT }) => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.body}>
          <textarea placeholder="Ask ChatGPT..." value={value} onChange={onChange} className={s.textarea} rows={1} />
          <button type="button" onClick={askChatGPT} className={s.flight}>
            <FlighIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export { PromptUI };
