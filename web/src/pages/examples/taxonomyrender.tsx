import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';
import YooptaEditor from '@yoopta/editor';

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

const DATA_FROM_SERVER = [
  {
    id: 'C4S5RBOJyWxmJLvFNsXK9',
    type: 'heading-one',
    children: [
      {
        text: 'Style Guide',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'bIb5nORwNLu9fUzb5cLDW',
    type: 'heading-three',
    nodeType: 'block',
    children: [
      {
        text: 'Testing the MDX style guide with Tailwind Typography\n',
      },
    ],
  },
  {
    id: 'mYGKyLEKQ7W42ZmOuIfpW',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.',
      },
    ],
  },
  {
    id: 'hmOL_DW8clJZz3pOWYQse',
    type: 'paragraph',
    children: [
      {
        text: 'By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you really are just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'M3n401rVW5FoARxfSb8W3',
    type: 'paragraph',
    children: [
      {
        text: 'We get lots of complaints about it actually, with people regularly asking us things like:',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'wNXcP6kcAaYA0ApsdKPM2',
    type: 'paragraph',
    children: [
      {
        text: 'The ',
      },
      {
        text: '@tailwindcss/typography',
        code: true,
      },
      {
        text: ' plugin is our attempt to give you what you actually want, without any of the downsides of doing something stupid like disabling our base styles.',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'Ri1vV3_vyBENNg8a2Ke6d',
    type: 'paragraph',
    children: [
      {
        text: 'It adds a new ',
      },
      {
        text: 'prose',
        code: true,
      },
      {
        text: ' class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:',
      },
    ],
    nodeType: 'block',
  },
  // {
  //   id: 'wReLng8HWW9T3NGnYwDya',
  //   type: 'code',
  //   children: [
  //     {
  //       id: 'bXN76m0ScxJGz1fIa-KzG',
  //       type: 'code-line',
  //       nodeType: 'block',
  //       children: [
  //         {
  //           text: '<article class="prose">',
  //         },
  //       ],
  //       data: {
  //         skipSettings: true,
  //         skipDrag: true,
  //       },
  //     },
  //     {
  //       id: 'mKFrS29qhVbtmHBtQIyE6',
  //       type: 'code-line',
  //       nodeType: 'block',
  //       data: {
  //         skipSettings: true,
  //         skipDrag: true,
  //       },
  //       children: [
  //         {
  //           text: '  <h1>Garlic bread with cheese: What the science tells us</h1>            <p>For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.    </p><p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'Qxg51_8aJqGA3B2D9icqG',
  //       type: 'code-line',
  //       nodeType: 'block',
  //       data: {
  //         skipSettings: true,
  //         skipDrag: true,
  //       },
  //       children: [
  //         {
  //           text: '</article>',
  //         },
  //       ],
  //     },
  //   ],
  //   nodeType: 'block',
  //   data: {
  //     language: 'html',
  //   },
  // },
  {
    id: '5sxXkQoqLHmSywkDY4Vnw',
    type: 'paragraph',
    children: [
      {
        text: 'For more information about how to use the plugin and the features it includes, ',
      },
      {
        id: 'L5qKbeUJm62HbAx68IAj8',
        type: 'link',
        children: [
          {
            text: 'read the documentation',
          },
        ],
        nodeType: 'inline',
        data: {
          url: 'https://github.com/tailwindcss/typography/blob/master/README.md',
          skipDrag: true,
        },
      },
      {
        text: '.',
      },
    ],
    nodeType: 'block',
  },
  {
    id: '8a46xs2TDD6wanNwthhzt',
    type: 'heading-three',
    nodeType: 'block',
    children: [
      {
        text: 'What to expect from here on out',
      },
    ],
  },
  {
    id: '8CTw-l75q4aeBz2NvGDD0',
    type: 'paragraph',
    children: [
      {
        text: "What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like bold text, unordered lists, ordered lists, code blocks, block quotes, and even italics.",
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'du1ovg5Roc_hcMKGNcIT9',
    type: 'paragraph',
    children: [
      {
        text: "It's important to cover all of these use cases for a few reasons:",
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'sTtJ36cBjriwMMNew2PDj',
    type: 'numbered-list',
    children: [
      {
        id: 'ut9l5uhQTCnESn3U2wIAr',
        type: 'list-item',
        children: [
          {
            text: 'We want everything to look good out of the box.',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'rl0bAHuzO0HxihGtJpQjC',
        type: 'list-item',
        children: [
          {
            text: "Really just the first reason, that's the whole point of the plugin.",
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'Pfu0fZ-z-LQsDqSWtwkUr',
        type: 'list-item',
        children: [
          {
            text: "Here's a third pretend reason though a list with three items looks more realistic than a list with two items.",
          },
        ],
        nodeType: 'block',
      },
    ],
    nodeType: 'block',
    data: {
      depth: 1,
      skipDrag: true,
      skipSettings: true,
    },
  },
  {
    id: '5Il_KkrW_VXYoiodJDpeB',
    type: 'paragraph',
    children: [
      {
        text: "Now we're going to try out another header style.",
      },
    ],
    nodeType: 'block',
  },
  {
    id: '8Il63aEf59yRP-CMajyep',
    type: 'heading-three',
    children: [
      {
        text: 'Typography should be easy',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'sgr5lrEC_5-f14Xr-rkuv',
    type: 'paragraph',
    children: [
      {
        text: "So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.",
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'x0tlVZYaMX5wO8340q72V',
    type: 'paragraph',
    children: [
      {
        text: 'Something a wise person once told me about typography is:',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'Kr5arIxA5tCLT3JzyeP8S',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: '',
      },
    ],
  },
];

const inter = Inter({ subsets: ['latin'] });

const plugins = [
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Paragraph,
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
