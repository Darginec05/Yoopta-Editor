import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '0bc289cf-4c30-4e64-8a0f-9624b92855aa': {
      id: '0bc289cf-4c30-4e64-8a0f-9624b92855aa',
      value: [
        {
          id: '30d66b1f-0b4a-4ed5-8926-c9d77c04aa85',
          type: 'heading-one',
          children: [
            {
              text: 'Example with full setup of Yoopta-Editor',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingOne',
      meta: {
        order: 0,
        depth: 0,
        align: 'left',
      },
    },
    '95a0a62e-c238-463d-a34f-596920411caf': {
      id: '95a0a62e-c238-463d-a34f-596920411caf',
      value: [
        {
          id: 'fc9cfde3-0c69-4eb4-b8de-30edc5f41566',
          type: 'callout',
          children: [
            {
              text: 'This example shows you full setup with all features of Yoopta-Editor',
            },
          ],
          props: {
            theme: 'info',
          },
        },
      ],
      type: 'Callout',
      meta: {
        order: 1,
        depth: 0,
        align: 'left',
      },
    },
    '17e030e9-9d36-47e7-a449-7d27a18aad42': {
      id: '17e030e9-9d36-47e7-a449-7d27a18aad42',
      value: [
        {
          id: '5a237b3c-fd27-4f3a-befa-ef033b5ef671',
          type: 'blockquote',
          children: [
            {
              bold: true,
              text: '- Our life is what our thoughts make it',
            },
            {
              text: ' (c) Marcus Aurelius',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Blockquote',
      meta: {
        order: 2,
        depth: 0,
        align: 'left',
      },
    },
    '76d2fad5-1f82-496b-876b-bcae1c71e683': {
      id: '76d2fad5-1f82-496b-876b-bcae1c71e683',
      value: [
        {
          id: '8306026a-30f3-4f6c-9b0b-5725d68a83d4',
          type: 'heading-two',
          children: [
            {
              text: 'Features',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 4,
        depth: 0,
        align: 'left',
      },
    },
    'ab3e2708-041c-415d-bdd6-8170dbd17d8e': {
      id: 'ab3e2708-041c-415d-bdd6-8170dbd17d8e',
      value: [
        {
          children: [
            {
              text: '// pass props to main component and that all\nfunction YouThinkThisIsJoke() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins}\n        tools={TOOLS}\n        marks={MARKS}\n      />\n    </div>\n  );\n}',
            },
          ],
          type: 'code',
          id: '3df803c3-1b71-4f22-959d-a57c612e3e60',
          props: {
            language: 'javascript',
            theme: 'VSCode',
            nodeType: 'void',
          },
        },
      ],
      type: 'Code',
      meta: {
        order: 7,
        depth: 1,
        align: 'left',
      },
    },
    '19792190-bead-4aba-b23d-3f17c42425f5': {
      id: '19792190-bead-4aba-b23d-3f17c42425f5',
      value: [
        {
          id: '2ee64ba4-52e2-47d8-a962-542659f120a3',
          type: 'bulleted-list',
          children: [
            {
              text: 'Many typical solved problems in UX behavior.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 8,
        depth: 0,
      },
    },
    '6bebe0de-b9a7-4d01-aec7-1244d1ff1bd7': {
      id: '6bebe0de-b9a7-4d01-aec7-1244d1ff1bd7',
      value: [
        {
          id: 'e3b29257-4062-4f66-ba5f-e0e9710c73a3',
          type: 'bulleted-list',
          children: [
            {
              text: 'Media plugins on steroids with optimization and lazy loadings',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 9,
        depth: 0,
      },
    },
    '8c58fb2f-c8b9-4c52-8656-a06c4d23648c': {
      id: '8c58fb2f-c8b9-4c52-8656-a06c4d23648c',
      value: [
        {
          id: '84995a3f-8139-4497-b740-9a41ef4da929',
          type: 'bulleted-list',
          children: [
            {
              text: 'Code plugin on steroids with themes and languages',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 10,
        depth: 0,
      },
    },
    '7317f471-c58e-40c2-a54e-63a7163e826f': {
      id: '7317f471-c58e-40c2-a54e-63a7163e826f',
      value: [
        {
          id: '521680e4-3174-49ed-b6e7-8ce9698aad5a',
          type: 'bulleted-list',
          children: [
            {
              text: 'Each plugin can be easily customized and extensible',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 11,
        depth: 0,
      },
    },
    '1fe5dac8-b405-4d7d-82b2-075b0cbb546c': {
      id: '1fe5dac8-b405-4d7d-82b2-075b0cbb546c',
      value: [
        {
          id: '4384f636-a306-47a3-bfeb-5a788a4c8773',
          type: 'bulleted-list',
          children: [
            {
              text: 'Drag and drop, nested dnd is supported also',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 12,
        depth: 0,
      },
    },
    '65fe1bce-67cd-4a47-92fc-ece2b5679e7f': {
      id: '65fe1bce-67cd-4a47-92fc-ece2b5679e7f',
      value: [
        {
          id: 'e3fdf9b2-92fd-4516-bcf7-41eccd8c5bbf',
          type: 'bulleted-list',
          children: [
            {
              text: 'Selection box for manipulating with multiple blocks at once',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 13,
        depth: 0,
      },
    },
    '204728e6-fb90-44f3-a005-8d6b4a7595dd': {
      id: '204728e6-fb90-44f3-a005-8d6b4a7595dd',
      value: [
        {
          id: '78fd66f3-2e67-477d-9549-3a2bfebcffd6',
          type: 'bulleted-list',
          children: [
            {
              text: 'You can create your own plugin',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 14,
        depth: 0,
      },
    },
    'ff34d02f-ef41-44ff-81b8-2856a6636206': {
      id: 'ff34d02f-ef41-44ff-81b8-2856a6636206',
      value: [
        {
          id: '4320a425-dcd5-4aa7-b10f-4bed187ab590',
          type: 'bulleted-list',
          children: [
            {
              text: 'A list of useful tools (ActionMenu, Toolbar etc.) for the convenience of working with the editor',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 15,
        depth: 0,
      },
    },
    '6dbf1528-196b-4586-9c16-27a89587e912': {
      id: '6dbf1528-196b-4586-9c16-27a89587e912',
      value: [
        {
          id: '97f08ef0-a2cf-4aac-91f4-221ade5a0e76',
          type: 'bulleted-list',
          children: [
            {
              text: 'Automatic lazy loading for media components (eg. embeds)',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 16,
        depth: 0,
      },
    },
    '8fbecb08-fb35-4dbc-83fd-2e05050bcb14': {
      id: '8fbecb08-fb35-4dbc-83fd-2e05050bcb14',
      value: [
        {
          id: 'd3e5f526-57a1-40c2-a10d-9439f6127b27',
          type: 'bulleted-list',
          children: [
            {
              text: 'Large documents ',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 17,
        depth: 0,
      },
    },
    '9d678c71-ea19-482d-8baa-8129df859d9b': {
      id: '9d678c71-ea19-482d-8baa-8129df859d9b',
      value: [
        {
          id: '1637413e-6ec2-46a0-aac1-8fcdeb8dbeba',
          type: 'bulleted-list',
          children: [
            {
              text: 'A completely rewritten architecture to increase perfomance',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 18,
        depth: 0,
      },
    },
    'd0005323-10ae-4447-a1f2-ee5b1b81d60d': {
      id: 'd0005323-10ae-4447-a1f2-ee5b1b81d60d',
      value: [
        {
          id: 'd549b714-134f-4042-8963-67ecfc7d7279',
          type: 'bulleted-list',
          children: [
            {
              text: 'Mobile friendly',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 19,
        depth: 0,
      },
    },
    '68cc6a0e-4ed4-4ecb-b63e-81bb96a81ae6': {
      id: '68cc6a0e-4ed4-4ecb-b63e-81bb96a81ae6',
      value: [
        {
          id: '12b34cb5-fd6d-4b76-a026-59bb0ea491a3',
          type: 'bulleted-list',
          children: [
            {
              text: 'Indent and outdent for every plugin by tabs and shift+tabs',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 20,
        depth: 0,
      },
    },
    '8c40c50e-dcc8-4a0e-b786-4bfdd72bdcaf': {
      id: '8c40c50e-dcc8-4a0e-b786-4bfdd72bdcaf',
      value: [
        {
          id: '8a00e919-4d53-4dc7-a189-06feb9138908',
          type: 'bulleted-list',
          children: [
            {
              text: 'Get editor instance to programmatically control your content',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 21,
        depth: 0,
      },
    },
    'ded517c0-653a-43c3-9f28-f6c7b2ec7802': {
      id: 'ded517c0-653a-43c3-9f28-f6c7b2ec7802',
      value: [
        {
          id: '9916d5d7-663c-42a9-a01c-123a80a3577f',
          type: 'bulleted-list',
          children: [
            {
              text: 'Editor events for saving to DB in real-time',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 22,
        depth: 0,
      },
    },
    '891615d8-fc8e-4862-a20b-b2105651077e': {
      id: '891615d8-fc8e-4862-a20b-b2105651077e',
      value: [
        {
          id: '8efc8a0b-e893-43d0-aeec-e08e8ba1711d',
          type: 'bulleted-list',
          children: [
            {
              text: 'Exports in markdown, plain text, html',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 23,
        depth: 0,
      },
    },
    '75e29238-fca4-485e-a134-0606c66080df': {
      id: '75e29238-fca4-485e-a134-0606c66080df',
      value: [
        {
          id: '028fd563-6b94-43dc-a960-9908fa435e0c',
          type: 'bulleted-list',
          children: [
            {
              text: 'Redo/undo changes - [not stable, in progress]',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 24,
        depth: 0,
      },
    },
    '2e0151ff-0469-4dbf-b134-e97671e9d816': {
      id: '2e0151ff-0469-4dbf-b134-e97671e9d816',
      value: [
        {
          id: 'b602f807-9fff-42e3-94f5-a530dbb176f8',
          type: 'bulleted-list',
          children: [
            {
              text: 'Shortcuts, hotkeys. And customization for this!',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 25,
        depth: 0,
      },
    },
    'cfbf3b1c-c409-4949-b7f6-720230f6851a': {
      id: 'cfbf3b1c-c409-4949-b7f6-720230f6851a',
      value: [
        {
          id: 'd1aa57f4-1608-4d5f-b101-f1f743399754',
          type: 'bulleted-list',
          children: [
            {
              text: 'Everything is customizable for custom renders ',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 26,
        depth: 0,
      },
    },
    '8e14d7d1-f5bd-45f0-aee9-ef358b51cd4f': {
      id: '8e14d7d1-f5bd-45f0-aee9-ef358b51cd4f',
      value: [
        {
          id: 'b99b7926-33ec-4359-96f6-7892a8c175e1',
          type: 'bulleted-list',
          children: [
            {
              text: 'The soul invested in the development of this editor 💙',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 27,
        depth: 0,
      },
    },
    'b95f2fa4-5be4-42a3-aac8-f296824838dd': {
      id: 'b95f2fa4-5be4-42a3-aac8-f296824838dd',
      value: [
        {
          id: '6dc29aa3-d519-43b3-81ae-881d0781f3a4',
          type: 'bulleted-list',
          children: [
            {
              text: '... and other features that I forgot to write about in this list 😅. Just check it!',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 28,
        depth: 0,
      },
    },
    'db392c70-600e-4b8e-997e-122e033cb4f8': {
      id: 'db392c70-600e-4b8e-997e-122e033cb4f8',
      value: [
        {
          id: '7eca3c9a-d7c4-4e84-ad3c-1e892ec2493c',
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 29,
        depth: 0,
        align: 'left',
      },
    },
    '5f240f96-71f0-411b-8c92-ed2f7e2578ce': {
      id: '5f240f96-71f0-411b-8c92-ed2f7e2578ce',
      value: [
        {
          id: '00a99275-5b0d-4602-985c-fd9e56d3fa4a',
          type: 'heading-two',
          children: [
            {
              text: 'Roadmap',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 30,
        depth: 0,
        align: 'left',
      },
    },
    '5e54ccbd-fb0f-42a1-9314-18cd19cd2e5e': {
      id: '5e54ccbd-fb0f-42a1-9314-18cd19cd2e5e',
      value: [
        {
          id: '3592cf32-7501-456e-bad5-f88587bcb989',
          type: 'bulleted-list',
          children: [
            {
              text: 'Develop other powerful plugins',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 31,
        depth: 0,
      },
    },
    '03418ce6-8c7e-44a1-ba27-f9ecb9878b8f': {
      id: '03418ce6-8c7e-44a1-ba27-f9ecb9878b8f',
      value: [
        {
          id: 'd2027993-5fec-4379-947d-b1cc37cee041',
          type: 'bulleted-list',
          children: [
            {
              text: 'Super AI tools not for HYPE, but for real useful work with editor content',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 32,
        depth: 0,
      },
    },
    'fabf0007-c180-4300-aa64-950447c729e9': {
      id: 'fabf0007-c180-4300-aa64-950447c729e9',
      value: [
        {
          id: '54bd0feb-a0f9-46d4-bec9-e3f63f6dbd12',
          type: 'bulleted-list',
          children: [
            {
              text: 'Simplify API for creating plugins',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 33,
        depth: 0,
      },
    },
    'c8b0b040-741a-49c9-bd30-ea4086bf9073': {
      id: 'c8b0b040-741a-49c9-bd30-ea4086bf9073',
      value: [
        {
          id: '52a4a76b-2637-4ecb-9657-b845e3237f6c',
          type: 'bulleted-list',
          children: [
            {
              text: 'Collabrative mode',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 34,
        depth: 0,
      },
    },
    'f342c21a-a535-4286-aa4d-b98bf6cf525d': {
      id: 'f342c21a-a535-4286-aa4d-b98bf6cf525d',
      value: [
        {
          id: 'fcf0ca40-043a-4d72-b7da-38a93eed18bb',
          type: 'bulleted-list',
          children: [
            {
              text: 'Plugin system',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 35,
        depth: 0,
      },
    },
    '2bb703b7-b6f5-49f0-a654-3b2e710907c5': {
      id: '2bb703b7-b6f5-49f0-a654-3b2e710907c5',
      value: [
        {
          id: '148c3499-4f4c-4312-8128-bb9d06f75ff9',
          type: 'bulleted-list',
          children: [
            {
              text: 'Optimizations for media components (srcSet for image and sources for video)',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 36,
        depth: 0,
      },
    },
    '808efc9a-76b2-4278-aaa4-d0bfd225eb3c': {
      id: '808efc9a-76b2-4278-aaa4-d0bfd225eb3c',
      value: [
        {
          id: 'f6d091bc-8d8f-4b00-8fa5-0d9641708446',
          type: 'bulleted-list',
          children: [
            {
              text: 'Rethink approach for just rendering to increase SEO perfomance',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 37,
        depth: 0,
      },
    },
    '4854f6d1-f47c-4eed-b090-53cc9f85ea99': {
      id: '4854f6d1-f47c-4eed-b090-53cc9f85ea99',
      value: [
        {
          id: '28b6f3de-a155-441b-8e8f-ed58938dc0d7',
          type: 'bulleted-list',
          children: [
            {
              text: 'Continue improving the project. We are listening to you and your requests 💙',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 38,
        depth: 0,
      },
    },
    'd2b76249-5bda-4865-985f-1ade032f2898': {
      id: 'd2b76249-5bda-4865-985f-1ade032f2898',
      value: [
        {
          id: '8aad1e70-a679-4178-ad9f-77fd8a3a9f8c',
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 39,
        depth: 0,
        align: 'left',
      },
    },
    'd1c91cf1-d14e-4692-857a-bd0bf96bd4b2': {
      id: 'd1c91cf1-d14e-4692-857a-bd0bf96bd4b2',
      value: [
        {
          id: '697487f2-6ddb-4d19-b1c2-890586ad0a98',
          type: 'heading-three',
          children: [
            {
              text: 'Do you like it? Please star ',
            },
            {
              id: 'b8b2a602-9443-4245-95b7-98daef75f9a0',
              type: 'link',
              props: {
                url: 'https://github.com/Darginec05/Yoopta-Editor',
                target: '_blank',
                rel: 'noreferrer',
                title: 'our repo in Github',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'our repo in Github',
                },
              ],
            },
            {
              text: ' ',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 40,
        depth: 0,
        align: 'left',
      },
    },
    '23305389-86e3-44ca-aea5-2a999af4d5e2': {
      id: '23305389-86e3-44ca-aea5-2a999af4d5e2',
      value: [
        {
          id: '9ad36877-c990-45b7-8d7b-0e4410ad6365',
          type: 'image',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'void',
            src: 'https://res.cloudinary.com/ench-app/image/upload/v1713028758/Cheems_doge_fx8yvq.jpg',
            alt: 'cloudinary',
            srcSet: '',
            fit: 'contain',
            sizes: {
              width: 334,
              height: 368,
            },
          },
        },
      ],
      type: 'Image',
      meta: {
        order: 3,
        depth: 0,
        align: 'center',
      },
    },
    '974c46f1-2f7f-4000-9403-44c4b7b820f0': {
      id: '974c46f1-2f7f-4000-9403-44c4b7b820f0',
      value: [
        {
          id: 'b771b00a-e851-41a5-82c2-d5c03286ee25',
          type: 'heading-three',
          children: [
            {
              text: 'Any bugs or did we miss something? Just ',
            },
            {
              id: '59a6f9fb-6ff7-4278-a919-e5bac4344355',
              type: 'link',
              props: {
                url: 'https://github.com/Darginec05/Yoopta-Editor/issues',
                target: '_blank',
                rel: 'noreferrer',
                title: 'issue in repo!',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'issue in repo!',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 41,
        depth: 0,
        align: 'left',
      },
    },
    '8805bc76-e048-4155-9188-70441abef479': {
      id: '8805bc76-e048-4155-9188-70441abef479',
      value: [
        {
          id: '65b45ebc-ea8c-456c-91ac-f97d623cbbee',
          type: 'image',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'void',
            src: 'https://res.cloudinary.com/ench-app/image/upload/v1713029072/ImageTransformer_hlr9eo.jpg',
            alt: 'cloudinary',
            srcSet: '',
            fit: 'contain',
            sizes: {
              width: 448,
              height: 379,
            },
          },
        },
      ],
      type: 'Image',
      meta: {
        order: 42,
        depth: 0,
        align: 'center',
      },
    },
    'b2b21105-817c-4ce6-899c-a88e5f2c7eee': {
      id: 'b2b21105-817c-4ce6-899c-a88e5f2c7eee',
      value: [
        {
          id: '098fc395-2b00-454e-9065-b4bccb4a6f09',
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 43,
        depth: 0,
        align: 'left',
      },
    },
    'd75f9434-2a7b-47d8-970f-f6683267db0c': {
      id: 'd75f9434-2a7b-47d8-970f-f6683267db0c',
      value: [
        {
          id: 'aa4c19cc-cfe4-4677-88ab-880061de8832',
          type: 'heading-two',
          children: [
            {
              text: 'Currently known issues',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 44,
        depth: 0,
        align: 'left',
      },
    },
    '90ca79ba-96cf-43c8-b1e3-1244b0ea9035': {
      id: '90ca79ba-96cf-43c8-b1e3-1244b0ea9035',
      value: [
        {
          id: 'c116f93e-1ade-4d8f-b3c2-13135e6d44ee',
          type: 'bulleted-list',
          children: [
            {
              text: 'Redo/undo between blocks',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 45,
        depth: 0,
      },
    },
    'c0073c19-12f9-4fc0-8609-d527713b8b4d': {
      id: 'c0073c19-12f9-4fc0-8609-d527713b8b4d',
      value: [
        {
          id: '042391c8-bdc1-4f1f-9b21-587e412b2f3c',
          type: 'bulleted-list',
          children: [
            {
              text: 'Selection between blocks',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 46,
        depth: 0,
      },
    },
    '92fe10cd-c50b-4627-aef9-64284ca8554a': {
      id: '92fe10cd-c50b-4627-aef9-64284ca8554a',
      value: [
        {
          id: '68cac266-91f1-465d-b6d0-0b6f7211fa6a',
          type: 'bulleted-list',
          children: [
            {
              text: 'Dragndrop with selected blocks',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 47,
        depth: 0,
      },
    },
    '89e974c3-5156-4f18-82b6-d7c7f496b902': {
      id: '89e974c3-5156-4f18-82b6-d7c7f496b902',
      value: [
        {
          id: '576c7277-6332-4387-8e73-a1d92de1962b',
          type: 'bulleted-list',
          children: [
            {
              text: 'Focusing blocks with custom editor',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 48,
        depth: 0,
      },
    },
    '430472f7-6118-4c2c-ac40-18d9cf9fb032': {
      id: '430472f7-6118-4c2c-ac40-18d9cf9fb032',
      value: [
        {
          id: '3e7513f2-c73c-4332-a96b-33d5e393cc86',
          type: 'bulleted-list',
          children: [
            {
              text: 'Tests',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 49,
        depth: 0,
      },
    },
    '0db20c45-af30-4fb9-906d-81785251d980': {
      id: '0db20c45-af30-4fb9-906d-81785251d980',
      value: [
        {
          id: 'e7a5034f-e4b0-4878-a418-3ab92f2eea02',
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 50,
        depth: 0,
        align: 'left',
      },
    },
    '2ba4d2f5-aab9-444e-9220-a1e11e59e81c': {
      id: '2ba4d2f5-aab9-444e-9220-a1e11e59e81c',
      value: [
        {
          id: '9c80423a-3944-4019-8e21-e55545175997',
          type: 'paragraph',
          children: [
            {
              text: '---',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 51,
        depth: 0,
        align: 'center',
      },
    },
    '87b3fe2d-c6e5-4f56-bf4c-9dde09def4e9': {
      id: '87b3fe2d-c6e5-4f56-bf4c-9dde09def4e9',
      value: [
        {
          id: '5b5a3b63-3ef5-4ce0-bae9-73cd1c02df79',
          type: 'heading-three',
          children: [
            {
              text: 'FAQs',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 52,
        depth: 0,
        align: 'center',
      },
    },
    'cec6cdf1-b407-4b03-9525-ee06fd2039e9': {
      id: 'cec6cdf1-b407-4b03-9525-ee06fd2039e9',
      value: [
        {
          id: 'e3c56d22-3c42-4e2a-9f75-92d8ebaedd68',
          type: 'accordion-list',
          children: [
            {
              id: '45f0bf81-8e75-4c2f-bdbf-ffcada08d25c',
              type: 'accordion-list-item',
              children: [
                {
                  id: '950fe94b-e468-485a-a429-b55763852d73',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'Is Yoopta-Editor free?',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: '1758fe80-79ee-47da-a3e8-fb3d07919e02',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: "Yes! Just install and relax, it's under MIT license",
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 53,
        depth: 0,
        align: 'center',
      },
    },
    '1f70fce5-fab5-40b5-82de-393ad3c0541c': {
      id: '1f70fce5-fab5-40b5-82de-393ad3c0541c',
      value: [
        {
          id: 'c4fc0618-abec-434a-8330-07b178dd72d6',
          type: 'accordion-list',
          children: [
            {
              id: 'cae928cb-cfec-4786-9f8f-2e63ea06d1d6',
              type: 'accordion-list-item',
              children: [
                {
                  id: '423c76ec-e5e9-4f26-b464-435b2db40a2b',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'Can I create custom plugins?',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: 'f4cbc05d-0878-45e9-a540-63e4efac3451',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'Yes, yes, and yes again. You will be able to create a custom plugin of any complexity',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 54,
        depth: 0,
        align: 'center',
      },
    },
    '56dca596-5b16-422e-8976-4e85b64e5f53': {
      id: '56dca596-5b16-422e-8976-4e85b64e5f53',
      value: [
        {
          id: 'f88bf1bb-3f89-4c68-9cb2-588ae3cf8b1e',
          type: 'accordion-list',
          children: [
            {
              id: '3dcccf7f-e61b-4362-94c6-022942b25012',
              type: 'accordion-list-item',
              children: [
                {
                  id: '193fdaca-c47a-4c8f-8c1d-edc389de5bde',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'What about AI?',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: '08905e7e-ef41-407e-a75e-214d1aede3f7',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: '1. We have plans to create AI text input for creating your custom plugins\n2. AI tools for helping you with your content\n3. AI tool which can help translate content\n4. ...and other super useful tools 😉',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 55,
        depth: 0,
        align: 'center',
      },
    },
    '9589e4eb-7bd7-4e1b-9f4c-d1c5cfc037d2': {
      id: '9589e4eb-7bd7-4e1b-9f4c-d1c5cfc037d2',
      value: [
        {
          id: 'da18d077-649a-455c-9c34-dc2dbfd52ae8',
          type: 'accordion-list',
          children: [
            {
              id: 'cff1c727-3762-485a-bcb0-b2a3990e3f7b',
              type: 'accordion-list-item',
              children: [
                {
                  id: 'c9f08cec-545d-4917-8d8d-7eb22a3bbd84',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'We need collaborative! Any news?',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: '036ca398-562f-472a-ad07-26120fadb027',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'Already in progress 😎',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 56,
        depth: 0,
        align: 'center',
      },
    },
    'd2e5dd22-ebf4-471b-b779-e469ffd9c253': {
      id: 'd2e5dd22-ebf4-471b-b779-e469ffd9c253',
      value: [
        {
          id: '77b1f9de-49cf-4e8f-a6a8-251662396b12',
          type: 'accordion-list',
          children: [
            {
              id: '1be99342-3435-46a4-86e4-d0fb1473b752',
              type: 'accordion-list-item',
              children: [
                {
                  id: 'c575c44f-a1e8-4753-9b36-c30de1148d99',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'How I can support project?',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: 'e5b9feb2-9aa1-4e39-8a14-e17a7ccac47c',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'Support us using  ❤️',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 57,
        depth: 0,
        align: 'center',
      },
    },
    'e8419702-fec3-4e0a-babf-a9c21d82e12b': {
      id: 'e8419702-fec3-4e0a-babf-a9c21d82e12b',
      value: [
        {
          id: 'bcc19609-6078-4341-a63a-5474c0d268ad',
          type: 'accordion-list',
          children: [
            {
              id: '9dc61d47-26a9-4760-bf55-7a1e25570894',
              type: 'accordion-list-item',
              children: [
                {
                  id: '70df6640-7ced-4be4-a0dd-a3d1d8fab8eb',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'What is best football club?',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: 'ddf98416-f1ce-4bc5-95df-823dfd8e6768',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'Chelsea FC 💙',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 58,
        depth: 0,
        align: 'center',
      },
    },
    'bd0759bb-c9fe-467d-b6c2-d2f3422e2fb7': {
      id: 'bd0759bb-c9fe-467d-b6c2-d2f3422e2fb7',
      value: [
        {
          id: '53b2dbb2-d439-4248-8a6a-453670c88dd3',
          type: 'paragraph',
          children: [
            {
              text: '---',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 59,
        depth: 0,
        align: 'center',
      },
    },
    '1c5c4b4a-0076-4c62-94ea-1ee007e0547f': {
      id: '1c5c4b4a-0076-4c62-94ea-1ee007e0547f',
      type: 'TodoList',
      meta: {
        order: 5,
        depth: 0,
      },
      value: [
        {
          id: '0706f793-e16e-4ce2-9c47-6716d92e6083',
          type: 'todo-list',
          children: [
            {
              text: 'Default list of powerful plugins',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    '1a7a2246-ebc7-4671-8aa9-cf9687fc8fb6': {
      id: '1a7a2246-ebc7-4671-8aa9-cf9687fc8fb6',
      type: 'TodoList',
      meta: {
        order: 6,
        depth: 0,
      },
      value: [
        {
          id: '166bd657-2b1e-4318-a592-3aac4d531a14',
          type: 'todo-list',
          children: [
            {
              text: 'Easy setup!',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
  });

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
  }, []);

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
    </div>
  );
};

export default BasicExample;
