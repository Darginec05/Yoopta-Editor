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
          blockActionButtons={{
            // drag: null,
            plus: null,
          }}
          value={{
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
                order: 1,
                depth: 0,
              },
            },
            'f2c06884-6809-4bda-9d72-ab4dd24b77c2': {
              id: 'f2c06884-6809-4bda-9d72-ab4dd24b77c2',
              type: 'HeadingOne',
              meta: {
                order: 0,
                depth: 0,
              },
              value: [
                {
                  id: '08cb7f76-ba6d-4112-826f-ef3237ba3851',
                  type: 'heading-one',
                  children: [
                    {
                      text: 'This is heading one',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
            },
            '11c32893-fc27-4b3c-804c-6f971bf64a2e': {
              id: '11c32893-fc27-4b3c-804c-6f971bf64a2e',
              value: [
                {
                  id: '4ff6de89-a750-4b9b-84c9-95c883f1cd77',
                  type: 'heading-one',
                  props: {
                    nodeType: 'block',
                  },
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              type: 'HeadingOne',
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
