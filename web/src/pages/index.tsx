import YooptaEditor, { RenderElementProps } from '@yoopta/editor';
import Paragraph, { ParagraphElement } from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

const inter = Inter({ subsets: ['latin'] });

const MyCustomParagraph = (props: RenderElementProps<ParagraphElement>) => {
  const { children, attributes } = props;

  return (
    <p draggable={false} style={{ fontSize: 18, color: 'green' }} {...attributes}>
      {children}
    </p>
  );
};

const plugins = [
  Paragraph.extend({
    shortcut: 'text',
    renderer: () => MyCustomParagraph,
  }),
  Blockquote,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  NumberedList,
  BulletedList,
  TodoList,
];

const marks = [Bold, Italic, CodeMark, Underline, Strike];

export default function Home() {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  return (
    <main className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="w-full h-full">
        <YooptaEditor
          value={editorValue}
          onChange={(val: Descendant[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          autoFocus
        />
      </div>
    </main>
  );
}
