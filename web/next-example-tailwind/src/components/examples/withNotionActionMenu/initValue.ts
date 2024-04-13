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
      order: 2,
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
      order: 5,
      depth: 0,
    },
  },
  'bd758378-1c0b-48f5-b259-2434597b173a': {
    id: 'bd758378-1c0b-48f5-b259-2434597b173a',
    value: [
      {
        id: '847130f3-9e4c-4e2b-b645-54d8194a4237',
        type: 'paragraph',
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
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 3,
      depth: 0,
    },
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
      order: 4,
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
            text: 'How to render custom ActionMenu',
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
  'e59a7009-306b-4bc7-ab3f-30f200596704': {
    id: 'e59a7009-306b-4bc7-ab3f-30f200596704',
    value: [
      {
        id: '7fba69c1-9fec-40f9-be6c-e3e5f1f61509',
        type: 'callout',
        children: [
          {
            text: 'Link to source code - ',
          },
          {
            type: 'link',
            children: [
              {
                text: 'with notion example ',
              },
            ],
            props: {
              url: 'http://localhost:3000/examples/withNotionActionMenu',
              target: '_blank',
              rel: 'noreferrer',
              title: 'with notion example ',
            },
          },
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'info',
        },
      },
    ],
    type: 'Callout',
    meta: {
      order: 1,
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
            text: "// components/NotionActionMenuRender\n\n// import types for custom render props. It helps you\nimport { ActionMenuRenderProps } from '@yoopta/action-menu-list';\n\nconst ActionNotionMenuExample = (props: ActionMenuRenderProps) => {\n  const {\n    empty,\n    // required attributes for \n    getItemProps,\n    actions,\n    getRootProps,\n    view\n  } = props;\n  \n  /** return (\n    //...SOME UI\n  ) */\n}\nexport { ActionNotionMenuExample };\n",
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
      order: 7,
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
      order: 8,
      depth: 0,
    },
  },
};
