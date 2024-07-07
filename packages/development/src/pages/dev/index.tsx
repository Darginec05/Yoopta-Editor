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
            '36048c70-ce45-4fe6-ad92-70ef6810b88c': {
              id: '36048c70-ce45-4fe6-ad92-70ef6810b88c',
              value: [
                {
                  id: '66260b1b-1efd-4d8f-b6cd-3342480deea7',
                  type: 'heading-two',
                  children: [
                    {
                      text: 'Built-in Constraints',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              type: 'HeadingTwo',
              meta: {
                order: 0,
                depth: 0,
              },
            },
            '02fba3b4-f90e-4fe0-9284-9dff8cf5fa3b': {
              id: '02fba3b4-f90e-4fe0-9284-9dff8cf5fa3b',
              value: [
                {
                  id: '5ae35463-0542-4f9a-b3b2-8f86dc8a132f',
                  type: 'accordion-list',
                  children: [
                    {
                      id: 'c584e4fa-b735-4cd8-9c5e-a9f2ce765fbd',
                      type: 'accordion-list-item',
                      children: [
                        {
                          id: '310aa032-aa99-42e1-b9d4-664a68c0c0ef',
                          type: 'accordion-list-item-heading',
                          children: [
                            {
                              text: 'Built-in Constraints',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                        {
                          id: 'ad3fb9a9-1533-4080-82e1-c102a1e725c9',
                          type: 'accordion-list-item-content',
                          children: [
                            {
                              text: 'Slate editors come with a few built-in constraints out of the box. These constraints are there to make working with content much more predictable than standard contenteditable. All of the built-in logic in Slate depends on these constraints, so unfortunately you cannot omit them. They are...',
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
                    {
                      id: 'caffa035-bfe1-40be-b5a6-e41fcd74f189',
                      type: 'accordion-list-item',
                      children: [
                        {
                          id: '4c5e2f14-4c1f-4a78-803a-27fae2d1fb5d',
                          type: 'accordion-list-item-heading',
                          children: [
                            {
                              text: 'Adding Constraints',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                        {
                          id: 'a1dc9763-e1fa-4e70-88b0-dfe335ae4344',
                          type: 'accordion-list-item-content',
                          children: [
                            {
                              text: "All Element nodes must contain at least one Text descendant — even Void Elements. If an element node does not contain any children, an empty text node will be added as its only child. This constraint exists to ensure that the selection's anchor and focus points (which rely on referencing text nodes) can always be placed inside any node. Without this, empty elements (or void elements) wouldn't be selectable.",
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
                    {
                      id: '7a327ed3-b8d3-41a5-8292-64a2d82b57b6',
                      type: 'accordion-list-item',
                      children: [
                        {
                          id: 'e7b5774a-6bd7-47a1-b8d2-dddedcb28418',
                          type: 'accordion-list-item-heading',
                          children: [
                            {
                              text: 'Multi-pass Normalizing',
                            },
                          ],
                          props: {
                            nodeType: 'block',
                          },
                        },
                        {
                          id: '093afe90-0e9a-4602-81f6-66c55abb7ad7',
                          type: 'accordion-list-item-content',
                          children: [
                            {
                              text: "To do this, you extend the normalizeNode function on the editor. The normalizeNode function gets called every time an operation is applied that inserts or updates a node (or its descendants), giving you the opportunity to ensure that the changes didn't leave it in an invalid state, and correcting the node if so.",
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
                order: 1,
                depth: 0,
              },
            },
            '226f5963-b01c-4b14-a7e8-45f3cf6c6b95': {
              id: '226f5963-b01c-4b14-a7e8-45f3cf6c6b95',
              value: [
                {
                  id: 'dcfc9ee2-db6e-4127-b40c-83bcd465c5dd',
                  type: 'embed',
                  props: {
                    sizes: {
                      width: 650,
                      height: 400,
                    },
                    nodeType: 'void',
                    provider: {
                      type: 'youtube',
                      id: 'bItAw5xgI4I',
                      url: 'https://www.youtube.com/watch?v=bItAw5xgI4I&t=468s',
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
