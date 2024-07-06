import YooptaEditor, {
  Blocks,
  createYooptaEditor,
  Elements,
  useYooptaEditor,
  useYooptaFocused,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
} from '@yoopta/editor';
import { html } from '@yoopta/exports';
import { useMemo, useRef, useState } from 'react';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rectangleSelectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);

  // useEffect(() => {
  //   const handleCopy = (value) => console.log('BLOCK COPY', value);
  //   const handleFocus = (focused) => console.log('FOCUS', focused);

  //   editor.on('block:copy', handleCopy);
  //   editor.on('focus', handleFocus);

  //   return () => {
  //     editor.off('block:copy', handleCopy);
  //     editor.off('focus', handleFocus);
  //   };
  // }, []);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={rectangleSelectionRef}>
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={rectangleSelectionRef}
          marks={MARKS}
          autoFocus={true}
          placeholder="Type / to open menu"
          tools={TOOLS}
          readOnly={readOnly}
          value={{
            '2b35020d-704c-4e7b-bd84-78072f7d0dfd': {
              id: '2b35020d-704c-4e7b-bd84-78072f7d0dfd',
              value: [
                {
                  id: '4e345f05-b985-4ae8-b16e-b612e9b7b764',
                  type: 'heading-one',
                  children: [
                    {
                      text: 'Hello there 👋',
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
            'c0c22649-dd5d-4557-b11a-22c2aa1e5c73': {
              id: 'c0c22649-dd5d-4557-b11a-22c2aa1e5c73',
              value: [
                {
                  id: 'f91e8967-0c9a-4c4b-b209-1634aeda2260',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'Getting started is easy ',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 1,
                depth: 0,
              },
            },
            '986c224f-256d-4f0a-990d-8f8395bb842e': {
              id: '986c224f-256d-4f0a-990d-8f8395bb842e',
              value: [
                {
                  children: [
                    {
                      text: "import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';\nimport Paragraph from '@yoopta/paragraph';\n\nconst plugins = [Paragraph]\n\nexport const Editor = () => {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  return <YooptaEditor editor={editor} plugins={plugins} />;\n};",
                    },
                  ],
                  type: 'code',
                  id: 'd9855d22-5891-4b6e-91ae-2b18cb84daa0',
                  props: {
                    language: 'JavaScript',
                    theme: 'VSCode',
                    nodeType: 'void',
                  },
                },
              ],
              type: 'Code',
              meta: {
                order: 2,
                depth: 0,
              },
            },
            'c6aa136a-8e2d-4417-b3bc-fab888b8d2a4': {
              id: 'c6aa136a-8e2d-4417-b3bc-fab888b8d2a4',
              value: [
                {
                  id: '03d2b533-8758-44da-961f-9661d1092a1f',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'List of powerful plugins:',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 3,
                depth: 0,
              },
            },
            '925f20f2-4cb0-4399-90d4-cee4e469951b': {
              id: '925f20f2-4cb0-4399-90d4-cee4e469951b',
              value: [
                {
                  id: 'db807bdb-a9c2-4aa5-831b-d696d460aee7',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/paragraph',
                    },
                    {
                      text: ' - [default plugin]',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 4,
                depth: 0,
              },
            },
            '07d0100d-b6c2-4a50-8d28-6a096dbe439a': {
              id: '07d0100d-b6c2-4a50-8d28-6a096dbe439a',
              value: [
                {
                  id: 'a3530476-2a6a-403a-bb21-949e9c24b38a',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/headings',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 5,
                depth: 0,
              },
            },
            'b84e2b50-f267-44cc-b211-a2ea0fe290b1': {
              id: 'b84e2b50-f267-44cc-b211-a2ea0fe290b1',
              value: [
                {
                  id: '7c75f1f1-3219-449a-97cb-6909dc3a3f03',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/blockquote',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 6,
                depth: 0,
              },
            },
            '92503f50-deef-424b-a292-f5367c9bed3d': {
              id: '92503f50-deef-424b-a292-f5367c9bed3d',
              value: [
                {
                  id: '62e8f215-5902-47ca-950e-e4c4427fc4f6',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/accordion',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 7,
                depth: 0,
              },
            },
            '481d2f10-5641-499d-88c9-8bd137f282cf': {
              id: '481d2f10-5641-499d-88c9-8bd137f282cf',
              value: [
                {
                  id: 'a7349694-b8ae-4a08-925c-546b1e2daa03',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/code',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 8,
                depth: 0,
              },
            },
            'ca01aef0-6afb-42ca-bed5-cf85ef553bfb': {
              id: 'ca01aef0-6afb-42ca-bed5-cf85ef553bfb',
              value: [
                {
                  id: '8702fced-7914-4355-b52d-76f7d7b68d32',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/embed',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 9,
                depth: 0,
              },
            },
            '81bcf4c4-929c-42fc-b80c-693bd1849011': {
              id: '81bcf4c4-929c-42fc-b80c-693bd1849011',
              value: [
                {
                  id: 'a8dfa9cf-9eb7-425d-acf8-5b8db5c3eef6',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/image',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 10,
                depth: 0,
              },
            },
            '2128652e-c2b6-43b3-8710-95c2f51ab4d7': {
              id: '2128652e-c2b6-43b3-8710-95c2f51ab4d7',
              value: [
                {
                  id: 'c0100233-0e91-4e13-83ad-c63275b6d536',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/link',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 11,
                depth: 0,
              },
            },
            'f92a683b-afbf-4c2b-a618-8f12106de805': {
              id: 'f92a683b-afbf-4c2b-a618-8f12106de805',
              value: [
                {
                  id: '92345682-488f-4247-948c-0e851e7f440d',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/file',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 12,
                depth: 0,
              },
            },
            'fcd3f089-ccec-487d-a67d-214b47bb7ff9': {
              id: 'fcd3f089-ccec-487d-a67d-214b47bb7ff9',
              value: [
                {
                  id: '8fd937fc-9828-4d30-88c8-edb9d20fb3e6',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/callout',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 13,
                depth: 0,
              },
            },
            'ac82f4ea-614d-49e4-b7e7-7635f0fdfadd': {
              id: 'ac82f4ea-614d-49e4-b7e7-7635f0fdfadd',
              value: [
                {
                  id: 'ac9ded7a-9f0b-476b-8889-5997430a18fe',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/video',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 14,
                depth: 0,
              },
            },
            'bbf3c63d-0fe2-4073-9f61-0142b405f9f4': {
              id: 'bbf3c63d-0fe2-4073-9f61-0142b405f9f4',
              value: [
                {
                  id: 'ec4ac9f5-168e-4662-9b23-5571645ed53b',
                  type: 'bulleted-list',
                  children: [
                    {
                      code: true,
                      text: '@yoopta/lists',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 15,
                depth: 0,
              },
            },
            'd20080e7-32e5-4863-a0ce-54493aecd174': {
              id: 'd20080e7-32e5-4863-a0ce-54493aecd174',
              value: [
                {
                  id: 'f2603e63-a851-4826-a78c-8642d275b413',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'Everything is customizable',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 16,
                depth: 0,
              },
            },
            '4f33fada-df33-449a-8c7d-e023c4984161': {
              id: '4f33fada-df33-449a-8c7d-e023c4984161',
              value: [
                {
                  id: 'dba5400a-0ee6-4de9-9c87-35da197f04c7',
                  type: 'paragraph',
                  children: [
                    {
                      text: "Let's change default styles and shorcuts for ",
                    },
                    {
                      bold: true,
                      text: 'Blockquote',
                    },
                    {
                      text: ' plugin',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'Paragraph',
              meta: {
                order: 17,
                depth: 0,
              },
            },
            'd70f7849-3074-4f20-91d5-91bd00875a19': {
              id: 'd70f7849-3074-4f20-91d5-91bd00875a19',
              value: [
                {
                  children: [
                    {
                      text: "import Blockquote from '@yoopta/blockquote';\n\nconst plugins = [\n  // ...other plugins\n  Blockquote.extend({\n    options: {\n      HTMLAttributes: {\n        className: 'yoopta-main-page-blockquote',\n        spellCheck: true,\n      },\n      shortcuts: ['>', 'bq'],\n    },\n  }),\n];",
                    },
                  ],
                  type: 'code',
                  id: '797607ae-8311-473c-8237-d00b026c90ef',
                  props: {
                    language: 'JavaScript',
                    theme: 'VSCode',
                    nodeType: 'void',
                  },
                },
              ],
              type: 'Code',
              meta: {
                order: 18,
                depth: 0,
              },
            },
            '435fc30a-7a28-4e22-8d13-25f55cd1cb22': {
              id: '435fc30a-7a28-4e22-8d13-25f55cd1cb22',
              value: [
                {
                  id: '8a8631fe-6a27-4d16-ade1-f672ddc429cd',
                  type: 'blockquote',
                  children: [
                    {
                      text: "Oh, it works! I'am Blockquote with new extended styles",
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'Blockquote',
              meta: {
                order: 19,
                depth: 0,
              },
            },
            'f9cd9f75-e540-4af2-a781-6e7dd3043617': {
              id: 'f9cd9f75-e540-4af2-a781-6e7dd3043617',
              value: [
                {
                  id: '859d1e66-0db7-4dd6-b5f6-e10d57b7c006',
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
                order: 20,
                depth: 0,
              },
            },
            '0891b5e3-23d8-48d3-a0d6-8b3906e09c17': {
              id: '0891b5e3-23d8-48d3-a0d6-8b3906e09c17',
              value: [
                {
                  id: '77d5ed37-46fe-409b-ba09-8b709e9f77a2',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'Powerful and optimized Media (image, video, embed, file) plugins',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 21,
                depth: 0,
              },
            },
            '4b80c61b-e12b-4bb6-84b4-594a398b4ba3': {
              id: '4b80c61b-e12b-4bb6-84b4-594a398b4ba3',
              value: [
                {
                  id: '9aba2d14-a81a-4159-b7a6-2df47b58997b',
                  type: 'image',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    nodeType: 'void',
                    src: 'https://res.cloudinary.com/ench-app/image/upload/v1719756417/e608ab26-d8fd-44b6-8859-b35abc4b5558_oifyp1_n8w57k.webp',
                    alt: 'cloudinary',
                    srcSet: '',
                    sizes: {
                      width: 440,
                      height: 372,
                    },
                  },
                },
              ],
              type: 'Image',
              meta: {
                order: 22,
                depth: 0,
              },
            },
            '04fd523b-6ee3-47cc-96b0-d7f85c324996': {
              id: '04fd523b-6ee3-47cc-96b0-d7f85c324996',
              value: [
                {
                  id: '1f9b7259-893b-42a1-92c2-df6fed9abe92',
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
                order: 23,
                depth: 0,
              },
            },
            '66daa343-7dfd-4435-bda6-182ad88c02d2': {
              id: '66daa343-7dfd-4435-bda6-182ad88c02d2',
              value: [
                {
                  id: 'dcce5ae3-883a-4406-b136-26ead4c732d3',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'And even complex plugins like Accordion',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 24,
                depth: 0,
              },
            },
            'f39a0159-6cfc-41fe-b45c-eafd2ace09ca': {
              id: 'f39a0159-6cfc-41fe-b45c-eafd2ace09ca',
              value: [
                {
                  id: 'b85807d9-9273-42eb-8445-40ad24f90390',
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
                order: 25,
                depth: 0,
              },
            },
            '03940588-11a8-4f9d-88d8-fd354e0c9e15': {
              id: '03940588-11a8-4f9d-88d8-fd354e0c9e15',
              value: [
                {
                  id: 'd44c57cc-9b2a-4824-940f-23890a6ea997',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'Exports content in different formats',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 26,
                depth: 0,
              },
            },
            '35f849d0-e9e3-464e-a0cd-ab21ea76e4b7': {
              id: '35f849d0-e9e3-464e-a0cd-ab21ea76e4b7',
              value: [
                {
                  id: '113d1e74-1e48-477d-a55b-d1a715e4da0c',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Using package ',
                    },
                    {
                      bold: true,
                      text: '@yoopta/exports',
                    },
                    {
                      text: ' you can exports content in next formats: HTML, Markdown, text.',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'Paragraph',
              meta: {
                order: 27,
                depth: 0,
              },
            },
            '6eb3c75a-b154-4ab4-8e01-51fff216a125': {
              id: '6eb3c75a-b154-4ab4-8e01-51fff216a125',
              value: [
                {
                  id: '7e1eddbb-ead9-4820-82a3-4a46bde5707e',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Check examples - ',
                    },
                    {
                      text: '',
                    },
                    {
                      id: 'f9365c08-5d31-4f54-8772-fa04f0a15fce',
                      type: 'link',
                      props: {
                        url: 'https://yoopta.dev/examples/withExports',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        title: 'https://yoopta.dev/examples/withExports',
                        nodeType: 'inline',
                      },
                      children: [
                        {
                          text: 'https://yoopta.dev/examples/withExports',
                        },
                      ],
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'Paragraph',
              meta: {
                order: 28,
                depth: 0,
              },
            },
            '98420c02-6ca8-4d7e-bd18-d853e49600f8': {
              id: '98420c02-6ca8-4d7e-bd18-d853e49600f8',
              value: [
                {
                  id: '2c6d0ff0-b36b-4fbb-959d-f801ce7d72e7',
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
                order: 29,
                depth: 0,
              },
            },
            '30a7d255-c5c4-4f11-ae07-0df7d075f1fc': {
              id: '30a7d255-c5c4-4f11-ae07-0df7d075f1fc',
              value: [
                {
                  id: '3f16243e-9feb-404a-9656-a66f2634ad9a',
                  type: 'heading-three',
                  children: [
                    {
                      text: '...and more other features...',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingThree',
              meta: {
                order: 30,
                depth: 0,
              },
            },
            '2f38de53-b102-4125-93cc-10fa2236e1d8': {
              id: '2f38de53-b102-4125-93cc-10fa2236e1d8',
              value: [
                {
                  id: 'f6faf3cf-96b7-4a0d-91a6-6ab51e696154',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Easy setup',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 31,
                depth: 0,
              },
            },
            'b952dccc-778f-4624-b613-24d15d96f2f2': {
              id: 'b952dccc-778f-4624-b613-24d15d96f2f2',
              value: [
                {
                  id: 'fca19d17-e022-44bc-bd92-ba52cdd6fec3',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Default list of powerful plugins',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 32,
                depth: 0,
              },
            },
            '9e5c2dbe-4e17-4bbd-8dc5-426f2e5921bc': {
              id: '9e5c2dbe-4e17-4bbd-8dc5-426f2e5921bc',
              value: [
                {
                  id: '10ff5761-be5b-4531-81b0-d6792496b750',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Many typical solved problems in UX behaviour.',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 33,
                depth: 0,
              },
            },
            '4584a2a8-dc73-41df-902a-243a17fe349d': {
              id: '4584a2a8-dc73-41df-902a-243a17fe349d',
              value: [
                {
                  id: 'a40612e1-0f8a-45ee-998b-e700e269d982',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Media plugins on steroids with optimization and lazy loadings',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 34,
                depth: 0,
              },
            },
            'a7679961-e61f-464a-b0ff-23ac99a0f9ce': {
              id: 'a7679961-e61f-464a-b0ff-23ac99a0f9ce',
              value: [
                {
                  id: '59c7edac-1f87-43a2-9d1c-8bf869c0e016',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Code plugin on steroids with themes and languages',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 35,
                depth: 0,
              },
            },
            '11e15e39-e84c-40fa-91f5-82162bbb0d9c': {
              id: '11e15e39-e84c-40fa-91f5-82162bbb0d9c',
              value: [
                {
                  id: '3eb39b15-b587-44d0-90fd-655f0f20f0d1',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Each plugin can be easily customized and extensible',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 36,
                depth: 0,
              },
            },
            '93a32159-0364-4b5c-84eb-68a53a6e8a07': {
              id: '93a32159-0364-4b5c-84eb-68a53a6e8a07',
              value: [
                {
                  id: 'c93853d6-8a66-421e-8b95-ae73518fffd6',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Drag and drop, nested dnd is supported also',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 37,
                depth: 0,
              },
            },
            '9215d4fd-d244-4bb9-b67b-a6de5c454ee5': {
              id: '9215d4fd-d244-4bb9-b67b-a6de5c454ee5',
              value: [
                {
                  id: 'd5760d90-0ae7-412d-aca8-00693d1d0460',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Selection box for manipulating multiple blocks at once',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 38,
                depth: 0,
              },
            },
            '89fe9031-6b09-4855-b78a-2bc75c57cd62': {
              id: '89fe9031-6b09-4855-b78a-2bc75c57cd62',
              value: [
                {
                  id: 'f20dc798-92d2-405a-ae13-a5d2d7d97532',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'You can create your own plugin',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 39,
                depth: 0,
              },
            },
            'b3eaba67-f7e2-4b7a-8edf-22d698c3d5bd': {
              id: 'b3eaba67-f7e2-4b7a-8edf-22d698c3d5bd',
              value: [
                {
                  id: 'bd4aa392-baed-4107-8290-f26d66510867',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'A list of useful tools (ActionMenu, Toolbar etc.) for the convenience of working with the editor',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 40,
                depth: 0,
              },
            },
            'cecf914b-8220-42bb-9ea6-cc84d3307d6b': {
              id: 'cecf914b-8220-42bb-9ea6-cc84d3307d6b',
              value: [
                {
                  id: 'eb1e99be-f97f-4f5d-a3fc-192ce27639f6',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Automatic lazy loading for media components (eg. embeds)',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 41,
                depth: 0,
              },
            },
            '4e25fa13-2383-4969-b7b5-b76fac675223': {
              id: '4e25fa13-2383-4969-b7b5-b76fac675223',
              value: [
                {
                  id: '15897e24-8426-48a5-8056-492fa06523a0',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Large documents',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 42,
                depth: 0,
              },
            },
            'bc40cc49-dd53-4d95-8d9b-f5798dce198f': {
              id: 'bc40cc49-dd53-4d95-8d9b-f5798dce198f',
              value: [
                {
                  id: 'e5cf3ff7-0790-40d5-aa52-71a97c4b1dec',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Mobile friendly',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 43,
                depth: 0,
              },
            },
            '523c984e-18ad-45b6-a878-83fb948845ce': {
              id: '523c984e-18ad-45b6-a878-83fb948845ce',
              value: [
                {
                  id: '40f3bc48-1a0f-4f9e-99fd-c4824c10bc75',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Indent and outdent for every plugin by tabs and shift+tabs',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 44,
                depth: 0,
              },
            },
            '9c874e1e-97e4-4e7e-90b1-18096f64decd': {
              id: '9c874e1e-97e4-4e7e-90b1-18096f64decd',
              value: [
                {
                  id: 'b417db2e-1822-4dbe-b00e-fa0491275aec',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Editor instance to programmatically control your content',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 45,
                depth: 0,
              },
            },
            'e6c40c26-0301-4a46-9802-397d391ef646': {
              id: 'e6c40c26-0301-4a46-9802-397d391ef646',
              value: [
                {
                  id: 'aa743dc2-46f8-4f7d-86a4-05a82e045500',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Editor events for saving to DB in real-time',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 46,
                depth: 0,
              },
            },
            '51817426-75c5-4d6d-a831-ba9b8bd7d108': {
              id: '51817426-75c5-4d6d-a831-ba9b8bd7d108',
              value: [
                {
                  id: '3b10fa1a-0923-4218-8205-01b5c029ed4a',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Exports in markdown, plain text, html',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 47,
                depth: 0,
              },
            },
            '113437e5-adf5-4959-842f-675a51400417': {
              id: '113437e5-adf5-4959-842f-675a51400417',
              value: [
                {
                  id: '55b8dd47-11ec-4931-9dda-91352891e782',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Shortcuts, hotkeys. And customization for this!',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 48,
                depth: 0,
              },
            },
            'b5d35ba1-bebd-4723-a0e9-07e96c205150': {
              id: 'b5d35ba1-bebd-4723-a0e9-07e96c205150',
              value: [
                {
                  id: 'f29a69c2-3ef2-4043-8a5d-4d7306ccaec2',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'Super AI tools not for HYPE, but for real useful work with editor content - [in progress]',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 49,
                depth: 0,
              },
            },
            '75bdba69-afc8-4d51-a14e-fb65976ef3ff': {
              id: '75bdba69-afc8-4d51-a14e-fb65976ef3ff',
              value: [
                {
                  id: '413d2565-ba06-4811-9c59-ca2149fea5d0',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: 'The soul invested in the development of this editor 💙',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 50,
                depth: 0,
              },
            },
            '5a86be51-6b40-4a92-bd4b-c1dfd6361137': {
              id: '5a86be51-6b40-4a92-bd4b-c1dfd6361137',
              value: [
                {
                  id: 'd1d30052-f305-4f34-ab70-6d0154f06dfd',
                  type: 'bulleted-list',
                  children: [
                    {
                      text: '... and other features that I forgot to write about in this list 😅. Just check it in examples!',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'BulletedList',
              meta: {
                order: 51,
                depth: 0,
              },
            },
            '54483ecc-e1c8-4aca-b022-258022d06291': {
              id: '54483ecc-e1c8-4aca-b022-258022d06291',
              value: [
                {
                  id: '279e009b-e4f2-4754-8e6e-2eb455284da8',
                  type: 'callout',
                  children: [
                    {
                      text: 'Go for more examples  - https://yoopta.dev/examples/withBaseFullSetup',
                    },
                  ],
                  props: {
                    theme: 'info',
                  },
                },
              ],
              type: 'Callout',
              meta: {
                order: 52,
                depth: 0,
              },
            },
            '8c8273f7-69b1-4fd6-961a-7f642d6ece17': {
              id: '8c8273f7-69b1-4fd6-961a-7f642d6ece17',
              value: [
                {
                  id: 'c1501480-1f36-4fcc-b817-1ecf643ffd81',
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
                order: 53,
                depth: 0,
              },
            },
          }}
          style={{
            width: 750,
          }}
        >
          <Buttons onSubmit={onSubmit} />
        </YooptaEditor>
      </div>
    </>
  );
};

const Buttons = ({ onSubmit }: any) => {
  const editor = useYooptaEditor();

  return (
    <div className="flex mt-4 mb-8">
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          Elements.insertElementText(editor, 'Super text');
          // Elements.insertElementText(editor, 'Super text', { at: 'current', as: 'last', marks: { bold: true } });
        }}
      >
        Insert text `Super text`
      </button>
      {/* <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const markdownValue = markdown.deserialize(editor, mdValue);

          editor.setEditorValue(markdownValue);
        }}
      >
        Deserialize from Markdown
      </button>
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          editor.increaseBlockDepth({ at: [0] });
        }}
      >
        Increase
      </button> */}
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const data = editor.getEditorValue();
          console.log('HTML serialize data', html.serialize(editor, data));
        }}
      >
        Serialize to HTML
      </button>
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const value = html.deserialize(
            editor,
            `<h1>HTML <span class="color_h1">Text Formatting</span></h1>
          <div class="w3-clear nextprev">
          <a class="w3-left w3-btn" href="html_styles.asp">❮ Previous</a>
          <a class="w3-right w3-btn" href="html_quotation_elements.asp">Next ❯</a>
          </div>
          <hr>
          <p class="intro">HTML contains several elements for defining text with a special meaning.</p>
          <hr>
          
          <div class="w3-example">
          <h3>Example</h3>
          <div class="w3-white w3-padding notranslate">
          <p><b>This text is bold</b></p>
          <p><i>This text is italic</i></p>
          <p>This is<sub> subscript</sub> and <sup>superscript</sup></p>
          </div>
          <a class="w3-btn w3-margin-top w3-margin-bottom" href="tryit.asp?filename=tryhtml_formatting_intro" target="_blank">Try it Yourself »</a>
          </div>
          <hr>
          
          <h2>HTML Formatting Elements</h2>
          
          <p>Formatting elements were designed to display special types of text:</p>
          <ul>
           <li><code class="w3-codespan">&lt;b&gt;</code> - Bold text</li>
           <li><code class="w3-codespan">&lt;strong&gt;</code> - Important text</li>
           <li><code class="w3-codespan">&lt;i&gt;</code> - Italic text</li>
           <li><code class="w3-codespan">&lt;em&gt;</code> - Emphasized text</li>
           <li><code class="w3-codespan">&lt;mark&gt;</code> - Marked text</li>
           <li><code class="w3-codespan">&lt;small&gt;</code> - Smaller text</li>
           <li><code class="w3-codespan">&lt;del&gt;</code> - Deleted text</li>
           <li><code class="w3-codespan">&lt;ins&gt;</code> - Inserted text</li>
           <li><code class="w3-codespan">&lt;sub&gt;</code> - Subscript text</li>
           <li><code class="w3-codespan">&lt;sup&gt;</code> - Superscript text</li>
          </ul>
          <hr>
          
          <h2>HTML &lt;b&gt; and &lt;strong&gt; Elements</h2>
          <p>The HTML <code class="w3-codespan">&lt;b&gt;</code> element defines bold text, 
          without any extra importance.</p>
          <div class="w3-example">
          <h3>Example</h3>
          <div class="w3-code notranslate htmlHigh">
              <span class="tagnamecolor" style="color:brown"><span class="tagcolor" style="color:mediumblue">&lt;</span>b<span class="tagcolor" style="color:mediumblue">&gt;</span></span>This text is bold<span class="tagnamecolor" style="color:brown"><span class="tagcolor" style="color:mediumblue">&lt;</span>/b<span class="tagcolor" style="color:mediumblue">&gt;</span></span> </div>
          <a class="w3-btn w3-margin-bottom" href="tryit.asp?filename=tryhtml_formatting_b" target="_blank">Try it Yourself »</a>
          </div>
          <p>The HTML <code class="w3-codespan">&lt;strong&gt;</code> element defines text 
          with strong importance. The content inside is typically displayed in bold.</p>
          <div class="w3-example">
          <h3>Example</h3>`,
          );

          editor.setEditorValue(value as YooptaContentValue);
        }}
      >
        Deserialize from HTML
      </button>
      <button className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md" onClick={onSubmit}>
        Get editor data
      </button>
    </div>
  );
};

export default BasicExample;
