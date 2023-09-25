import { cx, UI_HELPERS } from '@yoopta/editor';
import { ChangeEvent } from 'react';
import s from './EditorUploader.module.scss';

const Uploader = ({ onChange, accept = 'file/*' }) => {
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <div className={s.uploader}>
      <label htmlFor="file-uploader" className={s.uploaderLabel}>
        <input
          type="file"
          id="file-uploader"
          className={s.uploaderInput}
          accept={accept}
          onChange={onChangeFile}
          multiple={false}
        />
        Upload file
      </label>
    </div>
  );
};

const EditorUploader = ({ activeTab = 'upload', style, switchTab, onChange, accept, onClose }) => {
  const isUploader = activeTab === 'upload';

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
          </div>
          <div className={s.uploadContent}>{isUploader && <Uploader onChange={onChange} accept={accept} />}</div>
        </div>
      </div>
    </UI_HELPERS.Overlay>
  );
};

export { EditorUploader };
