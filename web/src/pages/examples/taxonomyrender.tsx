import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';
import YooptaEditor, { YooptaBaseElement } from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import YoptaRenderer from '@yoopta/renderer';
import Blockquote from '@yoopta/blockquote';
import Code from '@yoopta/code';
import Embed from '@yoopta/embed';
import Video from '@yoopta/video';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

import ActionMenu from '@yoopta/action-menu-list';
// import Toolbar from '@yoopta/toolbar';

const DATA_FROM_SERVER: YooptaBaseElement<string>[] = [
  {
    id: 'VrPjveajVxZFdsls3_eio',
    type: 'heading-one',
    children: [
      {
        text: 'Style Guide',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'lNTqte__XplkztRBWCOSU',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.',
      },
    ],
  },
  {
    id: 'K7Dn37VWOImroOCCU6dqk',
    type: 'paragraph',
    children: [
      {
        text: 'By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you really are just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'NcyaXHjIXol2RNQOCa5Dr',
    type: 'paragraph',
    children: [
      {
        text: 'We get lots of complaints about it actually, with people regularly asking us things like:',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'eBsQhQdojyMHFF1XkSLcj',
    type: 'image',
    nodeType: 'void',
    children: [
      {
        text: '',
      },
    ],
    data: {
      url: 'https://res.cloudinary.com/ench-app/image/upload/v1683383160/Screen_Shot_2023-05-06_at_14.10.05_n3kxoo.png',
      size: {
        width: 650,
        height: 406,
      },
    },
  },
  {
    id: 'hfi40TMkvot2tAJ5ZOmf7',
    type: 'heading-two',
    children: [
      {
        text: 'What to expect from here on out',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'zxXJHE0QZL58fi2r4gmTr',
    type: 'paragraph',
    children: [
      {
        text: "What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like bold text, unordered lists, ordered lists, code blocks, block quotes, and even italics.",
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'qONT6A7r59wAKmWJlP5U5',
    type: 'paragraph',
    children: [
      {
        text: "It's important to cover all of these use cases for a few reasons:",
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'gu2GOflPgMF49oX9BXHHR',
    type: 'heading-three',
    children: [
      {
        text: 'Typography should be easy',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'H2i6bAM0FbwpmLFFZqw7o',
    type: 'paragraph',
    children: [
      {
        text: "So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.",
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'aRnB8mMOYnjmk3ZOM6nr_',
    type: 'paragraph',
    children: [
      {
        text: 'Something a wise person once told me about typography is:',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'vZAqPU-tolM0TnfURLMTx',
    type: 'embed',
    nodeType: 'void',
    children: [
      {
        text: '',
      },
    ],
    data: {
      url: 'https://www.youtube.com/watch?v=MuRaX2K6KrQ&t=4600s&ab_channel=%D0%A5%D0%B8%D1%82%D0%9D%D0%BE%D0%BD-%D0%A1%D1%82%D0%BE%D0%BF',
      size: {
        width: 'auto',
        height: 'auto',
      },
      providerId: 'MuRaX2K6KrQ',
      provider: 'youtube',
    },
  },
];

const inter = Inter({ subsets: ['latin'] });

const plugins = [
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'text-white',
      },
    },
  }),
  Blockquote,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Embed,
  Callout,
  Video,
  Link,
];

const marks = [Bold, Italic, CodeMark, Underline, Strike];

export default function Home() {
  return (
    <main
      style={{ backgroundColor: 'hsl(224 71% 4%)', color: 'white' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full h-full">
        <YoptaRenderer data={DATA_FROM_SERVER} plugins={plugins} marks={marks} />
      </div>
    </main>
  );
}
