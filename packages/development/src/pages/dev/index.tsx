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
import { useEffect, useMemo, useRef } from 'react';

const plugins = [
  Paragraph,
  Headings.HeadingOne,
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Lists.BulletedList,
  Lists.NumberedList,
  Lists.TodoList,
  Table,
  Image,
  Video,
  Mention,
  Link,
];

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rootRef = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('editorData', editorData);
  };

  useEffect(() => {
    editor.on?.('insertBlock', (e) => {});
    editor.on?.('insertBlock', (e) => {});
  }, []);

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10" ref={rootRef}>
      <div className="flex mb-10">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            console.log('selection', editor.selection);

            editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
          }}
        >
          Highlight text
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        className="w-[650px] pb-20 mx-auto"
        selectionBoxRoot={rootRef}
        // onChange={(val) => console.log('on change prop value', val)}
        // placeholder="Type / to open menu"
      />
    </div>
  );
};

export default BasicExample;
