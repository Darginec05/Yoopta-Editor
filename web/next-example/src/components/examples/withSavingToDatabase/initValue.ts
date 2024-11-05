export const withSavingToDatabaseValue = {
  '49d0ee53-900f-48bd-ae47-002bfedc3ca8': {
    id: '49d0ee53-900f-48bd-ae47-002bfedc3ca8',
    type: 'HeadingOne',
    meta: {
      order: 0,
      depth: 0,
    },
    value: [
      {
        id: 'da4c23f1-569f-4559-9c17-b33d5ed86e60',
        type: 'heading-one',
        children: [
          {
            text: 'With Saving data to database',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '426b1432-5f1e-454d-86f1-00b056709793': {
    id: '426b1432-5f1e-454d-86f1-00b056709793',
    type: 'Callout',
    meta: {
      order: 1,
      depth: 0,
    },
    value: [
      {
        id: 'ae612088-57f6-4476-9605-74b03768f1ca',
        type: 'callout',
        children: [
          {
            text: 'This example shows you how to save content to database',
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'info',
        },
      },
    ],
  },
  '86c70492-cc64-45c6-bf91-196a4e442c97': {
    id: '86c70492-cc64-45c6-bf91-196a4e442c97',
    value: [
      {
        id: 'a9f19523-c78a-49b8-bc62-d48e5e1ff672',
        type: 'paragraph',
        children: [
          {
            text: 'You have several ways to store your content in the database, depending on the business logic of your application',
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
  '5b382573-b51b-4eb1-82a2-925893514369': {
    id: '5b382573-b51b-4eb1-82a2-925893514369',
    value: [
      {
        id: '2cc734ec-572c-46d6-9deb-96dedfe93ed4',
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
  '210228b5-ae4a-48c1-85c7-290fb2a32fea': {
    id: '210228b5-ae4a-48c1-85c7-290fb2a32fea',
    value: [
      {
        id: 'ed67c252-a26b-4f3c-ae4e-e9b467dddf40',
        type: 'code',
        children: [
          {
            text: 'function WithSavingToDatabase() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  const fetchToServer = async () => {\n    //...your async call to server  \n  }\n  \n  const onSaveToServer = () => {\n    const editorContent = editor.getEditorValue();\n    await fetchToServer(editorContent)\n  }\n  \n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins} \n        tools={TOOLS} \n        marks={MARKS} \n        selectionBoxRoot={selectionRef} \n      />\n    </div>\n  );\n}',
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
      depth: 1,
    },
  },
  'ef9bef44-dc40-4c2f-b2df-31e35354b6f5': {
    id: 'ef9bef44-dc40-4c2f-b2df-31e35354b6f5',
    value: [
      {
        id: 'f9a4988b-33c8-4e3f-b635-3d4ac99461d6',
        type: 'code',
        children: [
          {
            text: "\nfunction WithSavingToDatabase() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  function handleChange(payload: YooptaEventChangePayload) {\n    console.log('DATA ON CHANGE', payload.value);\n  }\n\n  useEffect(() => {\n    editor.on('change', handleChange);\n    return () => {\n      // [IMPORTANT] - unsubscribe from event on unmount\n      editor.off('change', handleChange);\n    };\n  }, [editor]);\n\n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins}\n        tools={TOOLS}\n        marks={MARKS}\n      />\n    </div>\n  );\n}",
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
      depth: 1,
    },
  },
  '8e8f318c-99e5-4824-ae3f-8170526fb435': {
    id: '8e8f318c-99e5-4824-ae3f-8170526fb435',
    type: 'BulletedList',
    meta: {
      order: 7,
      depth: 0,
    },
    value: [
      {
        id: '7331420a-86b2-4dfc-9d5a-1d44d85276a3',
        type: 'bulleted-list',
        children: [
          {
            text: 'In case you need to save the data in real time. You can subscribe on ',
          },
          {
            text: 'change',
            code: true,
          },
          {
            text: ' event.\nOpen console and change content',
          },
        ],
      },
    ],
  },
  '8f810a91-5d8e-4b31-82ef-15051d29e5b0': {
    id: '8f810a91-5d8e-4b31-82ef-15051d29e5b0',
    type: 'BulletedList',
    meta: {
      order: 3,
      depth: 0,
    },
    value: [
      {
        id: 'ae571d36-ebd1-4be3-9960-ab031eb97a77',
        type: 'bulleted-list',
        children: [
          {
            text: 'Using method ',
          },
          {
            text: 'getEditorValue',
            code: true,
          },
          {
            text: ' from editor instance. Check example below 👇 \nand try to click on ',
          },
          {
            text: 'save data',
            highlight: {
              color: '#477DA5',
            },
          },
          {
            text: ' button',
          },
        ],
      },
    ],
  },
  'a607439d-6b8a-4932-92af-04de24eec8ff': {
    id: 'a607439d-6b8a-4932-92af-04de24eec8ff',
    type: 'BulletedList',
    meta: {
      order: 5,
      depth: 0,
    },
    value: [
      {
        id: 'f38f67d0-f70d-4d56-8209-0d2bd7962aa0',
        type: 'bulleted-list',
        children: [
          {
            text: 'Example with ',
          },
          {
            text: 'onChange',
            code: true,
          },
          {
            text: ' option and debounced value',
          },
        ],
      },
    ],
  },
  'cbd602dc-61b4-423c-b328-1a36b4bf52cd': {
    id: 'cbd602dc-61b4-423c-b328-1a36b4bf52cd',
    type: 'Code',
    meta: {
      depth: 1,
      order: 6,
    },
    value: [
      {
        id: '698df402-9ef6-4b14-a6e3-ba401c019192',
        type: 'code',
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
        children: [
          {
            text: "import { useDebounce } from 'use-debounce';\n\nfunction WithSavingToDatabase() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n  const [value, setValue] = useState<YooptaContentValue>(withSavingToDatabaseValue);\n  const [debouncedValue] = useDebounce(value, 1000);\n\n  const fetchToServer = async (data: YooptaContentValue) => {\n    //...your async call to server\n  };\n\n  const onChange = (newValue: YooptaContentValue) => {\n    setValue(newValue);\n  };\n\n  useEffect(() => {\n    fetchToServer(value);\n  }, [debouncedValue]);\n\n  return (\n    <YooptaEditor \n      editor={editor} \n      plugins={plugins} \n      tools={TOOLS} \n      marks={MARKS} \n      value={value} \n      onChange={onChange} \n    />\n  );\n}\n",
          },
        ],
      },
    ],
  },
};
