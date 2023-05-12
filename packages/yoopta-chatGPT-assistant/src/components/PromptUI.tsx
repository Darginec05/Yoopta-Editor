import { KeyboardEvent, useEffect, useRef } from 'react';
import autosize from 'autosize';
import FlighIcon from './Flight.svg';
import { Loader } from './Loader';
import { cx, HOTKEYS } from '@yoopta/editor';
import s from './PromptUI.module.scss';

const PromptUI = ({ value, onChange, askChatGPT, loading, onClose }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeydown = (event) => {
    if (HOTKEYS.isBackspace(event)) {
      if (value.length === 0) {
        return onClose();
      }
    }

    if (HOTKEYS.isEscape(event)) {
      return onClose();
    }

    if (HOTKEYS.isEnter(event)) {
      event.preventDefault();
      return askChatGPT();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      autosize(textareaRef.current);
    }
  }, [textareaRef.current]);

  return (
    <div className={cx(s.root, { [s.loading]: loading })}>
      <div className={s.content}>
        <div className={s.body}>
          <textarea
            ref={textareaRef}
            placeholder="Ask ChatGPT..."
            value={value}
            onChange={onChange}
            className={s.textarea}
            rows={1}
          />
          <button type="button" onClick={loading ? undefined : askChatGPT} disabled={loading} className={s.flight}>
            {loading ? <Loader /> : <FlighIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export { PromptUI };
