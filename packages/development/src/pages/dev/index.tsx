import YooptaEditor, {
  createYooptaEditor,
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

  useEffect(() => {
    const handleCopy = (value) => console.log('BLOCK COPY', value);
    const handleFocus = (focused) => console.log('FOCUS', focused);

    editor.on('block:copy', handleCopy);
    editor.on('focus', handleFocus);

    return () => {
      editor.off('block:copy', handleCopy);
      editor.off('focus', handleFocus);
    };
  }, []);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  return (
    <>
      {/* <div>
        <MarkdownPreview />
      </div> */}
      {/* <div>
        <HtmlPreview />
      </div> */}
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
            '9d98408d-b990-4ffc-a1d7-387084291b00': {
              id: '9d98408d-b990-4ffc-a1d7-387084291b00',
              value: [
                {
                  id: '0508777e-52a4-4168-87a0-bc7661e57aab',
                  type: 'heading-one',
                  children: [
                    {
                      text: 'Example with full setup of Yoopta-Editor',
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
            'f99045cc-2391-4917-949d-ee3d2f6754b4': {
              id: 'f99045cc-2391-4917-949d-ee3d2f6754b4',
              value: [
                {
                  id: '82587f96-506e-4e89-b958-61acd3ce881a',
                  type: 'callout',
                  children: [
                    {
                      text: 'This example shows you full setup with all features of Yoopta-Editor',
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
            '697aa54b-aea0-4a88-82e5-ec5a6f2c5791': {
              id: '697aa54b-aea0-4a88-82e5-ec5a6f2c5791',
              type: 'HeadingThree',
              meta: {
                order: 3,
                depth: 0,
              },
              value: [
                {
                  id: 'e7cfd6da-0ed1-4849-ae05-f52b9e65c87b',
                  type: 'heading-three',
                  children: [
                    {
                      text: 'F',
                    },
                    {
                      type: 'link',
                      children: [
                        {
                          text: 'AQs',
                        },
                      ],
                      props: {
                        url: 'https://www.youtube.com/watch?v=qwiLWD5x0Ls&ab_channel=shamil_77',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      },
                    },
                    {
                      text: '',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
            },
            '784122f7-2b72-4b19-a1e7-c4a06c013662': {
              id: '784122f7-2b72-4b19-a1e7-c4a06c013662',
              value: [
                {
                  id: 'c2b86108-7236-4a07-9440-f327ab3b16af',
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
            '6f872126-e2dd-451d-8589-74ebd5e072cf': {
              id: '6f872126-e2dd-451d-8589-74ebd5e072cf',
              value: [
                {
                  id: '5cb0df42-3603-4b74-879a-982fb83b82af',
                  type: 'file',
                  props: {
                    size: 212224,
                    name: 'Screen Shot 2024-06-24 at 17.09.39',
                    src: 'https://res.cloudinary.com/ench-app/image/upload/v1719259373/Screen_Shot_2024-06-24_at_17.09.39_hpobs9.png',
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
                order: 2,
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
  const isFocused = useYooptaFocused();
  const [mdValue, setMdValue] = useState('');

  return (
    <div className="flex mt-4 mb-8">
      <textarea value={mdValue} onChange={(e) => setMdValue(e.target.value)} />
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => {
          const data = editor.getEditorValue();
          console.log('plain text serialize data \n', plainText.serialize(editor, data));
        }}
      >
        Serialize to Plaintext
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
          editor.increaseBlockDepth({ at: [0] });
        }}
      >
        Increase
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
