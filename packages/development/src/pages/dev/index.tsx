import YooptaEditor, { createYooptaEditor, TextFormats } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Callout from '@yoopta/callout';
import Headings from '@yoopta/headings';
import { useMemo } from 'react';

const plugins = [Paragraph, Blockquote, Callout, Headings.HeadingOne, Headings.HeadingTwo, Headings.HeadingThree];

const BasicExample = () => {
  const editor = useMemo(() => createYooptaEditor(), []);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          // editor.moveBlock('callout_4', [1]);

          TextFormats.update(editor, 'highlight', {
            backgroundImage: 'linear-gradient(90deg, rgb(97, 229, 255) 0%, rgb(255, 112, 245) 100%)',
            color: 'rgb(176, 171, 250)',
          });
        }}
      >
        Move node
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
