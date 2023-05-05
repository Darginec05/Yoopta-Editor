import Image from 'next/image';
import YooptaEditor from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <YooptaEditor
        value={editorValue}
        onChange={(data) => setEditorValue(data)}
        plugins={[Paragraph, Blockquote]}
        placeholder="Start typing..."
        marks={marks}
        autoFocus={false}
      />
    </main>
  );
}
