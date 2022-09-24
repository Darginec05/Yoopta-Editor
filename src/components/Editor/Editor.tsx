import { createEditor, Descendant, Editor, Transforms, Element as SlateElement } from 'slate';
import { useCallback, useMemo, useState, KeyboardEvent, CSSProperties, useRef, MouseEvent } from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 } from 'uuid';
import { TextLeaf } from './TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { withShortcuts, withInlines, withImages, withCorrectVoidBehavior, withFixDeleteFragment } from './plugins';
import { Toolbar } from './Toolbar/Toolbar';
import { ParagraphElement, CustomNode } from './types';
import { DEFAULT_STATE, getRectByCurrentSelection, toggleBlock } from './utils';
import { ELEMENT_TYPES_MAP, IGNORED_SOFT_BREAK_ELEMS } from './constants';
import { ElementsListDropdown } from './ElementsListDropdown/ElementsListDropdown';
import { OutsideClick } from '../OutsideClick';
// import { ElementsListDropdown } from './ElementsListDropdown/ElementsListDropdown';

const CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  position: 'relative',
};

const EDITOR_WRAP_STYLE: CSSProperties = {
  maxWidth: 800,
  paddingTop: '4rem',
  paddingBottom: '30vh',
  margin: 0,
  width: '100%',
};

const getInitialData = () => {
  if (typeof window === 'undefined') return [];

  const content = localStorage.getItem('content');

  return content ? JSON.parse(content) : JSON.parse(DEFAULT_STATE);
};

const SlateEditor = () => {
  const [value, setValue] = useState<Descendant[]>(() => getInitialData());
  const [filterTextValue, setFilterTextValue] = useState('');
  const elementsListPositionRef = useRef<HTMLDivElement>(null);

  const editor = useMemo(
    () => withFixDeleteFragment(
      withHistory(withCorrectVoidBehavior(withImages(withInlines(withShortcuts(withReact(createEditor())))))),
    ),
    [],
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     Transforms.moveNodes(editor, {
  //       // This will again be expanded to a range of the entire node at `[2]`.
  //       at: [0],
  //       // Matches nodes with a longer path, which are the children.
  //       to: [1],
  //       match: (node: Node, path: Path) => {
  //         console.log(node);
  //         return Editor.isBlock(editor, node);
  //       }
  //     });

  //   }, 5000);
  // }, []);

  const showElementsList = () => {
    const selectionRect = getRectByCurrentSelection();

    elementsListPositionRef.current!.style.opacity = '1';
    elementsListPositionRef.current!.style.left = `${selectionRect.left}px`;
    elementsListPositionRef.current!.style.top = `${selectionRect.top + 40}px`;
    elementsListPositionRef.current?.scrollIntoView({ block: 'center', inline: 'center' });
  };

  const hideElementsList = () => {
    elementsListPositionRef.current!.style.opacity = '0';
    elementsListPositionRef.current!.style.left = '-1000px';
    elementsListPositionRef.current!.style.top = '-1000px';
    setFilterTextValue('');
    document.body.classList.remove('no-scroll');
  };

  const onPlusButtonClick = (element) => {
    const path = ReactEditor.findPath(editor, element);
    const after = Editor.after(editor, path);

    const node: CustomNode = {
      id: v4(),
      type: ELEMENT_TYPES_MAP.paragraph,
      isVoid: false,
      children: [{ text: '' }],
    };

    Transforms.insertNodes(editor, node, {
      at: after,
      match: (n) => SlateElement.isElement(n),
    });

    const focusTimeout = setTimeout(() => {
      Transforms.select(editor, after!);
      ReactEditor.focus(editor);

      const selectionTimeout = setTimeout(() => {
        showElementsList();

        clearTimeout(selectionTimeout);
      }, 0);

      clearTimeout(focusTimeout);
    }, 0);

    document.body.classList.add('no-scroll');
  };

  const renderLeaf = useCallback((leafProps) => <TextLeaf {...leafProps} />, []);
  const renderElement = useCallback(
    (elemProps) => <RenderElement onPlusButtonClick={onPlusButtonClick} {...elemProps} />,
    [],
  );

  const onKeyUp = useCallback(() => {
    const text = Editor.string(editor, editor.selection!.anchor.path);
    const isElementsListOpen = window.getComputedStyle(elementsListPositionRef!.current!).opacity === '1';

    if (!isElementsListOpen && text === '/') {
      showElementsList();
    }

    if (isElementsListOpen) {
      setFilterTextValue(text);
    }
  }, [editor]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const { selection } = editor;
    const element: any = editor.children[selection?.anchor.path[0] || 0];
    const text = Editor.string(editor, editor.selection!.anchor.path);
    const isEnterPressed = event.key === 'Enter';

    console.log(selection);

    if (
      (event.key === 'Backspace' && text.length === 0) ||
      isEnterPressed ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Meta'
    ) {
      hideElementsList();
    }

    if (isEnterPressed) {
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
  }, []);

  const handleBlockClick = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    toggleBlock(editor, type, { isVoid: false, children: [{ text: '' }] });
    hideElementsList();
  };

  const filterElementsListBySearchText = useCallback(
    (elementItem) => {
      return (
        elementItem.name.toLowerCase().indexOf(filterTextValue) > -1 ||
        elementItem.type.toLowerCase().indexOf(filterTextValue) > -1
      );
    },
    [filterTextValue],
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

  return (
    <div style={CONTAINER_STYLE}>
      <div style={EDITOR_WRAP_STYLE}>
        <DndProvider backend={HTML5Backend}>
          <Slate editor={editor} value={value} onChange={onChange}>
            <OutsideClick onClose={hideElementsList}>
              <ElementsListDropdown
                ref={elementsListPositionRef}
                filterListCallback={filterElementsListBySearchText}
                handleBlockClick={handleBlockClick}
              />
            </OutsideClick>
            <Toolbar />
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              spellCheck
            />
          </Slate>
        </DndProvider>
      </div>
    </div>
  );
};

export { SlateEditor };
