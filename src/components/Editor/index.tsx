import { createEditor, Descendant, Editor, Range, Transforms } from 'slate';
import { useCallback, useMemo, useState, KeyboardEvent, CSSProperties } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 } from 'uuid';
import { TextLeaf } from './TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { withShortcuts, withInlines, withImages, withCorrectVoidBehavior } from './plugins';
import { Toolbar } from './Toolbar';
import { ParagraphElement } from './types';
import { DEFAULT_STATE, toggleBlock } from './utils';
import { ELEMENT_TYPES_MAP, IGNORED_SOFT_BREAK_ELEMS } from './constants';

const CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  position: 'relative',
};

const EDITOR_WRAP_STYLE: CSSProperties = {
  maxWidth: 680,
  paddingTop: '4rem',
  paddingBottom: '30vh',
  margin: '0 64px',
  width: '100%',
};

const getInitialData = () => {
  if (typeof window === 'undefined') return [];

  const content = localStorage.getItem('content');

  return content ? JSON.parse(content) : JSON.parse(DEFAULT_STATE);
};

const SlateEditor = () => {
  const [value, setValue] = useState<Descendant[]>(() => getInitialData());

  const editor = useMemo(
    () => withHistory(withCorrectVoidBehavior(withImages(withInlines(withShortcuts(withReact(createEditor())))))),
    [],
  );

  const renderLeaf = useCallback((leafProps) => <TextLeaf {...leafProps} />, []);
  const renderElement = useCallback((elemProps) => <RenderElement {...elemProps} />, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const { selection } = editor;
      const element: any = editor.children[selection?.anchor.path[0] || 0];
      const text = Editor.string(editor, editor.selection!.anchor.path);

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
            return Editor.isBlock(editor, n) && n.type === ELEMENT_TYPES_MAP['list-item'];
          },
        });

        if (isListBlock && text.trim() === '') {
          event.preventDefault();
          toggleBlock(editor, ELEMENT_TYPES_MAP.paragraph);
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
    },
    [],
  );

  const onChange = useCallback((newValue) => {
    setValue(newValue);
    const isASTChanged = editor.operations.some((op) => op.type !== 'set_selection');

    if (isASTChanged) {
      try {
        const content = JSON.stringify(newValue);
        localStorage.setItem('content', content);
      } catch (error) {
        // [TODO] - don't store base64 src in image node
        console.log(error);
      }
    }
  }, []);

  const decorate = useCallback(([node, path]) => {
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
  }, []);

  // const handleBlockClick = (_e: any, type: string) => {
  //   toggleBlock(editor, type);
  //   Transforms.insertText(editor, 'Change text', {
  //     at: editor.selection!.anchor.path,
  //   });

  //   setCMDBar({
  //     open: false,
  //     position: getAbsPositionBySelection(CMDBarElementRef.current),
  //   });
  // };

  return (
    <div style={CONTAINER_STYLE}>
      <div style={EDITOR_WRAP_STYLE}>
        <DndProvider backend={HTML5Backend}>
          <Slate editor={editor} value={value} onChange={onChange}>
            <Toolbar />
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              onKeyDown={onKeyDown}
              decorate={decorate}
              spellCheck
            />
          </Slate>
        </DndProvider>
      </div>
    </div>
  );
};

export { SlateEditor };
