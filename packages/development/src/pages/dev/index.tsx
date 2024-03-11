import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Callout from '@yoopta/callout';
import Headings from '@yoopta/headings';
import Lists from '@yoopta/lists';
import Mention from '@yoopta/mention';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
import Table from '@yoopta/table';
import Embed from '@yoopta/embed';
import { Bold, Italic, Highlight, CodeMark, Strike, Underline } from '@yoopta/marks';
import Code from '@yoopta/code';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

const plugins = [
  Paragraph,
  Code,
  Image.extend({
    deviceSizes: [768, 1024, 1200],
    onUpload: async (file: File) => {
      const data = await uploadToCloudinary(file);
      console.log('on load data', data);

      return {
        src: data.secure_url,
        alt: 'cloudinary',
        // bgColor: 'rgb(176, 171, 250)',
        sizes: {
          width: data.width,
          height: data.height,
        },
      };
    },
  }),
  Headings.HeadingOne,
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Lists.BulletedList,
  Lists.NumberedList,
  Lists.TodoList,
  Table,
  Embed,
  Video.extend({
    deviceSizes: [768, 1024, 1200],
    onUpload: async (file: File) => {
      const data = await uploadToCloudinary(file, 'video');
      return {
        src: data.secure_url,
        alt: 'cloudinary',
        bgColor: 'rgb(176, 171, 250)',
        sizes: {
          width: data.width,
          height: data.height,
        },
      };
    },
  }),
  Mention,
  Link,
];

const MARKS = [Bold, Italic, Highlight, CodeMark, Strike, Underline];

const NoSSR = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return children;
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rootRef = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10" ref={rootRef}>
      <div className="flex mb-10">
        <button
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md"
          onClick={() => {
            editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
          }}
        >
          Highlight text
        </button>
        <button
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md"
          onClick={() => {
            editor.blocks.Image.create();
          }}
        >
          Add Image
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onSubmit}>
          Get editor data
        </button>
      </div>
      <NoSSR>
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          className="w-[650px] pb-20 mx-auto"
          selectionBoxRoot={rootRef}
          marks={MARKS}
          // onChange={(val) => console.log('on change prop value', val)}
          // placeholder="Type / to open menu"
        />
      </NoSSR>
    </div>
  );
};

export default BasicExample;
