export const WITH_OPERATIONS_VALUE = {
  'a92e7427-b63e-43bb-9ebf-74ef25e2b6a2': {
    id: 'a92e7427-b63e-43bb-9ebf-74ef25e2b6a2',
    value: [
      {
        id: '16d086b5-c1f6-44c5-9910-4e51c970aecb',
        type: 'paragraph',
        children: [
          {
            text: 'Introducing new approach to changing data in the Yoopta editor.',
          },
        ],
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  'd844ccf4-c928-476d-a870-95c12be18077': {
    id: 'd844ccf4-c928-476d-a870-95c12be18077',
    type: 'HeadingOne',
    meta: {
      depth: 0,
      order: 0,
    },
    value: [
      {
        id: '3c4910e7-81f1-4ce4-b837-245b4ac4ccc3',
        type: 'heading-one',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'New Editor Operations API ',
          },
        ],
      },
    ],
  },
  'fabf19f2-4fc2-4cfb-ac96-e21aa6e65de8': {
    id: 'fabf19f2-4fc2-4cfb-ac96-e21aa6e65de8',
    type: 'Paragraph',
    value: [
      {
        id: '346614c0-c7b2-41f9-b5f8-5036875b06d9',
        type: 'paragraph',
        children: [
          {
            text: 'Now, each time the content is changed, the corresponding operation is called. Next, an operation or list of operations fall into the ',
          },
          {
            text: 'editor.applyTransforms',
            code: true,
          },
          {
            text: ', where draft of content is created, operations are iterated over and manipulations with content occur, depending on the type of operation',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 2,
    },
  },
  '940f6fc1-dc22-4068-87ca-0f43e948aa4b': {
    id: '940f6fc1-dc22-4068-87ca-0f43e948aa4b',
    type: 'Callout',
    meta: {
      depth: 0,
      order: 3,
    },
    value: [
      {
        id: '90ccb702-334f-4a49-ae35-29dbd9628d95',
        type: 'callout',
        props: {
          theme: 'default',
        },
        children: [
          {
            text: 'In most cases, you will not need to use ',
          },
          {
            text: 'editor.applyTransforms',
            code: true,
          },
          {
            text: ' directly, because each operation is already being processed in API methods',
          },
        ],
      },
    ],
  },
  'd8477395-ebcb-428e-84a9-9f4e059e0e0a': {
    id: 'd8477395-ebcb-428e-84a9-9f4e059e0e0a',
    type: 'Paragraph',
    value: [
      {
        id: '8eb42b15-0e5e-4fdd-8e55-5baa3efdfd91',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 10,
    },
  },
  '0338c625-3049-4fe5-8e72-f75c8f0f69d1': {
    id: '0338c625-3049-4fe5-8e72-f75c8f0f69d1',
    type: 'Paragraph',
    value: [
      {
        id: 'd946497a-f775-47aa-803d-96c85cea9534',
        type: 'paragraph',
        children: [
          {
            text: 'To combine several operations at once, you can use the ',
          },
          {
            text: 'editor.batchOperations',
            code: true,
          },
          {
            text: ', which will combine all the operations passed to the callback and apply them once. This is convenient when you need, for example, to record in history not several operations, but several combined into one. ',
          },
          {
            text: 'Try it by clicking on the buttons on top',
            italic: true,
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 6,
    },
  },
  '1dfc3d9a-1a7f-433c-b53f-90b3e0079c0f': {
    id: '1dfc3d9a-1a7f-433c-b53f-90b3e0079c0f',
    type: 'Paragraph',
    value: [
      {
        id: '86c3ee6f-350a-43d8-9859-b66b3ba97af2',
        type: 'paragraph',
        children: [
          {
            text: 'New added methods to Editor API:',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 8,
    },
  },
  'e105c0a3-47aa-43bf-86ad-28258e67abd0': {
    id: 'e105c0a3-47aa-43bf-86ad-28258e67abd0',
    type: 'Code',
    meta: {
      depth: 0,
      order: 9,
    },
    value: [
      {
        id: '7caec164-1441-4fcb-825b-edd1f89f0940',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: '  editor.applyTransforms: (ops: YooptaOperation[], options?: ApplyTransformsOptions) => void;\n  editor.batchOperations: (fn: () => void) => void;\n\n  // operations \n  export type YooptaOperation =\n    | InsertBlockOperation\n    | DeleteBlockOperation\n    | NormalizePathsBlockOperation\n    | SetSelectionBlockOperation\n    | SplitBlockOperation\n    | SetBlockValueOperation\n    | SetBlockMetaOperation\n    | MergeBlockOperation\n    | MoveBlockOperation\n    | SetSlateOperation\n    | SetEditorValueOperation;\n',
          },
        ],
      },
    ],
  },
  '80811283-6f0e-4a40-bcf6-c1debb025e28': {
    id: '80811283-6f0e-4a40-bcf6-c1debb025e28',
    type: 'Divider',
    meta: {
      order: 5,
      depth: 0,
    },
    value: [
      {
        id: '5d362be8-52a0-44fd-b076-d40e13fe79f9',
        type: 'divider',
        props: {
          nodeType: 'void',
          theme: 'gradient',
          color: '#007aff',
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  '7c55c583-e624-418c-87c7-ff649f300023': {
    id: '7c55c583-e624-418c-87c7-ff649f300023',
    type: 'Divider',
    meta: {
      depth: 0,
      order: 7,
    },
    value: [
      {
        id: 'cbf1fd5a-577f-47fb-861a-78b875305797',
        type: 'divider',
        props: {
          nodeType: 'void',
          theme: 'gradient',
          color: '#007aff',
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  'a5cf39db-663b-409c-a403-56371ee835e1': {
    id: 'a5cf39db-663b-409c-a403-56371ee835e1',
    type: 'Paragraph',
    value: [
      {
        id: 'd946497a-f775-47aa-803d-96c85cea9534',
        type: 'paragraph',
        children: [
          {
            text: 'Try it by clicking on the buttons on top',
            italic: true,
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 4,
    },
  },
};
