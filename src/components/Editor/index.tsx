import { createEditor, Descendant, Editor, Range, Transforms } from 'slate';
import { useCallback, useMemo, useState, KeyboardEvent, useRef } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';
import { TextLeaf } from './TextLeaf';
import { Element } from './Element';
import { withShortcuts, withSoftBreak, withInlines, withImages } from './plugins';
import { TextDropdown, Toolbar } from './Toolbar';
import { ParagraphElement } from './custom-types';
import { DEFAULT_STATE, getAbsPositionBySelection, isOpenCMDBar, toggleBlock } from './utils';
import { Fade } from '../Fade';
import { OutsideClick } from '../OutsideClick';

const IGNORED_SOFT_BREAK_ELEMS = ['bulleted-list', 'numbered-list', 'list-item'];

const getInitialData = () => {
  if (typeof window === 'undefined') return [];

  const content = localStorage.getItem('content');

  return content ? JSON.parse(content) : JSON.parse(DEFAULT_STATE);
};

const SlateEditor = () => {
  const [value, setValue] = useState<Descendant[]>(() => getInitialData());
  const [CMDBar, setCMDBar] = useState({
    open: false,
    position: {},
  });
  const editor = useMemo(
    () => withHistory(withImages(withInlines(withShortcuts(withSoftBreak(withReact(createEditor())))))),
    [],
  );
  const CMDBarElementRef = useRef(null);

  const renderLeaf = useCallback((leafProps) => <TextLeaf {...leafProps} />, []);

  const renderElement = useCallback((elemProps) => <Element {...elemProps} />, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { selection } = editor;
    const element = editor.children[selection?.anchor.path[0] || 0];

    const [currentText] = Editor.leaf(editor, editor.selection!.anchor.path);

    if (isOpenCMDBar({ text: currentText.text, event })) {
      setCMDBar({
        open: true,
        position: getAbsPositionBySelection(CMDBarElementRef.current),
      });
      return;
    }

    if (CMDBar.open) {
      setCMDBar({
        open: false,
        position: {},
      });
    }

    if (event.key === 'Enter') {
      const newLine: ParagraphElement = {
        id: v4(),
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      };

      const isListBlock = Editor.above(editor, {
        match: (n) => {
          return Editor.isBlock(editor, n) && n.type === 'list-item';
        },
      });

      if (isListBlock && currentText.text.trim() === '') {
        event.preventDefault();
        toggleBlock(editor, 'paragraph');
      }

      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText('\n');
      }

      if (!event.shiftKey && !IGNORED_SOFT_BREAK_ELEMS.includes(element.type)) {
        event.preventDefault();

        Transforms.insertNodes(editor, newLine);
      }
    }
  };

  const handleBlockClick = (_e: any, type: string) => {
    toggleBlock(editor, type);
    Transforms.insertText(editor, 'Change text', {
      at: editor.selection!.anchor.path,
    });

    setCMDBar({
      open: false,
      position: getAbsPositionBySelection(CMDBarElementRef.current),
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        ref={CMDBarElementRef}
        style={{
          position: 'absolute',
          top: CMDBar.position.top,
          left: CMDBar.position.left,
          zIndex: 2,
        }}
      >
        <Fade show={CMDBar.open}>
          <TextDropdown handleBlockClick={handleBlockClick} selectedElementType={undefined} />
        </Fade>
      </div>

      <div
        style={{
          maxWidth: 680,
          paddingTop: '4rem',
          paddingBottom: '30vh',
          margin: '0 64px',
          width: '100%',
        }}
      >
        <OutsideClick onClose={() => null}>
          <Slate
            editor={editor}
            value={value}
            onChange={(val) => {
              setValue(val);

              const isASTChanged = editor.operations.some((op) => op.type !== 'set_selection');

              if (isASTChanged) {
                const content = JSON.stringify(value);
                localStorage.setItem('content', content);
              }
            }}
          >
            <Toolbar />
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              onKeyDown={onKeyDown}
              decorate={([node, path]) => {
                if (editor.selection) {
                  if (
                    !Editor.isEditor(node)
                    && Editor.string(editor, [path[0]]) === ''
                    && Range.includes(editor.selection, path)
                    && Range.isCollapsed(editor.selection)
                  ) {
                    return [
                      {
                        ...editor.selection,
                        placeholder: true,
                      },
                    ];
                  }
                }
                return [];
              }}
              spellCheck
              // autoFocus
            />
          </Slate>
        </OutsideClick>
      </div>
    </div>
  );
};

export { SlateEditor };
