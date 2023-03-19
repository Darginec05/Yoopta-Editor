import { cx } from '@yopta/editor';
import { ChangeEvent } from 'react';
import s from './EditorUploader.module.scss';
import { Overlay } from './Overlay';

type Props = {};

const Uploader = ({ onChange }) => {
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
          accept="image/*"
          onChange={onChangeFile}
          multiple={false}
        />
        Upload file
      </label>
    </div>
  );
};

const Embed = () => {
  return <div></div>;
};

const EditorUploader = ({ activeTab = 'upload', style, switchTab, onChange, onClose }) => {
  const isUploader = activeTab === 'upload';
  const isEmbed = activeTab === 'embed';

  return (
    <Overlay onClose={onClose}>
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
              Embed link
            </button>
          </div>
          <div className={s.uploadContent}>
            {isUploader && <Uploader onChange={onChange} />}
            {isEmbed && <Embed />}
          </div>
        </div>
      </div>
      <div></div>
    </Overlay>
  );
};

export { EditorUploader };
