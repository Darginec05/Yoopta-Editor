import { cx, UI_HELPERS } from '@yoopta/editor';
import { ChangeEvent, useState } from 'react';
import s from './EditorUploader.module.scss';

type Props = {};

const Uploader = ({ onChange, accept = 'image/*' }) => {
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <div className={s.uploader}>
      <label htmlFor="image-uploader" className={s.uploaderLabel}>
        <input
          type="file"
          id="image-uploader"
          className={s.uploaderInput}
          accept={accept}
          onChange={onChangeFile}
          multiple={false}
        />
        Upload image
      </label>
    </div>
  );
};

const EmbedLink = ({ onEmbed }) => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const onEmbedLink = () => onEmbed(value);

  return (
    <div className={s.embed}>
      <input type="text" placeholder="Paste image link" value={value} className={s.embedInput} onChange={onChange} />
      <button type="button" className={s.embedButton} onClick={onEmbedLink}>
        Embed image
      </button>
    </div>
  );
};

const EditorUploader = ({ activeTab = 'upload', style, switchTab, onChange, onEmbed, accept, onClose }) => {
  const isUploader = activeTab === 'upload';
  const isEmbed = activeTab === 'embed';

  return (
    <UI_HELPERS.Overlay onClose={onClose}>
      <div className={s.container} style={style}>
        <div className={s.content}>
          <div className={s.tabs}>
            <button
              type="button"
              onClick={() => switchTab('upload')}
              className={cx(s.tab, { [s.activeTab]: isUploader })}
            >
              Upload
            </button>
            <button type="button" onClick={() => switchTab('embed')} className={cx(s.tab, { [s.activeTab]: isEmbed })}>
              Image link
            </button>
          </div>
          <div className={s.uploadContent}>
            {isUploader && <Uploader onChange={onChange} accept={accept} />}
            {isEmbed && <EmbedLink onEmbed={onEmbed} />}
          </div>
        </div>
      </div>
      <div></div>
    </UI_HELPERS.Overlay>
  );
};

export { EditorUploader };
