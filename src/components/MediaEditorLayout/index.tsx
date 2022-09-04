import { useDropzone, DropzoneOptions, Accept } from 'react-dropzone';
import { forwardRef, useCallback, ReactNode } from 'react';
import cx from 'classnames';
import { MediaEditorOptions } from '../MediaEditorOptions';
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
  options: DropzoneOptions;
  maxFiles: number;
  children: ReactNode;
  onUpload: (_file: File) => Promise<void>;
};

const MediaEditorLayout = forwardRef<any, Props>(
  ({ children, accept, mediaType, options, onUpload, maxFiles = 1, ...rest }, ref) => {
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
      <div className={s.editor} {...rest} ref={ref}>
        <div {...getRootProps()} className={cx(s.root, { [s.isDragActive]: isDragActive })}>
          <input {...getInputProps()} />
          <Icon />
          <p className={s.text}>
            Drag and drop here or <strong>select file</strong>
          </p>
          <div className={s.options}>
            <MediaEditorOptions />
          </div>
        </div>
        {children}
      </div>
    );
  },
);

MediaEditorLayout.displayName = 'MediaEditorLayout';

export { MediaEditorLayout };
