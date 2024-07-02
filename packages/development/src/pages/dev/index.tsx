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
import { html, markdown, plainText } from '@yoopta/exports';
import { useEffect, useMemo, useRef, useState } from 'react';
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
            'e5bd3ee7-391c-4a6c-8d99-bd02fae4d4d2': {
              id: 'e5bd3ee7-391c-4a6c-8d99-bd02fae4d4d2',
              value: [
                {
                  id: '7cc1b41e-af96-4728-8422-f0e5ca319439',
                  type: 'accordion-list',
                  children: [
                    {
                      id: '03ffc5a8-4882-44bc-a57b-af9fb773bc52',
                      type: 'accordion-list-item',
                      children: [
                        {
                          id: '3f010f03-1d09-48a3-8b86-4eea5514ba46',
                          type: 'accordion-list-item-heading',
                          children: [
                            {
                              text: 'Why copy/paste and not packaged as a dependency?',
                              italic: true,
                              bold: true,
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                        {
                          id: '87fd7485-9864-478e-9b6d-8d4df789f3b9',
                          type: 'accordion-list-item-content',
                          children: [
                            {
                              text: 'Start with some sensible defaults, then customize the components to your needs.',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                      ],
                      props: {
                        nodeType: 'block',
                        isExpanded: false,
                      },
                    },
                    {
                      id: 'db504063-91e0-40b9-a7de-dec6731c8da9',
                      type: 'accordion-list-item',
                      children: [
                        {
                          id: '0527ee4f-7472-4c6e-8e58-0aee4c84db4e',
                          type: 'accordion-list-item-heading',
                          children: [
                            {
                              text: 'Do you plan to publish it as an npm package?',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                        {
                          id: 'c6e12a11-a248-4385-80ad-36e933ec57f5',
                          type: 'accordion-list-item-content',
                          children: [
                            {
                              text: 'No. I have no plans to publish it as an npm package.',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                      ],
                      props: {
                        nodeType: 'block',
                        isExpanded: false,
                      },
                    },
                    {
                      id: 'f89c14d3-88c6-43f1-b274-1cd32ef3ea2d',
                      type: 'accordion-list-item',
                      children: [
                        {
                          id: 'e058e58c-a56e-4eb2-8602-34b92cb0cc1b',
                          type: 'accordion-list-item-heading',
                          children: [
                            {
                              text: 'Which frameworks are supported?',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                        {
                          id: '7d6b408f-a2f3-428f-89a0-f52b2848d972',
                          type: 'accordion-list-item-content',
                          children: [
                            {
                              text: 'You can use any framework that supports React. ',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                      ],
                      props: {
                        nodeType: 'block',
                        isExpanded: true,
                      },
                    },
                  ],
                },
              ],
              type: 'Accordion',
              meta: {
                order: 2,
                depth: 0,
                align: 'center',
              },
            },
            '6c7970dd-a624-4c42-a809-6863095419ae': {
              id: '6c7970dd-a624-4c42-a809-6863095419ae',
              value: [
                {
                  id: '80ad5c7d-c73c-40bb-b01d-5337357c1f95',
                  type: 'heading-one',
                  props: {
                    nodeType: 'block',
                  },
                  children: [
                    {
                      text: 'Introduction',
                    },
                  ],
                },
              ],
              type: 'HeadingOne',
              meta: {
                order: 0,
                depth: 0,
                align: 'center',
              },
            },
            'b8a6e071-9393-4991-8d28-923d80c255ad': {
              id: 'b8a6e071-9393-4991-8d28-923d80c255ad',
              value: [
                {
                  id: 'fc748dc8-224a-4b6a-a319-cc942ae7de3b',
                  type: 'image',
                  props: {
                    src: 'https://res.cloudinary.com/ench-app/image/upload/v1719855049/hold-up-let-him-cook_s4rrzh.gif',
                    alt: 'cloudinary',
                    srcSet: null,
                    fit: 'fill',
                    sizes: {
                      width: 314,
                      height: 309,
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
                order: 7,
                depth: 0,
              },
            },
            '22d67b35-7897-42ac-92f4-ea00727a526a': {
              id: '22d67b35-7897-42ac-92f4-ea00727a526a',
              value: [
                {
                  id: 'd76ed64a-ff59-4df3-bd0e-f4fd38428883',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
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
                align: 'center',
              },
            },
            '7ddfcf7f-adb6-401f-ba71-08e8830e81da': {
              id: '7ddfcf7f-adb6-401f-ba71-08e8830e81da',
              type: 'NumberedList',
              meta: {
                order: 4,
                depth: 0,
              },
              value: [
                {
                  id: 'fbc9fb6a-3414-4337-a9e1-b88e6484df02',
                  type: 'numbered-list',
                  children: [
                    {
                      text: 'Other color formats',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
            },
            '3bec6a02-f31f-4809-86ac-e405d710ce6a': {
              id: '3bec6a02-f31f-4809-86ac-e405d710ce6a',
              value: [
                {
                  id: '2e5b398b-f997-43bc-a449-02999d657f20',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'See the',
                    },
                    {
                      text: ' ',
                    },
                    {
                      text: '',
                    },
                    {
                      id: '80ea61fd-5fb2-4909-ab33-b7baaef37879',
                      type: 'link',
                      props: {
                        url: 'https://tailwindcss.com/docs/customizing-colors#using-css-variables',
                        target: '',
                        rel: '',
                        title: 'Tailwind CSS documentation',
                        nodeType: 'inline',
                      },
                      children: [
                        {
                          text: 'Tailwind CSS documentation',
                        },
                      ],
                    },
                    {
                      text: ' ',
                    },
                    {
                      text: 'for more information on using',
                    },
                    {
                      text: ' ',
                    },
                    {
                      code: true,
                      text: 'rgb',
                    },
                    {
                      text: ',',
                    },
                    {
                      text: ' ',
                    },
                    {
                      code: true,
                      text: 'rgba',
                    },
                    {
                      text: ' ',
                    },
                    {
                      text: 'or',
                    },
                    {
                      text: ' ',
                    },
                    {
                      code: true,
                      text: 'hsl',
                    },
                    {
                      text: ' ',
                    },
                    {
                      text: 'colors.',
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
            '2ab847d7-c765-4e6f-9116-db6669f49318': {
              id: '2ab847d7-c765-4e6f-9116-db6669f49318',
              value: [
                {
                  id: '9977d4ba-6000-4996-a2fa-3b4ce07f71ee',
                  type: 'numbered-list',
                  children: [
                    {
                      text: 'I recommend using HSL c',
                    },
                    {
                      text: 'olors for theming but you can al',
                      bold: true,
                    },
                    {
                      text: 'so use other color formats if you prefer.',
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
            '9b0a0740-5a6d-4f58-beda-c0ec83fe2168': {
              id: '9b0a0740-5a6d-4f58-beda-c0ec83fe2168',
              value: [
                {
                  id: '8126d743-8102-4dff-ba98-e7a57c69886a',
                  type: 'embed',
                  props: {
                    sizes: {
                      width: 650,
                      height: 400,
                    },
                    nodeType: 'void',
                    provider: {
                      type: 'youtube',
                      id: 'evJ6gX1lp2o',
                      url: 'https://www.youtube.com/watch?v=evJ6gX1lp2o&list=RDevJ6gX1lp2o&index=2&ab_channel=Artemas',
                    },
                  },
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              type: 'Embed',
              meta: {
                order: 8,
                depth: 0,
              },
            },
            'dc8409b8-0c20-4c47-ac60-2b2016393c53': {
              id: 'dc8409b8-0c20-4c47-ac60-2b2016393c53',
              value: [
                {
                  id: 'd6d7fb8a-9785-4c5f-a3c4-7c1ac100881b',
                  type: 'video',
                  props: {
                    src: 'https://res.cloudinary.com/ench-app/video/upload/v1719868158/No_name_not19t.mp4',
                    srcSet: null,
                    sizes: {
                      width: 416,
                      height: 234,
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
                order: 9,
                depth: 0,
              },
            },
            'e805cb24-92ef-4b9f-a551-07d423be06ec': {
              id: 'e805cb24-92ef-4b9f-a551-07d423be06ec',
              value: [
                {
                  id: '423a5be5-0fa5-46a3-8318-73f82d75f86a',
                  type: 'file',
                  props: {
                    size: 13206,
                    name: 'editor',
                    src: 'https://res.cloudinary.com/ench-app/raw/upload/v1719868177/editor_r8vu5j.json',
                    format: 'json',
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
                order: 6,
                depth: 0,
              },
            },
            'ce29e84c-a40e-4a4f-9734-839835cea334': {
              id: 'ce29e84c-a40e-4a4f-9734-839835cea334',
              value: [
                {
                  id: '142342e9-fdb6-4ea0-aa0f-a40569d1d9e0',
                  type: 'code',
                  props: {
                    nodeType: 'void',
                    language: 'javascript',
                    theme: 'VSCode',
                  },
                  children: [
                    {
                      text: 'function getData() {}',
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
