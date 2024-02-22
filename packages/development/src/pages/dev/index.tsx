import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Callout from '@yoopta/callout';
import Headings from '@yoopta/headings';
import Mention from '@yoopta/mention';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
import { useMemo } from 'react';

const plugins = [
  Paragraph,
  Headings.HeadingOne,
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Image,
  Video,
  Mention,
  Link,
];

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('editorData', editorData);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          // editor.moveBlock('callout_4', [1]);

          console.log('from component editor', editor.selection);

          editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
        }}
      >
        Highlight text
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          editor.blocks.ImagePlugin.apply({});
        }}
      >
        Add Image
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onSubmit}>
        Get editor data
      </button>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        className="w-[650px] pt-14 pb-20 mx-auto"
        // onChange={(val) => console.log('on change prop value', val)}
        // placeholder="Type / to open menu"
      />
    </div>
  );
};

export default BasicExample;
