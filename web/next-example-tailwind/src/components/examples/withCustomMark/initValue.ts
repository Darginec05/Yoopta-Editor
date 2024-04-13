export const WITH_CUSTOM_MARK_INIT_VALUE = {
  'cbc742a2-49af-46bb-be30-4671a33f1de8': {
    id: 'cbc742a2-49af-46bb-be30-4671a33f1de8',
    value: [
      {
        id: 'e964b361-c882-47e6-ab65-6997b4f62054',
        type: 'heading-one',
        children: [
          {
            text: 'With custom mark example',
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
    },
  },
  'b876ffac-73a6-454b-97a7-13b7ad6db5d8': {
    id: 'b876ffac-73a6-454b-97a7-13b7ad6db5d8',
    value: [
      {
        id: 'f17d4da5-fa72-4c74-8014-13469b677ff4',
        type: 'paragraph',
        children: [
          {
            text: "Okay, let's start with creating custom mark.",
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  '2029f1ee-c0c8-400c-8f33-3da4c73c126b': {
    id: '2029f1ee-c0c8-400c-8f33-3da4c73c126b',
    value: [
      {
        id: 'd962fc28-d28d-4869-bb94-988eaafc4e10',
        type: 'paragraph',
        children: [
          {
            text: 'By default Yoopta-Editor supports default marks from ',
          },
          {
            text: '@yoopta/marks',
            bold: true,
            underline: true,
          },
          {
            text: ' package.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 2,
      depth: 0,
    },
  },
  'c138aaf6-b3f5-4ba9-84cc-d012aaf36bf8': {
    id: 'c138aaf6-b3f5-4ba9-84cc-d012aaf36bf8',
    value: [
      {
        id: 'bae14bf9-0f24-4d71-93f7-b428ff3b1e70',
        type: 'paragraph',
        children: [
          {
            text: "But in case you want some special text formatter it's easy to ",
          },
          {
            text: 'create',
            highlight: {},
          },
          {
            text: '! ',
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
  '78a3c2ba-eea0-4ece-9944-e21cc60288f8': {
    id: '78a3c2ba-eea0-4ece-9944-e21cc60288f8',
    value: [
      {
        id: '0b4e04f8-5eea-4e6c-bdfc-4babd467c20f',
        type: 'code',
        children: [
          {
            text: "import YooptaEditor, { createYooptaEditor, createYooptaMark, YooptaMarkProps } from '@yoopta/editor';\n\ntype SuperscriptMarkProps = YooptaMarkProps<'superscript', boolean>;\n\nconst CUSTOM_SUPERSCRIPT_MARK = createYooptaMark<SuperscriptMarkProps>({\n  // Type of your mark. You can access to this using next API: `editor.formats.superscript.<actions>`\n  // [REQUIRED]\n  type: 'superscript',\n  // How it should be rendered. It should rendered by inline html tag\n  // [REQUIRED]\n  render: (props) => {\n    return <sup className={s.superscript}>{props.children}</sup>;\n  },\n  // hotkey for user keyboard event\n  // [OPTIONAL]\n  hotkey: 'mod+p',\n});\n\n// Add custom mark into array of marks\nconst MARKS = [CUSTOM_SUPERSCRIPT_MARK, Bold, Italic, CodeMark, Underline, Strike, Highlight];\n\nfunction WithCustomMark() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  return (\n    <YooptaEditor\n      // Pass the array to props\n      marks={MARKS}\n      {/* ...other props */}\n    />\n  );\n}",
          },
        ],
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  '082ed779-8fa9-443b-b1c3-bc2a435562bb': {
    id: '082ed779-8fa9-443b-b1c3-bc2a435562bb',
    value: [
      {
        id: '1da97aa8-0433-44ad-a0c6-6eb2cd84fd4c',
        type: 'paragraph',
        children: [
          {
            text: '\n',
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
  '4970e245-5656-4909-a333-54fb35929fdd': {
    id: '4970e245-5656-4909-a333-54fb35929fdd',
    value: [
      {
        id: 'ebc6957d-b097-48f5-9549-24e382e55750',
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
      order: 10,
      depth: 0,
    },
  },
  '7e943650-99bd-4d69-bc21-8b1640502ac5': {
    id: '7e943650-99bd-4d69-bc21-8b1640502ac5',
    value: [
      {
        id: '6f15b640-ca18-4b61-b7b6-a6d12e886bbf',
        type: 'heading-three',
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
    type: 'HeadingThree',
    meta: {
      order: 5,
      depth: 0,
    },
  },
  'acd27eba-48a7-45cc-966f-2cf7ee3962bc': {
    id: 'acd27eba-48a7-45cc-966f-2cf7ee3962bc',
    value: [
      {
        id: 'eb18569a-3523-4898-bb1a-774e95b32602',
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
      order: 12,
      depth: 0,
    },
  },
  '253fcb25-6f73-4ed7-86c5-13a44e641543': {
    id: '253fcb25-6f73-4ed7-86c5-13a44e641543',
    value: [
      {
        id: 'c9e3b09c-f983-4ca5-acb0-604eeae8b739',
        type: 'heading-three',
        children: [
          {
            text: 'Okay, our first custom mark is ready to use',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 6,
      depth: 0,
    },
  },
  'e9b5cb2a-c557-4b66-b048-1e46c5fa3661': {
    id: 'e9b5cb2a-c557-4b66-b048-1e46c5fa3661',
    value: [
      {
        id: 'd5c49809-cec1-4814-8a42-a0b73e86f05b',
        type: 'paragraph',
        children: [
          {
            text: 'Select any text and press the hotkey ',
          },
          {
            text: 'mod+p',
            code: true,
          },
          {
            text: ' on the keyboard',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '68dc33cf-adfa-4bf1-8186-81d4a65f584f': {
    id: '68dc33cf-adfa-4bf1-8186-81d4a65f584f',
    value: [
      {
        id: '54639589-06e8-4b04-bda7-9da27632b2f0',
        type: 'paragraph',
        children: [
          {
            text: 'Also you can apply your mark programmatically using editor instance for selected text: ',
          },
          {
            text: 'editor.formats.superscript.toggle()',
            code: true,
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  'f6886bdb-9b16-4a45-afe7-9135a3427b39': {
    id: 'f6886bdb-9b16-4a45-afe7-9135a3427b39',
    value: [
      {
        id: 'a86dbe3e-aa64-4ec4-b5de-bb0c80f6cad6',
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
      order: 9,
      depth: 0,
    },
  },
};
