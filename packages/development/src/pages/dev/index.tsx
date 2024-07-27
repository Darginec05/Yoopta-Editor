import YooptaEditor, {
  Blocks,
  createYooptaEditor,
  Elements,
  useYooptaEditor,
  useYooptaFocused,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
} from '@yoopta/editor';
import YooptaStarterKit from '@yoopta/starter-kit';
import { html } from '@yoopta/exports';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>();

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
  }, []);

  console.log(value);

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={YOOPTA_PLUGINS}
        selectionBoxRoot={selectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        style={{ width: 750 }}
        value={value}
      />

      {/* <YooptaStarterKit
        id="starter-kit"
        value={value}
        onChange={(data) => setValue(data)}
        style={{ width: 650 }}
        selectionBoxRoot={selectionRef}
        placeholder="Start typing here..."
        media={{
          imageUpload: async (file: File) => {
            const data = await uploadToCloudinary(file, 'image');

            return {
              src: data.secure_url,
              alt: 'cloudinary',
              sizes: {
                width: data.width,
                height: data.height,
              },
            };
          },
          fileUpload: async (file: File) => {
            const response = await uploadToCloudinary(file, 'auto');
            return { src: response.url, name: response.name };
          },
          videoUpload: async (file: File) => {
            const data = await uploadToCloudinary(file, 'video');
            return {
              src: data.secure_url,
              alt: 'cloudinary',
              sizes: {
                width: data.width,
                height: data.height,
              },
            };
          },
        }}
      /> */}
    </div>
  );
};

export default BasicExample;
