export const WITH_NOTION_ACTION_MENU_INIT_VALUE = {
  '7637d6f5-297f-46cf-a444-c56d72d530f0': {
    id: '7637d6f5-297f-46cf-a444-c56d72d530f0',
    value: [
      {
        id: 'a1d9a88b-0859-47fb-bf76-9119087dfdd6',
        type: 'heading-one',
        children: [
          {
            text: 'With Notion action menu example',
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
  'f3276741-57d5-48c2-a066-51a84550d3ca': {
    id: 'f3276741-57d5-48c2-a066-51a84550d3ca',
    value: [
      {
        id: 'dfe9490b-6899-4fb6-a804-4290c2d015f4',
        type: 'paragraph',
        children: [
          {
            text: 'This example shows you how to make action menu with custom render.',
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
  '17b197d9-45c9-4f18-95ae-067363ec2a9b': {
    id: '17b197d9-45c9-4f18-95ae-067363ec2a9b',
    value: [
      {
        id: '44e25a2c-c0dd-47b5-936e-1164e46426be',
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
      order: 6,
      depth: 0,
    },
  },
  'bd758378-1c0b-48f5-b259-2434597b173a': {
    id: 'bd758378-1c0b-48f5-b259-2434597b173a',
    type: 'Callout',
    meta: {
      order: 3,
      depth: 0,
    },
    value: [
      {
        id: '847130f3-9e4c-4e2b-b645-54d8194a4237',
        type: 'callout',
        children: [
          {
            text: 'Action menu is coming from package ',
          },
          {
            text: '@yoopta/action-menu-list',
            bold: true,
            code: true,
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'info',
        },
      },
    ],
  },
  'f9de6dc9-d141-449b-9bcb-34eba18bbbb0': {
    id: 'f9de6dc9-d141-449b-9bcb-34eba18bbbb0',
    value: [
      {
        id: '9221c4fe-8262-4281-a9b1-9e8ebf424c55',
        type: 'code',
        children: [
          {
            text: "// Editor.tsx\nimport YooptaEditor, { createYooptaEditor } from '@yoopta/editor';\nimport ActionMenuList from '@yoopta/action-menu-list';\n\nimport { NotionActionMenuRender } from 'components/NotionActionMenuRender'\n\nconst TOOLS = {\n  ActionMenu: {\n    // This is what we need for custom rendering. You need care only about UI!\n    // Main logic is implemented inside ActionMenuList tool\n    render: NotionActionMenuRender\n    tool: ActionMenuList,\n  },\n  // ...other tools\n};\n\nfunction WithNotionExample() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        tools={TOOLS}\n        // ...other props\n      />\n    </div>\n  );\n}\n\nexport default WithNotionExample;\n",
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
      order: 5,
      depth: 0,
    },
  },
  'e277883a-fc9e-4d8f-8bc8-cac307271737': {
    id: 'e277883a-fc9e-4d8f-8bc8-cac307271737',
    value: [
      {
        id: '8248ccf9-dc90-4294-9cab-659202834436',
        type: 'heading-three',
        children: [
          {
            text: 'How to render custom ActionMenu. Main rules',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingThree',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '09f918af-0ad2-41db-9494-cf15588de1ef': {
    id: '09f918af-0ad2-41db-9494-cf15588de1ef',
    value: [
      {
        id: 'b6d42124-4b1f-4449-99ad-7e1d87ce97ba',
        type: 'code',
        children: [
          {
            text: "// components/NotionActionMenuRender\n\n// import types for custom render props. It helps you\nimport { ActionMenuRenderProps } from '@yoopta/action-menu-list';\n\nconst ActionNotionMenuExample = (props: ActionMenuRenderProps) => {\n  /** \n    empty: boolean when any action nof founded.\n    TS: boolean\n    \n    getRootProps: required attrs list of actions element. \n    TS: () => void\n    \n    getItemProps: required attrs for every action item element.\n    TS: (type: string) => void\n    \n    actions: your actions to render.\n    TS: {\n      type: string;\n      title: string;\n      description?: string;\n      icon?: string | ReactNode | ReactElement;\n    }[]\n\n    view: useful prop for choosing how to render your UI in different cases.\n    When user open action menu from  \n    TS: 'small' | 'default'\n  */\n  const {\n    empty,\n    getItemProps,\n    actions,\n    getRootProps,\n    view\n  } = props;\n\n  // THIS IS PSEUDOCODE\n  return (\n    <ul {...getRootProps()}> \n      {empty && <li>List is empty!</li>}\n      {actions.map(action => {\n        <li key={action.type}>\n          <button {...getItemProps}>{action.title}</button>\n        </li>\n      })}\n    </ul>\n  )\n}\nexport { ActionNotionMenuExample };\n",
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
      order: 8,
      depth: 0,
    },
  },
  'ab3cec9b-f6e4-48ad-965b-43e62e1c0ca6': {
    id: 'ab3cec9b-f6e4-48ad-965b-43e62e1c0ca6',
    value: [
      {
        id: '25e2530a-5dc2-43f9-a204-51b11c551695',
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
      order: 11,
      depth: 0,
    },
  },
  '660f6869-bc31-4d43-a97c-5c4e9d33fbf3': {
    id: '660f6869-bc31-4d43-a97c-5c4e9d33fbf3',
    value: [
      {
        id: '0d58b444-6129-4ce3-9b1e-42ad8192cc54',
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
      order: 10,
      depth: 0,
    },
  },
  'a1d778fa-42c1-430a-b46a-16ea55a0e18c': {
    id: 'a1d778fa-42c1-430a-b46a-16ea55a0e18c',
    value: [
      {
        id: 'a884725a-5591-404b-8b86-feeb618c7ec2',
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
  '3a46f48d-f80f-422a-a822-501114831d24': {
    id: '3a46f48d-f80f-422a-a822-501114831d24',
    value: [
      {
        id: 'ec616b5b-2b38-4e94-ba0e-7d104de4d20d',
        type: 'paragraph',
        children: [
          {
            text: "Try to open action menu list by typing slash command '/' on empty block",
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
  'c1d5aa22-a410-4240-b5ac-9d85b8937016': {
    id: 'c1d5aa22-a410-4240-b5ac-9d85b8937016',
    value: [
      {
        id: '1a4d2adc-0dfa-4344-b8dc-728aa826196c',
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
      order: 4,
      depth: 0,
    },
  },
};
