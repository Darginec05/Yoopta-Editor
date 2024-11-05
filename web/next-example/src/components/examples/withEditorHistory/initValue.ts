export const WITH_EDITOR_HISTORY_API_VALUE = {
  '872e4797-8cd3-45ee-8478-f80f2af84243': {
    id: '872e4797-8cd3-45ee-8478-f80f2af84243',
    type: 'Paragraph',
    value: [
      {
        id: '24403940-acfe-4143-92e0-c2ff3cde9932',
        type: 'paragraph',
        children: [
          {
            text: 'Introducing the History API in Yoopta (finally!)',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 0,
    },
  },
  'f10a6515-407e-4262-9dac-df750491bad7': {
    id: 'f10a6515-407e-4262-9dac-df750491bad7',
    type: 'Paragraph',
    value: [
      {
        id: '78fdcc91-d9ca-48d0-bd24-0721c86dbe18',
        type: 'paragraph',
        children: [
          {
            text: 'New added methods in Editor API:',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 3,
    },
  },
  '6b12c0e9-2aae-4c08-b301-7754a8ae9712': {
    id: '6b12c0e9-2aae-4c08-b301-7754a8ae9712',
    type: 'Paragraph',
    value: [
      {
        id: '551eb252-e43b-46b8-99c9-e559c2c0d1f4',
        type: 'paragraph',
        children: [
          {
            text: 'Try changing/inserting/deleting content and try ',
          },
          {
            text: 'undo/redo',
            code: true,
          },
          {
            text: ' (by clicking ctrl+z/cmd+shift+z or buttons on top)',
            underline: true,
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 1,
    },
  },
  'ab0e2c33-b87d-44d1-927a-a5d6c5f64ed6': {
    id: 'ab0e2c33-b87d-44d1-927a-a5d6c5f64ed6',
    type: 'Divider',
    meta: {
      depth: 0,
      order: 2,
    },
    value: [
      {
        id: '8da6660d-7be0-489d-b2a4-85fcf2efa0c2',
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
  '20fc60a2-6e5d-4dec-a572-23c73e0a72a7': {
    id: '20fc60a2-6e5d-4dec-a572-23c73e0a72a7',
    type: 'Code',
    meta: {
      depth: 0,
      order: 4,
    },
    value: [
      {
        id: '368a4795-5166-4a60-a721-1541e0bee25e',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: '  editor.historyStack: Record<HistoryStackName, HistoryStack[]>;\n  editor.withoutSavingHistory: WithoutFirstArg<typeof YooptaHistory.withSavingHistory>;\n  editor.redo: WithoutFirstArg<typeof YooptaHistory.redo>;\n  editor.undo: WithoutFirstArg<typeof YooptaHistory.undo>;',
          },
        ],
      },
    ],
  },
  'cdce13db-fe55-46be-867f-5784e4b395c5': {
    id: 'cdce13db-fe55-46be-867f-5784e4b395c5',
    type: 'Divider',
    meta: {
      depth: 0,
      order: 5,
    },
    value: [
      {
        id: '3b7d69dd-dac3-4541-b347-a02b36873e66',
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
  'ae7c2074-4e94-4440-9961-bf1d45c7d718': {
    id: 'ae7c2074-4e94-4440-9961-bf1d45c7d718',
    type: 'Callout',
    meta: {
      depth: 0,
      order: 6,
    },
    value: [
      {
        id: '27dde2d9-7be3-477b-a33e-ea7399f6c407',
        type: 'callout',
        props: {
          theme: 'default',
        },
        children: [
          {
            text: 'You can also make changes to the content without writing it to the history. \nThere is method for such cases: ',
          },
          {
            text: 'editor.withoutSavingHistory',
            code: true,
          },
        ],
      },
    ],
  },
  '973f7620-56c4-40fc-916d-e8e98ca5a303': {
    id: '973f7620-56c4-40fc-916d-e8e98ca5a303',
    type: 'Paragraph',
    value: [
      {
        id: 'bbebd07d-01aa-4cce-a5b8-7b0c1056c71b',
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
      order: 9,
    },
  },
  'b5118647-ce52-4532-8d8b-490772566d70': {
    id: 'b5118647-ce52-4532-8d8b-490772566d70',
    type: 'Callout',
    meta: {
      depth: 0,
      order: 7,
    },
    value: [
      {
        id: '04fb487d-19f6-4184-9f48-51e660e571d0',
        type: 'callout',
        props: {
          theme: 'info',
        },
        children: [
          {
            text: 'This can be very useful, for example, when you make an API call to get content and want to write the content to the editor from the received response without saving it to history.\nCheck example: ',
          },
        ],
      },
    ],
  },
  'aeb311c2-82d9-46d9-8488-f595de863933': {
    id: 'aeb311c2-82d9-46d9-8488-f595de863933',
    type: 'Code',
    meta: {
      depth: 0,
      order: 8,
    },
    value: [
      {
        id: 'd95ad5c1-c323-46b5-864b-f43015c43c94',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'GithubDark',
        },
        children: [
          {
            text: 'const Editor = () => {\n  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);\n  const [value, setValue] = useState<YooptaContentValue>({});\n\n  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {\n    setValue(value);\n  };\n\n  const setContent = async() => {\n    const data = await fetchContentFromAPI();\n\n    // it will store without saving in history\n    editor.withoutSavingHistory(() => {\n      editor.setEditorValue(data);\n    });\n  }\n\n  useEffect(() => {\n    setContent()\n  }, []);\n\n  return (\n    <YooptaEditor\n      editor={editor}\n      plugins={YOOPTA_PLUGINS}\n      marks={MARKS}\n      autoFocus={true}\n      readOnly={false}\n      placeholder="Type / to open menu"\n      tools={TOOLS}\n      style={EDITOR_STYLE}\n      value={value}\n      onChange={onChange}\n  );\n};',
          },
        ],
      },
    ],
  },
};
