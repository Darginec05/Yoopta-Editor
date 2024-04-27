import YooptaEditor, { createYooptaEditor, Tools, YooEditor, YooptaBlockData } from '@yoopta/editor';

import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useEffect, useMemo, useRef, useState } from 'react';

import { NotionToolbar } from '../../components/Toolbars/NotionToolbar/NotionToolbar';
import { value } from '../../utils/defaultValue';
import { MARKS, plugins } from '../../utils/plugins';
// import Mention from '@yoopta/mention';

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
  const [content, setContent] = useState(null);

  useEffect(() => {
    const onSaveToLocalStorage = (val: any) => {
      localStorage.setItem('editorData', JSON.stringify(val));
    };

    editor.on('change', onSaveToLocalStorage);
    return () => editor.off('change', onSaveToLocalStorage);
  }, [content]);

  useEffect(() => {
    const editorData = localStorage.getItem('editorData') || '{}';
    setContent(JSON.parse(editorData));
  }, []);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('editorData', editorData);
  };

  if (!content) return null;

  return (
    <div className="px-[100px]  max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={rectangleSelectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        selectionBoxRoot={rectangleSelectionRef}
        marks={MARKS}
        autoFocus
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        width={750}
        value={content}
      >
        <div className="flex mb-8">
          <button
            className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
            onClick={() => {
              editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
            }}
          >
            Highlight text
          </button>
          <button
            className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
            onClick={() => {
              window.open(`${window.location.href}/render`, 'blank');
            }}
          >
            To render page
          </button>
          <button
            className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
            onClick={() => {
              editor.blocks.Blockquote.toggle({
                focus: true,
              });
            }}
          >
            Toggle block
          </button>
          <button className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md" onClick={onSubmit}>
            Save editor data in LS
          </button>
          <button className="bg-[#007aff] text-[#fff] px-4 py-2 rounded-md" onClick={() => setReadOnly((p) => !p)}>
            Switch readOnly mode
          </button>
        </div>
      </YooptaEditor>
    </div>
  );
};

export default BasicExample;
