import { useDropzone, DropzoneOptions, Accept } from 'react-dropzone';
import { useCallback, ReactNode, FC } from 'react';
import cx from 'classnames';
import { ReactComponent as ImageUploadIcon } from './icons/ImageUploadIcon.svg';
import { ReactComponent as VideoUploadIcon } from './icons/VideoUploadIcon.svg';
import s from './MediaEditorLayout.module.scss';

const icons = {
  image: ImageUploadIcon,
  video: VideoUploadIcon,
};

type MediaType = 'image' | 'video';

type Props = {
  mediaType: MediaType;
  accept: Accept | undefined;
  onUpload: (_file: File) => Promise<void>;
  options?: DropzoneOptions;
  maxFiles?: number;
};

const MediaEditorLayout: FC<Props> = ({ accept, mediaType, options, onUpload, maxFiles = 1 }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const [file] = acceptedFiles;
      onUpload(file);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    ...options,
  });

  const Icon = icons[mediaType];

  return (
    <div className={s.editor}>
      <div {...getRootProps()} className={cx(s.root, { [s.isDragActive]: isDragActive })}>
        <input {...getInputProps()} />
        <Icon />
        <p className={s.text}>
          Drag and drop here or <strong>select file</strong>
        </p>
      </div>
    </div>
  );
};

MediaEditorLayout.displayName = 'MediaEditorLayout';

export { MediaEditorLayout };
