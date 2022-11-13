import { FC, ChangeEvent } from 'react';
import ImageUploadIcon from './icons/ImageUploadIcon.svg';
import VideoUploadIcon from './icons/VideoUploadIcon.svg';
import s from './MediaEditorLayout.module.scss';

const icons = {
  image: ImageUploadIcon,
  video: VideoUploadIcon,
};

type MediaType = 'image' | 'video';

type Options = {
  accept?: string;
  multiple?: boolean;
};

type Props = {
  mediaType: MediaType;
  onUpload: (_file: File) => Promise<void>;
  options?: Options;
  nodeId: string;
};

const MediaEditorLayout: FC<Props> = ({ nodeId, mediaType, options, onUpload }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onUpload(file);
  };

  // label for to make area clickable
  const Icon = icons[mediaType];

  return (
    <div className={s.editor}>
      <label className={s.root} htmlFor={`file_upload_for_${nodeId}`}>
        <Icon />
        <input
          id={`file_upload_for_${nodeId}`}
          type="file"
          accept={options?.accept}
          multiple={false}
          onChange={handleChange}
          className={s.input}
        />
        <p className={s.text}>
          Drag and drop here or
          {' '}
          <strong>select file</strong>
        </p>
      </label>
    </div>
  );
};

MediaEditorLayout.displayName = 'MediaEditorLayout';

export { MediaEditorLayout };
