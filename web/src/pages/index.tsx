import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';
import YooptaEditor, { RenderElementProps } from '@yoopta/editor';
import Paragraph, { ParagraphElement } from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Code from '@yoopta/code';
import Embed from '@yoopta/embed';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import ActionMenu from '@yoopta/action-menu-list';
// import Toolbar from '@yoopta/toolbar';

const inter = Inter({ subsets: ['latin'] });

const plugins = [
  Paragraph,
  // Blockquote,
  // HeadingOne,
  // HeadingTwo,
  // HeadingThree,
  // NumberedList,
  // BulletedList,
  // TodoList,
  // Code,
  // // Embed,
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
          offline
          autoFocus
        >
          {/* <Toolbar type="bubble" /> */}
          <ActionMenu />
        </YooptaEditor>
      </div>
    </main>
  );
}
