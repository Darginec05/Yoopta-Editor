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
            '7453ac69-0d2a-4a27-ac48-21de5021c432': {
              id: '7453ac69-0d2a-4a27-ac48-21de5021c432',
              value: [
                {
                  id: '7021ff94-a84f-4ce7-9fcc-cae7eaf2588e',
                  type: 'numbered-list',
                  props: {
                    nodeType: 'block',
                  },
                  children: [
                    {
                      text: 'asd',
                    },
                  ],
                },
              ],
              type: 'NumberedList',
              meta: {
                order: 0,
                depth: 0,
              },
            },
            'c55f8f56-d792-4c3a-aaf0-d90b8391e622': {
              id: 'c55f8f56-d792-4c3a-aaf0-d90b8391e622',
              value: [
                {
                  id: 'acb880d7-5755-4a64-9aa8-7f0b0c87f18e',
                  type: 'numbered-list',
                  children: [
                    {
                      text: 'asdasd',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'NumberedList',
              meta: {
                order: 5,
                depth: 0,
              },
            },
            '4192a57a-3048-4819-a9b2-9bad2839ee38': {
              id: '4192a57a-3048-4819-a9b2-9bad2839ee38',
              value: [
                {
                  id: '0fb531fe-bb2d-4e0b-8422-7a82e95bc4d3',
                  type: 'numbered-list',
                  children: [
                    {
                      text: 'asdasdasd',
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
            'e4283d23-bf3d-4df3-b372-a4cea302e91b': {
              id: 'e4283d23-bf3d-4df3-b372-a4cea302e91b',
              value: [
                {
                  id: '54a57ffd-7c8e-45c4-841d-e2bf07ff9f22',
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
                order: 7,
                depth: 0,
              },
            },
            '8f85a7ea-e606-4684-a5d2-d20ef138080b': {
              id: '8f85a7ea-e606-4684-a5d2-d20ef138080b',
              value: [
                {
                  id: 'd6931777-17b3-469c-83f2-0bf85842ca20',
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
            'ee387b66-62c1-4c01-b9f6-35b2ecb01f1c': {
              id: 'ee387b66-62c1-4c01-b9f6-35b2ecb01f1c',
              value: [
                {
                  id: '6962f986-4d98-40ad-bb85-8262d7492b7f',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'asdasdas',
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
            'e382a6e4-ae76-4b27-9bcb-86b2c699fec4': {
              id: 'e382a6e4-ae76-4b27-9bcb-86b2c699fec4',
              value: [
                {
                  id: '21662b6c-0c59-4fd8-bd85-7b0578fc7cd7',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'dasd',
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
            '1427c85a-2375-4d96-9535-2ec58f2903af': {
              id: '1427c85a-2375-4d96-9535-2ec58f2903af',
              value: [
                {
                  id: 'fc74e476-445a-426c-82d0-247c2440e52a',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'sadsad',
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
            '261951ac-1a43-4c0e-887d-a1cddf310071': {
              id: '261951ac-1a43-4c0e-887d-a1cddf310071',
              value: [
                {
                  id: 'e69c48ae-c423-46a7-965b-cec1669e6c6e',
                  type: 'paragraph',
                  children: [
                    {
                      text: 'asdsadasdasd',
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
