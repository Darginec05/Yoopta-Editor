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
    '638ffe25-a95e-48ac-bcf6-fde5399d5576': {
      id: '638ffe25-a95e-48ac-bcf6-fde5399d5576',
      value: [
        {
          id: '52d4055c-15e4-4d52-8ac6-3f6e3cc3e7b4',
          type: 'heading-three',
          children: [
            {
              text: 'Is this a unique feature?',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    '5aaeced3-fe60-4120-92c9-cf4ed7623dd9': {
      id: '5aaeced3-fe60-4120-92c9-cf4ed7623dd9',
      value: [
        {
          id: 'daf8c1ac-f995-4f2f-ac89-5d5a270d02ee',
          type: 'bulleted-list',
          children: [
            {
              text: ' I have checked "open" AND "closed" issues and ',
            },
            {
              type: 'link',
              children: [
                {
                  text: 'this is not a duplicate',
                },
              ],
              props: {
                url: 'https://docs.yjs.dev/api/about-awareness',
                target: '_self',
                rel: 'noopener noreferrer',
              },
            },
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 1,
        depth: 0,
      },
    },
    'bd948ac4-1c0e-41ac-992e-f9af9ed58e4c': {
      id: 'bd948ac4-1c0e-41ac-992e-f9af9ed58e4c',
      value: [
        {
          id: 'a087faee-4b88-49fc-93b5-544b36eabbcd',
          type: 'heading-three',
          children: [
            {
              text: 'Is your feature request related to a problem/unavailable functionality? Please describe.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 2,
        depth: 0,
      },
    },
    '0c62847c-ebec-4595-8abf-f1e5635c0887': {
      id: '0c62847c-ebec-4595-8abf-f1e5635c0887',
      value: [
        {
          id: '02963b02-b234-4728-812f-cc8ea26d4d62',
          type: 'paragraph',
          children: [
            {
              text: 'As an example, I need to quickly redefine default "target" property in the Link plugin',
            },
            {
              text: '\n',
            },
            {
              text: 'And now I have to redefine whole render of the link element',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 3,
        depth: 0,
      },
    },
    '1c3c3d64-9844-4ada-8b72-daaeebee074a': {
      id: '1c3c3d64-9844-4ada-8b72-daaeebee074a',
      value: [
        {
          id: 'ecc37c5b-5a91-4638-a7c6-b4d7f05b143d',
          type: 'heading-three',
          children: [
            {
              text: 'Proposed Solution',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 4,
        depth: 0,
      },
    },
    '3db8224e-0356-4165-863c-93efd967599c': {
      id: '3db8224e-0356-4165-863c-93efd967599c',
      value: [
        {
          id: '601f99e8-582b-4479-b3b8-dc2baa69e889',
          type: 'paragraph',
          children: [
            {
              text: 'I guess would be nice to just extend the plugin and pass the default props (not all of them) that would be merged with the rest of the properties. The Link has a few props, but I wish to redefine only "target".',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 5,
        depth: 0,
      },
    },
    '7c34fee2-76d2-4ed9-808d-f8350da99780': {
      id: '7c34fee2-76d2-4ed9-808d-f8350da99780',
      value: [
        {
          id: 'a93fdf38-72cc-40cc-816b-abcc69a8936a',
          type: 'paragraph',
          children: [
            {
              italic: true,
              text: "I don't insist on the extend variant below, just an example of the idea",
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 6,
        depth: 0,
      },
    },
    'ff9c2278-7c86-4b7a-afb4-a5467df9148d': {
      id: 'ff9c2278-7c86-4b7a-afb4-a5467df9148d',
      value: [
        {
          children: [
            {
              text: '  Link.extend({\n    elements: {\n       link: {\n          props: {\n             target: "_blank"\n          }\n       }\n    },\n    options: {\n      HTMLAttributes: {\n        className: \'yoopta-link\',\n      },\n    },\n  }),',
            },
          ],
          type: 'code',
          id: '888162b7-4679-4c52-ad96-bf05ead1b920',
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
        depth: 0,
      },
    },
    '5af4e590-6143-40f0-a6c2-149f880e387a': {
      id: '5af4e590-6143-40f0-a6c2-149f880e387a',
      value: [
        {
          id: '9dca1b59-2150-4baa-91c3-d84aafe403e8',
          type: 'heading-three',
          children: [
            {
              text: 'Screenshots',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 8,
        depth: 0,
      },
    },
    'deacb740-54f2-4905-88af-88faa1d14bb6': {
      id: 'deacb740-54f2-4905-88af-88faa1d14bb6',
      value: [
        {
          id: 'd25caee6-4412-4c81-953d-72f1db50760d',
          type: 'paragraph',
          children: [
            {
              italic: true,
              text: 'No response',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 9,
        depth: 0,
      },
    },
    '1312285a-22b0-412a-b16e-0c0ad56a8c09': {
      id: '1312285a-22b0-412a-b16e-0c0ad56a8c09',
      value: [
        {
          id: '2cd29ac7-a451-43c5-a518-7ea6e18d636e',
          type: 'heading-three',
          children: [
            {
              text: 'Do you want to work on this issue?',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 10,
        depth: 0,
      },
    },
    '32b15676-9552-444a-ae6c-1181afd98a72': {
      id: '32b15676-9552-444a-ae6c-1181afd98a72',
      value: [
        {
          id: 'eab23e88-fa8f-4179-b75b-0a295bf2fca9',
          type: 'paragraph',
          children: [
            {
              text: 'No',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 11,
        depth: 0,
      },
    },
    '790811dd-06bb-415b-b132-0dce704b7d97': {
      id: '790811dd-06bb-415b-b132-0dce704b7d97',
      value: [
        {
          id: '391aded2-aa19-4861-8a91-dfb17ccd21de',
          type: 'heading-three',
          children: [
            {
              text: 'If "yes" to the above, please explain how you would technically implement this (issue will not be assigned if this is skipped)',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 12,
        depth: 0,
      },
    },
    '619e6cb2-fdb7-439a-95fb-28d23b608f3a': {
      id: '619e6cb2-fdb7-439a-95fb-28d23b608f3a',
      value: [
        {
          id: '423c6438-a139-4dd2-b9f3-e0e14f9f9969',
          type: 'paragraph',
          children: [
            {
              italic: true,
              text: 'No response',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 13,
        depth: 0,
      },
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
