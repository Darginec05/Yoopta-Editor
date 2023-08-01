import { cx, UI_HELPERS } from '@yoopta/editor';
import { ChangeEvent, useState } from 'react';
import s from './EditorUploader.module.scss';

const EmbedLink = ({ onEmbed }) => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const onEmbedLink = () => onEmbed(value);

  return (
    <div className={s.embed}>
      <input type="text" placeholder="Paste embed link" value={value} className={s.embedInput} onChange={onChange} />
      <button type="button" className={s.embedButton} onClick={onEmbedLink}>
        Embed
      </button>
    </div>
  );
};

const EditorUploader = ({ style, onEmbed, onClose }) => {
  return (
    <UI_HELPERS.Overlay onClose={onClose}>
      <div className={s.container} style={style}>
        <div className={s.content}>
          <div className={s.tabs}>
            <button type="button" className={cx(s.tab, { [s.activeTab]: true })}>
              Embed link
            </button>
          </div>
          <div className={s.uploadContent}>
            <EmbedLink onEmbed={onEmbed} />
          </div>
        </div>
      </div>
      <div></div>
    </UI_HELPERS.Overlay>
  );
};

export { EditorUploader };
