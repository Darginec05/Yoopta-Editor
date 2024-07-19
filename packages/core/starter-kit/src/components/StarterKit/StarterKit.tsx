import { CSSProperties, useEffect, useMemo, useRef } from 'react';
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
  style?: CSSProperties;
  selectionRef?: React.RefObject<HTMLDivElement> | false;
  mediaUploadsFn?: MediaUploadsFn;
};

export type MediaUploadsFn = {
  image?: (file: File) => Promise<ImageUploadResponse>;
  video?: (file: File) => Promise<VideoUploadResponse>;
  file?: (file: File) => Promise<FileUploadResponse>;
};

function StarterKit({
  id,
  value,
  style,
  onChange,
  readOnly,
  autoFocus,
  className,
  mediaUploadsFn,
  selectionRef = false,
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
      selectionBoxRoot={selectionRef}
      editor={editor}
      plugins={getPlugins({ mediaUploadsFn })}
      tools={TOOLS}
      marks={MARKS}
      value={value}
      readOnly={readOnly}
      autoFocus={autoFocus}
      className={className}
      style={style}
    />
  );
}

export { StarterKit };
