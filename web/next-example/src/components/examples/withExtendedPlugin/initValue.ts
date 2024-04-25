export const WITH_EXTENDED_PLUGIN_INIT_VALUE = {
  'e77c417a-f399-47b0-9410-e563a30b0f4b': {
    id: 'e77c417a-f399-47b0-9410-e563a30b0f4b',
    value: [
      {
        id: 'f4d29055-d101-459d-b8d9-6e4d51a31897',
        type: 'heading-one',
        children: [
          {
            text: 'With extended plugin example',
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
  'a3d31cbd-0e53-462f-8b75-963642cd64e3': {
    id: 'a3d31cbd-0e53-462f-8b75-963642cd64e3',
    type: 'Callout',
    meta: {
      order: 1,
      depth: 0,
    },
    value: [
      {
        id: 'ed7e4185-0907-4d49-adb9-7fec4189c799',
        type: 'callout',
        children: [
          {
            text: 'Every plugin provide default styles, shortcuts, display labels, html attributes',
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'info',
        },
      },
    ],
  },
  '187137e4-813f-45ba-97f7-d58a57524a96': {
    id: '187137e4-813f-45ba-97f7-d58a57524a96',
    value: [
      {
        id: '35223ba5-715c-49f9-8a5f-1a8a2cbc17e6',
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
      order: 5,
      depth: 0,
    },
  },
  '0c73c2a2-ad5c-44ea-b07b-706bb0b0d0be': {
    id: '0c73c2a2-ad5c-44ea-b07b-706bb0b0d0be',
    value: [
      {
        id: 'afaa5db0-b048-49d8-9649-83931b5da2f1',
        type: 'paragraph',
        children: [
          {
            text: 'But you can easy redefine each of this',
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
  '352fd794-02f8-4647-9bf7-d490ff7b65fb': {
    id: '352fd794-02f8-4647-9bf7-d490ff7b65fb',
    value: [
      {
        id: 'c6071ea7-6dd3-4f5c-b029-25bfe960bbd9',
        type: 'paragraph',
        children: [
          {
            text: "Let's extend ",
          },
          {
            text: 'Blockquote',
            bold: true,
            underline: true,
          },
          {
            text: ' shortcuts, labels and add our own classname',
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
  '96e24762-a41b-4ab3-af14-d485aa8b9d10': {
    id: '96e24762-a41b-4ab3-af14-d485aa8b9d10',
    value: [
      {
        id: '9a89b547-8eca-4295-86bd-85ff9738667b',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
        children: [
          {
            text: "const plugins = [\n  // ...other plugins\n  Blockquote.extend({\n    options: {\n      shortcuts: ['>', 'quote'],\n      display: {\n        // useful for action menu and toolbars \n        title: 'Super Ultra Blockquote',\n        description: 'Yay 🎉 It seems, that extending the plugin works!',\n        icon: <BlocksIcon />,\n      },\n      HTMLAttributes: {\n        spellCheck: true,\n        className: 'my-custom-blockquote',\n      },\n    },\n  })\n]",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  'c6f27953-4d80-486b-bf2b-158b0a00acac': {
    id: 'c6f27953-4d80-486b-bf2b-158b0a00acac',
    value: [
      {
        id: 'b05984ca-9e11-4d4d-be76-f40fb89ef4a0',
        type: 'paragraph',
        children: [
          {
            text: "So, let's check these changes:",
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
  '09860275-0877-44b8-b11c-9ff4dfafd0a9': {
    id: '09860275-0877-44b8-b11c-9ff4dfafd0a9',
    value: [
      {
        id: '7ea092a1-4c97-4bb1-ba68-6cc43ce130a6',
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
  '66f6141e-3bfb-4d3c-b79a-a1221ee0a37f': {
    id: '66f6141e-3bfb-4d3c-b79a-a1221ee0a37f',
    value: [
      {
        id: '3b6bfd29-1be5-43ab-84ae-59e68734b804',
        type: 'numbered-list',
        children: [
          {
            text: 'Open action menu and check updated ',
          },
          {
            text: 'title',
            underline: true,
          },
          {
            text: ' and ',
          },
          {
            text: 'description',
            underline: true,
          },
          {
            text: ' for ',
          },
          {
            text: 'Blockquote',
            bold: true,
          },
          {
            text: ' block',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '6094cb15-10e5-429e-a131-495a6fd1c30a': {
    id: '6094cb15-10e5-429e-a131-495a6fd1c30a',
    value: [
      {
        id: '25c51071-5f1a-4cd5-922f-988c63f79a3d',
        type: 'numbered-list',
        children: [
          {
            text: "Type shortcut 'quote' and press on space button after. It will create Blockquote",
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  'e7af6539-59a0-4d2f-9fdc-1ecfb97d0131': {
    id: 'e7af6539-59a0-4d2f-9fdc-1ecfb97d0131',
    value: [
      {
        id: '09ab05ef-f706-4285-937f-ea21d77004d0',
        type: 'numbered-list',
        children: [
          {
            text: 'Check in DOM your custom ',
          },
          {
            text: 'classname',
            underline: true,
          },
          {
            text: ' and ',
          },
          {
            text: 'spellcheck',
            underline: true,
          },
          {
            text: ' attributes for this block ',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 9,
      depth: 0,
    },
  },
};
