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
          '41cc6457-d708-493f-bd74-59a623b96a49': {
            id: '41cc6457-d708-493f-bd74-59a623b96a49',
            value: [
              {
                id: '248de772-684b-4f3d-9e5f-fb29594700cb',
                type: 'heading-one',
                props: {
                  nodeType: 'block',
                },
                children: [
                  {
                    text: 'First ',
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
          '0ae59575-78c5-4123-af3f-50bfd64c73b4': {
            id: '0ae59575-78c5-4123-af3f-50bfd64c73b4',
            value: [
              {
                id: '26ee49ff-7eb0-4ad8-b1b3-8176e1838fb2',
                type: 'heading-two',
                props: {
                  nodeType: 'block',
                },
                children: [
                  {
                    text: 'Second',
                  },
                ],
              },
            ],
            type: 'HeadingTwo',
            meta: {
              order: 1,
              depth: 0,
            },
          },
          '30e844f6-5501-4e7d-9ed1-e11d9b03592c': {
            id: '30e844f6-5501-4e7d-9ed1-e11d9b03592c',
            value: [
              {
                id: 'd79596d6-d4af-46cc-a064-10c691792bd4',
                type: 'heading-three',
                props: {
                  nodeType: 'block',
                },
                children: [
                  {
                    text: 'Third',
                  },
                ],
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 2,
              depth: 0,
            },
          },
          '6ca094dc-f6cc-441c-bdd0-936e473ab93b': {
            id: '6ca094dc-f6cc-441c-bdd0-936e473ab93b',
            value: [
              {
                id: 'ea5205eb-bb55-4af0-8e94-7dc9d29eb23d',
                type: 'paragraph',
                children: [
                  {
                    text: 'paragraph',
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
          '1557f6b3-a573-442f-8bdf-ca09fc3bc83a': {
            id: '1557f6b3-a573-442f-8bdf-ca09fc3bc83a',
            value: [
              {
                id: 'f5d15bc1-2dd9-4e23-93ac-6a7068698511',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'bullet-item',
                  },
                ],
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 4,
              depth: 0,
            },
          },
          '3e42a2df-5cbd-4e5e-b86b-7bccdf93bac0': {
            id: '3e42a2df-5cbd-4e5e-b86b-7bccdf93bac0',
            value: [
              {
                id: '7106da3b-4e83-443b-955e-f071ce57c663',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'bullet-item',
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
          '0c7bce51-8737-422c-9c5a-3d22fdda9f6e': {
            id: '0c7bce51-8737-422c-9c5a-3d22fdda9f6e',
            value: [
              {
                id: '670f63da-0365-4248-9fab-5784d5ad83e5',
                type: 'numbered-list',
                props: {
                  nodeType: 'block',
                },
                children: [
                  {
                    text: 'sadasdsa',
                  },
                ],
              },
            ],
            type: 'NumberedList',
            meta: {
              order: 6,
              depth: 0,
            },
          },
          '72424a2b-c93f-442b-a52a-fd9cf14839e1': {
            id: '72424a2b-c93f-442b-a52a-fd9cf14839e1',
            value: [
              {
                id: 'b9bdac7d-b3b8-40ee-9189-09ffbbb3cfa3',
                type: 'numbered-list',
                children: [
                  {
                    text: 'dsadsadasd',
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
          '5144a45d-ce4d-48e8-b8d6-892903bd1884': {
            id: '5144a45d-ce4d-48e8-b8d6-892903bd1884',
            value: [
              {
                id: '047304d7-1929-4b3e-b409-dae057c9928c',
                type: 'todo-list',
                props: {
                  checked: false,
                },
                children: [
                  {
                    text: 'checkbox',
                  },
                ],
              },
            ],
            type: 'TodoList',
            meta: {
              order: 8,
              depth: 0,
            },
          },
          '72505d70-a783-4461-935f-b2dcc62a6304': {
            id: '72505d70-a783-4461-935f-b2dcc62a6304',
            value: [
              {
                id: 'e25d50c0-4525-46a3-a80e-065ef23f77fb',
                type: 'todo-list',
                children: [
                  {
                    text: 'checkbox 2',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'TodoList',
            meta: {
              order: 9,
              depth: 0,
            },
          },
          'e548758e-a824-4469-8592-19db48a9ff4b': {
            id: 'e548758e-a824-4469-8592-19db48a9ff4b',
            value: [
              {
                id: 'd98bf12e-5e4e-46d7-860e-d97985cb7c37',
                type: 'code',
                props: {
                  nodeType: 'void',
                  language: 'javascript',
                  theme: 'VSCode',
                },
                children: [
                  {
                    text: 'function getCode() {}',
                  },
                ],
              },
            ],
            type: 'Code',
            meta: {
              order: 10,
              depth: 0,
            },
          },
          '2550030a-cb66-49dd-9ad6-b6a45dbbd194': {
            id: '2550030a-cb66-49dd-9ad6-b6a45dbbd194',
            value: [
              {
                id: 'c434f4fd-98f9-4c74-9033-808055b0dc97',
                type: 'image',
                props: {
                  src: 'https://res.cloudinary.com/ench-app/image/upload/v1718296658/ebae34f8d6a5a62c453e5b09f2994489_o5rzdp.jpg',
                  alt: 'cloudinary',
                  srcSet: null,
                  fit: 'fill',
                  sizes: {
                    width: 640,
                    height: 660,
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
              order: 12,
              depth: 0,
            },
          },
          'e93d4bdf-ef30-44c9-8615-3d18682561b8': {
            id: 'e93d4bdf-ef30-44c9-8615-3d18682561b8',
            value: [
              {
                id: 'ade9b6c0-020a-4532-919d-0dea7bc3638f',
                type: 'file',
                props: {
                  size: 533360,
                  name: 'Screen Shot 2024-06-13 at 16.19.56',
                  src: 'https://res.cloudinary.com/ench-app/image/upload/v1718296648/Screen_Shot_2024-06-13_at_16.19.56_januwr.png',
                  format: 'png',
                  nodeType: 'void',
                },
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
            type: 'File',
            meta: {
              order: 11,
              depth: 0,
            },
          },
          'e3447578-f8ab-4a5d-b31d-c2d74d7f8403': {
            id: 'e3447578-f8ab-4a5d-b31d-c2d74d7f8403',
            value: [
              {
                id: '80d72f03-744a-4e77-b2ad-41f483c1364a',
                type: 'blockquote',
                children: [
                  {
                    text: 'blockquote',
                  },
                ],
              },
            ],
            type: 'Blockquote',
            meta: {
              order: 13,
              depth: 0,
            },
          },
          '3e146b04-b00e-4321-b38f-c0e362b52784': {
            id: '3e146b04-b00e-4321-b38f-c0e362b52784',
            value: [
              {
                id: '12c0d3fe-23e3-431e-8b0f-e2ccb634d7b1',
                type: 'callout',
                props: {
                  theme: 'default',
                },
                children: [
                  {
                    text: 'callout',
                  },
                ],
              },
            ],
            type: 'Callout',
            meta: {
              order: 14,
              depth: 0,
            },
          },
          '11b2336f-ba64-412a-9568-d9474cfcae74': {
            id: '11b2336f-ba64-412a-9568-d9474cfcae74',
            value: [
              {
                id: 'c3d30c5d-15dd-40c4-9f7c-e860bcba5ba1',
                type: 'video',
                props: {
                  src: 'https://res.cloudinary.com/ench-app/video/upload/v1718296710/link-tool_vymer5.mp4',
                  srcSet: null,
                  sizes: {
                    width: 1708,
                    height: 1460,
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
              order: 15,
              depth: 0,
            },
          },
          'd07396a6-b9df-4dec-95f4-c0da616c7da7': {
            id: 'd07396a6-b9df-4dec-95f4-c0da616c7da7',
            value: [
              {
                id: '825b0931-0771-4f93-9500-23e0ccd39d01',
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
              order: 16,
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
  const [mdValue, setMdValue] = useState('');

  return (
    <div className="flex mt-4 mb-8">
      <textarea value={mdValue} onChange={(e) => setMdValue(e.target.value)} />
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const data = editor.getEditorValue();
          console.log('MD serialize data \n', markdown.serialize(editor, data));
        }}
      >
        Serialize to Markdown
      </button>
      <button
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
