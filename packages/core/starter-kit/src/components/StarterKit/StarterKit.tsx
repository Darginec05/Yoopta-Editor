import { CSSProperties, useEffect, useMemo } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaContentValue } from '@yoopta/editor';

import { TOOLS } from '../../utilts/tools';
import { MARKS } from '../../utilts/marks';
import { getPlugins } from '../../utilts/plugins';
import { ImageUploadResponse } from '@yoopta/image';
import { VideoUploadResponse } from '@yoopta/video';
import { FileUploadResponse } from '@yoopta/file';

export type StarterKitProps = {
  id?: string;
  value?: YooptaContentValue;
  onChange?: (value: YooptaContentValue) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  selectionBoxRoot?: React.RefObject<HTMLDivElement> | false;
  media?: MediaUploadsFn;
};

export type MediaUploadsFn = {
  imageUpload?: (file: File) => Promise<ImageUploadResponse>;
  videoUpload?: (file: File) => Promise<VideoUploadResponse>;
  fileUpload?: (file: File) => Promise<FileUploadResponse>;
};

function StarterKit({
  id,
  value,
  style,
  onChange,
  readOnly,
  autoFocus,
  className,
  placeholder,
  media,
  selectionBoxRoot = false,
}: StarterKitProps) {
  const editor = useMemo(() => createYooptaEditor(), []);

  useEffect(() => {
    if (typeof onChange === 'function') {
      editor.on('change', onChange);
      return () => {
        editor.off('change', onChange);
      };
    }
  }, [editor]);

  return (
    <YooptaEditor
      key={id}
      id={id}
      selectionBoxRoot={selectionBoxRoot}
      editor={editor}
      plugins={getPlugins({ media })}
      tools={TOOLS}
      marks={MARKS}
      value={value}
      readOnly={readOnly}
      autoFocus={autoFocus}
      className={className}
      style={style}
      placeholder={placeholder}
    />
  );
}

export { StarterKit };
