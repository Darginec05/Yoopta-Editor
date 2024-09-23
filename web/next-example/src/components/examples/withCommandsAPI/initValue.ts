export const WITH_BASIC_COMMANDS_API_VALUE = {
  'a6185d9e-5b51-4bba-b302-487d7d0b4562': {
    id: 'a6185d9e-5b51-4bba-b302-487d7d0b4562',
    value: [
      {
        id: '7312bd9f-d817-4ef8-b661-000ab4b7059d',
        type: 'heading-one',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'Editor Commands API',
          },
        ],
      },
    ],
    type: 'HeadingOne',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  '0cc6c313-a5a0-48ce-8d82-f6679a6dad4d': {
    id: '0cc6c313-a5a0-48ce-8d82-f6679a6dad4d',
    value: [
      {
        id: '4ea75685-49a5-464b-8faa-1e15b15d746b',
        type: 'paragraph',
        children: [
          {
            text: 'Now each plugin has its own API commands. \nThis allows you to manipulate with content from any place.',
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
  '0def9459-fab7-47ae-b17f-66acab43d674': {
    id: '0def9459-fab7-47ae-b17f-66acab43d674',
    value: [
      {
        id: 'bda27140-5e48-4f66-9a7a-879afde197df',
        type: 'paragraph',
        children: [
          {
            text: 'You have two ways to access the commands:',
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
  '3a67642d-074e-4efb-8de7-b887f73d0de3': {
    id: '3a67642d-074e-4efb-8de7-b887f73d0de3',
    value: [
      {
        id: '2ec0dd51-275c-47d6-b1d4-c6b1beeccf49',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: "import { ParagraphCommands } from '@yoopta/paragraph';\nimport { TableCommands } from '@yoopta/table';\nimport { ImageCommands } from '@yoopta/image';\nimport { BlockquoteCommands } from '@yoopta/blockquote';\n\nconst plugins = [\n  Paragraph,\n  Table,\n  Image,\n  Blockquote,\n  // other plugin\n]\n\nconst Editor = () => {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  const onDeleteTable = (blockId) => {\n    TableCommands.deleteTable(editor, blockId)\n    // or \n    editor.commands.deleteTable(blockId)\n  };\n  const onCreateTable = ({ rows, columns }) => {\n    TableCommands.insertTable(editor, { rows, columns })\n    // or\n    editor.commands.insertTable({ rows, columns })\n  };\n  \n  const onUpdateImage = (blockId, props) => {\n    ImageCommands.updateImage(editor, blockId, props)\n    // or \n    editor.commands.updateImage(blockId, props)\n  }\n  \n  return (\n    <YooptaEditor editor={editor} plugins={plugins} />\n  )\n}",
          },
        ],
      },
    ],
    type: 'Code',
    meta: {
      order: 6,
      depth: 1,
    },
  },
  'f2eb7987-e7d2-413c-93a4-0e13fe94f139': {
    id: 'f2eb7987-e7d2-413c-93a4-0e13fe94f139',
    type: 'BulletedList',
    meta: {
      order: 4,
      depth: 0,
    },
    value: [
      {
        id: '94fa7676-dd50-4c25-ac04-1b40e46e2019',
        type: 'bulleted-list',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'Importing commands directly from the package',
          },
        ],
      },
    ],
  },
  '1372c4a8-85f3-4c7e-989f-75ae31f325aa': {
    id: '1372c4a8-85f3-4c7e-989f-75ae31f325aa',
    type: 'BulletedList',
    meta: {
      order: 5,
      depth: 0,
    },
    value: [
      {
        id: 'db4e318b-21c7-4552-85c5-7c97163fe3e9',
        type: 'bulleted-list',
        children: [
          {
            text: 'Or using editor instance',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '2b54fac2-d026-4cd5-b9ff-d39db20a6b39': {
    id: '2b54fac2-d026-4cd5-b9ff-d39db20a6b39',
    value: [
      {
        id: '955ab8c3-84ba-431f-834a-952837060615',
        type: 'divider',
        props: {
          nodeType: 'void',
          theme: 'solid',
          color: '#007aff',
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
    type: 'Divider',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  '46f231b7-74c0-4c2d-ba29-2e192e5720a3': {
    id: '46f231b7-74c0-4c2d-ba29-2e192e5720a3',
    value: [
      {
        id: '3cd2fdfe-a9f8-4325-bf62-3c6d405c1eea',
        type: 'callout',
        props: {
          theme: 'info',
        },
        children: [
          {
            text: 'Every plugin commands has at least 3 default methods: \n- ',
          },
          {
            text: 'build<PluginName>Elements',
            code: true,
          },
          {
            text: ' - build elements structure with all children and additional props\n- ',
          },
          {
            text: 'insert<PluginName>',
            code: true,
          },
          {
            text: ' - insert block with props\n- ',
          },
          {
            text: 'delete<PluginName>',
            code: true,
          },
          {
            text: ' - delete block',
          },
        ],
      },
    ],
    type: 'Callout',
    meta: {
      order: 7,
      depth: 1,
    },
  },
};
