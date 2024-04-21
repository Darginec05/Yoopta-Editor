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
  'c7d481a3-f5e3-4483-8e48-bbb2092dfb6f': {
    id: 'c7d481a3-f5e3-4483-8e48-bbb2092dfb6f',
    value: [
      {
        id: '02a53626-8a49-42e0-a6c8-67a9ea729025',
        type: 'numbered-list',
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
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 3,
      depth: 0,
    },
  },
  '86c70492-cc64-45c6-bf91-196a4e442c97': {
    id: '86c70492-cc64-45c6-bf91-196a4e442c97',
    value: [
      {
        id: 'a9f19523-c78a-49b8-bc62-d48e5e1ff672',
        type: 'paragraph',
        children: [
          {
            text: 'You have two ways to save your content to database',
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
      order: 8,
      depth: 0,
    },
  },
  '38032b70-9a64-4fbb-8cd3-02dbeefc364c': {
    id: '38032b70-9a64-4fbb-8cd3-02dbeefc364c',
    value: [
      {
        id: '4bd6c758-921e-4e5e-880b-17b0a494673e',
        type: 'numbered-list',
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
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 6,
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
  '449a1edf-0730-43c4-b59a-001e0006c612': {
    id: '449a1edf-0730-43c4-b59a-001e0006c612',
    value: [
      {
        id: '7336bd7a-6628-4bb8-a42c-09873b85d94b',
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
  'ef9bef44-dc40-4c2f-b2df-31e35354b6f5': {
    id: 'ef9bef44-dc40-4c2f-b2df-31e35354b6f5',
    value: [
      {
        id: 'f9a4988b-33c8-4e3f-b635-3d4ac99461d6',
        type: 'code',
        children: [
          {
            text: "\nfunction WithSavingToDatabase() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  function handleChange(value) {\n    console.log('value', value);\n  }\n\n  useEffect(() => {\n    editor.on('change', handleChange);\n    return () => {\n      // [IMPORTANT] - unsubscribe from event on unmount\n      editor.off('change', handleChange);\n    };\n  }, [editor]);\n\n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins}\n        tools={TOOLS}\n        marks={MARKS}\n      />\n    </div>\n  );\n}",
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
      depth: 1,
    },
  },
};
