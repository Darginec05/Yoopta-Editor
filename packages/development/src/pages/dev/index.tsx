import YooptaEditor, {
  createYooptaEditor,
  Tools,
  useYooptaEditor,
  useYooptaFocused,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
} from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Headings from '@yoopta/headings';
import Image from '@yoopta/image';
import { Bold, Italic, Highlight, CodeMark, Strike, Underline } from '@yoopta/marks';
import Callout from '@yoopta/callout';
import Lists from '@yoopta/lists';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import { html, markdown } from '@yoopta/exports';
import Embed from '@yoopta/embed';
import AccordionPlugin from '@yoopta/accordion';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

import Code from '@yoopta/code';
import { ActionNotionMenuExample } from '../../components/ActionMenuExamples/NotionExample/ActionNotionMenuExample';
import { NotionToolbar } from '../../components/Toolbars/NotionToolbar/NotionToolbar';
import { ACCORDION_BLOCK } from '../../components/customPlugins/Accordion/Accordion';
// import Accordion from '../../components/customPlugins/Accordion/src';
// import Mention from '@yoopta/mention';

const plugins = [
  AccordionPlugin,
  Code,
  File.extend({
    options: {
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'auto');

        return {
          src: data.secure_url,
          format: data.format,
          name: data.name,
          size: data.bytes,
        };
      },
    },
  }),
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        className: 'paragraph-element-extended',
      },
    },
  }),
  Image.extend({
    // renders: {
    //   image: ({ attributes, children, element, blockId }) => {
    //     return (
    //       <div>
    //         <img
    //           draggable={false}
    //           className="yoo-h-mt-6 yoo-h-scroll-m-20"
    //           {...attributes}
    //         />
    //         {children}
    //       </div>
    //     );
    //   },
    // },
    options: {
      maxSizes: {
        maxHeight: 800,
      },
      HTMLAttributes: {
        className: 'image-element-extended',
      },

      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file);

        return {
          src: data.secure_url,
          alt: 'cloudinary',
          fit: 'fill',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Headings.HeadingOne.extend({
    options: {
      HTMLAttributes: {
        className: 'heading-one-element-extended',
        style: {
          color: 'red !important',
        },
      },
    },
  }),
  Headings.HeadingTwo.extend({
    options: {
      HTMLAttributes: {
        className: 'heading-two-element-extended',
      },
    },
  }),
  Headings.HeadingThree,
  Blockquote.extend({
    options: {
      HTMLAttributes: {
        className: 'blockquote-element-extended',
      },
    },
  }),
  Callout.extend({
    options: {
      HTMLAttributes: {
        className: 'callout-element-extended',
      },
    },
  }),
  Lists.BulletedList.extend({
    options: {
      HTMLAttributes: {
        className: 'bulleted-list-element-extended',
      },
    },
  }),
  Lists.NumberedList,
  Lists.TodoList,
  Embed,
  Video.extend({
    options: {
      HTMLAttributes: {
        className: 'video-element-extended',
      },
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'video');
        return {
          src: data.secure_url,
          alt: 'cloudinary',
          fit: 'cover',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Link.extend({
    options: {
      HTMLAttributes: {
        className: 'link-element',
      },
    },
  }),
];

const MARKS = [Bold, Italic, Highlight, CodeMark, Strike, Underline];

const TOOLS: Tools = {
  ActionMenu: {
    // render: ActionNotionMenuExample,
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
    props: {
      // items: ['Callout', 'Blockquote', 'HeadingOne', 'HeadingTwo', 'HeadingThree', 'Image', 'File'],
    },
  },
  Toolbar: {
    render: DefaultToolbarRender,
    // render: NotionToolbar,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rectangleSelectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    editor.on('block:copy', (value) => console.log('BLOCK COPY', value));
  }, []);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={rectangleSelectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        selectionBoxRoot={rectangleSelectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        value={{
          'a1a3f442-bf53-48cd-a32b-6d5f1839a5f4': {
            id: 'a1a3f442-bf53-48cd-a32b-6d5f1839a5f4',
            value: [
              {
                id: 'f85850f9-61dc-44e9-b98a-9fef710fddf3',
                type: 'heading-one',
                children: [
                  {
                    text: 'Noodle is back to life!',
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
          '7e72f14a-8828-4825-82a6-0b4ccc4c7b3b': {
            id: '7e72f14a-8828-4825-82a6-0b4ccc4c7b3b',
            value: [
              {
                id: '587beea3-a4b7-478d-8925-48e5651371f3',
                type: 'paragraph',
                children: [
                  {
                    text: 'Jun 8th, 2024',
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
          '4f22ad34-23d7-442d-b33f-be5d9ac92ac8': {
            id: '4f22ad34-23d7-442d-b33f-be5d9ac92ac8',
            value: [
              {
                id: '73792147-f919-4d57-8ae1-7d61e5e1f6f7',
                type: 'heading-two',
                children: [
                  {
                    text: 'The Noodle Story',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingTwo',
            meta: {
              order: 4,
              depth: 0,
            },
          },
          'f2e44813-704c-4332-84f0-a5294c61b6ba': {
            id: 'f2e44813-704c-4332-84f0-a5294c61b6ba',
            type: 'Blockquote',
            meta: {
              order: 6,
              depth: 0,
            },
            value: [
              {
                id: '42f3a059-a758-4f16-8bef-5337970ffc96',
                type: 'blockquote',
                children: [
                  {
                    text: 'Noodle is a project that has been in the works for a long time now. It has gone through many ups and downs, but it has always been a project that I have been passionate about. I have always believed in the idea behind Noodle and I have always wanted to see it come to life.',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
          },
          '06995f8f-7a83-4e74-ac54-493bb509c017': {
            id: '06995f8f-7a83-4e74-ac54-493bb509c017',
            value: [
              {
                id: '5ac14238-99c7-4db6-b660-27853278781b',
                type: 'heading-three',
                children: [
                  {
                    text: 'Early Beginnings',
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
          '98be65f0-62e8-4665-a26f-8236d97d4a20': {
            id: '98be65f0-62e8-4665-a26f-8236d97d4a20',
            type: 'Callout',
            meta: {
              order: 8,
              depth: 0,
            },
            value: [
              {
                id: 'dac35b1d-0a55-45bf-b1c5-98bba90053be',
                type: 'callout',
                children: [
                  {
                    text: "Noodle as a concept was born during my university years. I had noticed myself using multiple apps just to try and stay on track with my studies. I was using Fantastical for my calendar, Things 3 for my todos, Notion for note taking, sometimes as well handwritten on my iPad using Notability, and many others like a grade calculator to know where I'm standing with my grades.",
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
          },
          'cbf4a33c-1dec-48b5-aea6-ac97774c81b2': {
            id: 'cbf4a33c-1dec-48b5-aea6-ac97774c81b2',
            value: [
              {
                id: '6e5e42f4-2d76-4883-a285-1ce32b17406e',
                type: 'paragraph',
                children: [
                  {
                    text: 'It was all just a bit much, there is no way I needed all of that to manage my studies, and why is there no singular app that can do everything a student needs to stay on track with their studies? Like a GitHub but for students.',
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
          '61fc7dab-e40f-45b5-9f6b-0a915ef5f8c3': {
            id: '61fc7dab-e40f-45b5-9f6b-0a915ef5f8c3',
            value: [
              {
                id: '094c9728-77b6-47a1-9720-5addb317ae3f',
                type: 'heading-three',
                children: [
                  {
                    text: 'The First Attempt',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 10,
              depth: 0,
            },
          },
          '33e7eee1-8f80-49f0-8a36-17c27932a554': {
            id: '33e7eee1-8f80-49f0-8a36-17c27932a554',
            value: [
              {
                id: 'd4c6be6b-722d-4386-9dca-5e678af316ce',
                type: 'paragraph',
                children: [
                  {
                    text: 'Straight out of graduation, I knew I wanted to work on Noodle and try to make it happen. I teamed up with a friend of mine,',
                  },
                  {
                    text: ' ',
                  },
                  {
                    text: 'Sinclair',
                  },
                  {
                    text: ' ',
                  },
                  {
                    text: 'and we started working on it. I would handle the development of the app and he would handle the business side of things.',
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
          'c6a26347-738f-4664-ac9f-d22508b8b386': {
            id: 'c6a26347-738f-4664-ac9f-d22508b8b386',
            value: [
              {
                id: 'aa5708c2-da94-40d0-97cf-4bc471fe7784',
                type: 'paragraph',
                children: [
                  {
                    text: 'The initial launch of the idea of Noodle on GitHub gained massive amounts of traction. We had over 10,000 GitHub stars in no time, without ever being on Product Hunt, Hacker News, or any other platform. It was pure insanity, just from a few tweets.',
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
          '7650a654-6391-42aa-b280-e3706f1cf56f': {
            id: '7650a654-6391-42aa-b280-e3706f1cf56f',
            value: [
              {
                id: '86d81c4c-91e6-4723-9885-aea999467c10',
                type: 'heading-three',
                children: [
                  {
                    text: 'The First Failure',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 13,
              depth: 0,
            },
          },
          'cdf94566-cc41-4ea6-ac16-df039a5b04c1': {
            id: 'cdf94566-cc41-4ea6-ac16-df039a5b04c1',
            value: [
              {
                id: '8d36ae25-3c1e-4ea1-a638-28a70b71ef10',
                type: 'paragraph',
                children: [
                  {
                    text: 'With this amount of traction, we had all the eyes on us. The pressure was on, we had to deliver. Unfortunately, working a full time job and trying to build a startup on the side is not an easy task, added with the hype and pressure, it was a recipe for disaster.',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 14,
              depth: 0,
            },
          },
          'eeaedcd8-6ce1-407d-bcf5-5a62fc8ac747': {
            id: 'eeaedcd8-6ce1-407d-bcf5-5a62fc8ac747',
            value: [
              {
                id: '470b7f94-8f22-4650-905a-c60b2c14ade9',
                type: 'paragraph',
                children: [
                  {
                    text: "Eventually, I had to make a tough decision to put Noodle on hold, I was burning out quickly and I didn't want to ruin the project by releasing something that wasn't up to the standards that I had set for myself.",
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 15,
              depth: 0,
            },
          },
          '6facbcee-ce57-487d-8bd2-f3664b1f6efa': {
            id: '6facbcee-ce57-487d-8bd2-f3664b1f6efa',
            value: [
              {
                id: '97c33242-2e24-4648-9ff0-f2a81b903c8b',
                type: 'heading-two',
                children: [
                  {
                    text: 'The Resurrection',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingTwo',
            meta: {
              order: 16,
              depth: 0,
            },
          },
          '792039fb-c5bf-4a86-97c4-37b5a8e44dfa': {
            id: '792039fb-c5bf-4a86-97c4-37b5a8e44dfa',
            value: [
              {
                id: '8ef8f622-01e2-4206-87b2-2ce9d7f00a55',
                type: 'paragraph',
                children: [
                  {
                    text: 'After a brief period of absence, lasting for 6 months, I am happy to announce that Noodle is back in the works. I have taken the time to reflect on what went wrong the first time around and I have learned so much from that experience.',
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
          '23f8bebb-093c-4952-a0ab-920148a1fdf1': {
            id: '23f8bebb-093c-4952-a0ab-920148a1fdf1',
            value: [
              {
                id: '328f951f-4fc2-4595-8ac1-97a7e15837ea',
                type: 'heading-three',
                children: [
                  {
                    text: 'The Plan Going Forward',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 18,
              depth: 0,
            },
          },
          '2ede98b9-5ffd-4bf9-91b1-c95df7bd11e1': {
            id: '2ede98b9-5ffd-4bf9-91b1-c95df7bd11e1',
            value: [
              {
                id: '19537b45-2a15-4922-bab7-b58ca76fc2ab',
                type: 'paragraph',
                children: [
                  {
                    text: 'First of all, I would like to thank Sinclair for his work towards Noodle. He has decided to step down from the project and I will be the only person working on Noodle for the time being.',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 19,
              depth: 0,
            },
          },
          '708ae5dd-b817-4495-ad4f-180c29d4bd8b': {
            id: '708ae5dd-b817-4495-ad4f-180c29d4bd8b',
            value: [
              {
                id: '182d71a1-d0d7-480e-93bd-b4d1c4a0c012',
                type: 'paragraph',
                children: [
                  {
                    text: 'I have decided to take a different approach this time around, instead of obsessing over every detail and trying to make everything perfect, I will focus on getting a minimum viable product out there as quickly as possible, one that delivers an improvement to the student productivity life, but not one that has everything just yet.',
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
          '1ded8b51-9d1f-4b7c-a6fc-06300f0ab84f': {
            id: '1ded8b51-9d1f-4b7c-a6fc-06300f0ab84f',
            value: [
              {
                id: '7a64909c-6515-4565-8e9c-e5ec5e76e04d',
                type: 'paragraph',
                children: [
                  {
                    text: 'The plan is to deliver an MVP with Note taking and Flashcards. Note taking is the core principle that revolves around every other feature in Noodle, and that will be the first thing I will be working on.',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 21,
              depth: 0,
            },
          },
          'a4a8dc60-9ad0-4146-8708-0210daaeca38': {
            id: 'a4a8dc60-9ad0-4146-8708-0210daaeca38',
            value: [
              {
                id: '9bd67f1a-711d-4f0c-a0c2-bbfba43be034',
                type: 'heading-three',
                children: [
                  {
                    text: 'The Future of Noodle',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 22,
              depth: 0,
            },
          },
          '74591a0b-ba31-4768-8f37-df83edf7e3cd': {
            id: '74591a0b-ba31-4768-8f37-df83edf7e3cd',
            value: [
              {
                id: '2a69668d-37e2-4984-8284-717851455fd7',
                type: 'paragraph',
                children: [
                  {
                    text: 'I am excited to see where this new journey with Noodle will take me. I have learned so much from the first attempt and I am confident that I will be able to deliver something that I can be proud of this time around.',
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
          '69a41510-85ae-4878-893f-2b1ac6833bad': {
            id: '69a41510-85ae-4878-893f-2b1ac6833bad',
            value: [
              {
                id: '4a827497-14e3-42d4-ba39-6ea49783a61b',
                type: 'paragraph',
                children: [
                  {
                    text: "I will be documenting the progress of Noodle on this blog, so make sure to check back regularly for updates on the project. I am excited to have you all along for the ride and I can't wait to see where this new journey with Noodle will take me.",
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 24,
              depth: 0,
            },
          },
          '26702efa-7e8a-42a0-bf37-79bf23704928': {
            id: '26702efa-7e8a-42a0-bf37-79bf23704928',
            value: [
              {
                id: '46672132-baae-42e9-a64a-768003dafc20',
                type: 'heading-three',
                children: [
                  {
                    text: 'Thank You ❤️',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 25,
              depth: 0,
            },
          },
          '80701e4d-3e6f-4914-8928-b1e7d5eadb50': {
            id: '80701e4d-3e6f-4914-8928-b1e7d5eadb50',
            value: [
              {
                id: 'bfb71897-c73a-4cd2-87c1-84e19a5f72a4',
                type: 'paragraph',
                children: [
                  {
                    text: 'I would like to take this opportunity to thank everyone who has supported me and Noodle throughout this journey. Your support means the world to me and I am so grateful for all of the encouragement and kind words that I have received, it has truly been the driving force behind my decision to bring Noodle back to life.',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 26,
              depth: 0,
            },
          },
          '188e8b6e-7cd8-40e8-8c20-57a07ad50537': {
            id: '188e8b6e-7cd8-40e8-8c20-57a07ad50537',
            value: [
              {
                id: '60719c46-3e97-43f2-b5db-0ae25ee69723',
                type: 'paragraph',
                children: [
                  {
                    text: "Thank you to everyone on the early access list, which we have over 4000 people signed up for currently, I can't wait to show you what I have been working on very soon!",
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
          'ca4c7a69-fa5a-402b-a0ce-991266866fea': {
            id: 'ca4c7a69-fa5a-402b-a0ce-991266866fea',
            value: [
              {
                id: '9a03ee6f-ee7e-4c0f-babe-a3a52d583a21',
                type: 'paragraph',
                children: [
                  {
                    text: 'Make sure you join our',
                  },
                  {
                    text: ' ',
                  },
                  {
                    text: 'Discord server',
                  },
                  {
                    text: ' ',
                  },
                  {
                    text: 'if you want to get the latest updates on Noodle and be part of the community.',
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
          '5462ff31-be70-4111-8ab4-a2b3ff6fabb5': {
            id: '5462ff31-be70-4111-8ab4-a2b3ff6fabb5',
            value: [
              {
                id: '1c6ec777-d55a-4d30-b663-92bb1cf06a6e',
                type: 'code',
                props: {
                  nodeType: 'void',
                  language: 'javascript',
                  theme: 'VSCode',
                },
                children: [
                  {
                    text: "const Code = new YooptaPlugin<CodePluginElements, CodeElementProps, CodePluginBlockOptions>({\n  type: 'Code',\n  customEditor: CodeEditor,\n});\n\nexport { Code };",
                  },
                ],
              },
            ],
            type: 'Code',
            meta: {
              order: 3,
              depth: 0,
            },
          },
          '1127b087-9eea-4187-9f7e-8082f7429e50': {
            id: '1127b087-9eea-4187-9f7e-8082f7429e50',
            value: [
              {
                id: '190334e2-ae34-488d-96e8-92047d178890',
                type: 'image',
                props: {
                  src: 'https://res.cloudinary.com/ench-app/image/upload/v1717884037/Screen_Shot_2024-06-07_at_12.47.38_yzsaqs.png',
                  alt: 'cloudinary',
                  srcSet: null,
                  fit: 'fill',
                  sizes: {
                    width: 314,
                    height: 314,
                  },
                  nodeType: 'void',
                },
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
            type: 'Image',
            meta: {
              order: 2,
              depth: 0,
            },
          },
          '2260aab6-a479-4538-9276-a5c9de22fd21': {
            id: '2260aab6-a479-4538-9276-a5c9de22fd21',
            value: [
              {
                id: '97a279ad-419d-490f-bbfd-766fcdc063fe',
                type: 'video',
                props: {
                  src: 'https://res.cloudinary.com/ench-app/video/upload/v1717884052/accordion-plugin_fhrnia.mp4',
                  srcSet: null,
                  sizes: {
                    width: 312,
                    height: 264,
                  },
                  nodeType: 'void',
                  provider: {
                    type: null,
                    id: '',
                  },
                  settings: {
                    controls: false,
                    loop: true,
                    muted: true,
                    autoPlay: true,
                  },
                  fit: 'cover',
                },
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
            type: 'Video',
            meta: {
              order: 5,
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
  );
};

const Buttons = ({ onSubmit }: any) => {
  const editor = useYooptaEditor();
  const isFocused = useYooptaFocused();

  return (
    <div className="flex mt-4 mb-8">
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const data = editor.getEditorValue();
          console.log('MD serialize data', markdown.serialize(editor, data));
        }}
      >
        Serialize to Markdown
      </button>
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const markdownValue = markdown.deserialize(
            editor,
            `# Markdown syntax guide

        ## Headers
        
        # This is a Heading h1
        ## This is a Heading h2
        ###### This is a Heading h6
        
        ## Emphasis
        `,
          );

          console.log('MD deserialized data', markdownValue);
          editor.setEditorValue(markdownValue);
        }}
      >
        Deserialize from Markdown
      </button>
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
