import { ToolbarProps } from './Toolbar';
import { cx, UI_HELPERS, useElements, useMarks, useTools, disableBodyScroll, enableBodyScroll } from '@yoopta/editor';
import s from './DefaultToolbar.module.scss';
import { CSSProperties, MouseEvent, useRef, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Element, Range } from 'slate';

type TurnInto = {
  style?: CSSProperties;
  open: boolean;
};

const DEFAULT_TURN_INTO_STYLES: TurnInto['style'] = {
  position: 'fixed',
  opacity: 1,
  bottom: 'auto',
  right: 'auto',
};

export const getMatchedLinkNode = (editor: Editor) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    }),
  );

  return match;
};

const DefaultToolbar = ({ getRootProps }: ToolbarProps) => {
  const marks = useMarks();
  const elements = useElements();
  const tools = useTools();
  const editor = useSlate();

  const selectionRef = useRef<Range | null>(null);

  const { ActionMenu, LinkTool } = tools || {};
  const hasActionMenuAsTool = !!ActionMenu;
  const hasLinkAsTool = !!LinkTool && !!elements.link;

  const linkToolButtonRef = useRef<HTMLButtonElement>(null);
  const handleIntoButtonRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [linkToolProps, setLinkToolProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const [turnIntoElementsProps, setTurnIntoElementsProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const handleTurnInto = (event: MouseEvent) => {
    if (!hasActionMenuAsTool) return;

    const handleIntoButtonRect = handleIntoButtonRef.current!.getBoundingClientRect();
    const toolbarRect = toolbarRef.current!.getBoundingClientRect();
    const actionMenuRect = document.querySelector('.yoopta-action-menu-list')?.getBoundingClientRect();

    disableBodyScroll(document.body, { reserveScrollBarGap: true });

    const position = {
      left: handleIntoButtonRect.left - 5,
      top: handleIntoButtonRect.top + toolbarRect.height + (actionMenuRect?.height || 0) + 5,
    };

    if (position.top > window?.innerHeight) {
      position.top = handleIntoButtonRect.top - 10;
    }

    setTurnIntoElementsProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const matchedLink = getMatchedLinkNode(editor);

  const openLinkTools = (event: MouseEvent) => {
    const linkToolButtonRect = linkToolButtonRef.current!.getBoundingClientRect();
    const toolbarRect = toolbarRef.current!.getBoundingClientRect();

    disableBodyScroll(document.body, { reserveScrollBarGap: true });

    const position = {
      left: toolbarRect.left,
      top: toolbarRect.top,
    };

    if (position.top > window?.innerHeight) {
      position.top = linkToolButtonRect.top - 10;
    }

    // Editor.addMark(editor, 'selection', true);
    selectionRef.current = editor.selection;
    ReactEditor.deselect(editor);

    setLinkToolProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const onCloseActionMenu = () => {
    enableBodyScroll(document.body);
    setTurnIntoElementsProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });
  };

  const onCloseLinkTool = () => {
    enableBodyScroll(document.body);
    setLinkToolProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });

    if (selectionRef.current) {
      Editor.removeMark(editor, 'selection');
      selectionRef.current = null;
    }
  };

  const activeElementType = Object.keys(elements).find((key) => elements[key].isActive) || '';
  const activeElement = elements[activeElementType];

  return (
    <div {...getRootProps()} className={cx(getRootProps().className, 'yoopta-toolbar')}>
      <div className={s.toolbar} ref={toolbarRef}>
        {turnIntoElementsProps.open && hasActionMenuAsTool && (
          <UI_HELPERS.Overlay onClose={onCloseActionMenu}>
            <ActionMenu
              style={turnIntoElementsProps.style}
              options={{ shouldDeleteText: false }}
              on={{ toggle: onCloseActionMenu }}
            />
          </UI_HELPERS.Overlay>
        )}
        {linkToolProps.open && hasLinkAsTool && (
          <UI_HELPERS.Overlay onClose={onCloseLinkTool}>
            <LinkTool
              style={linkToolProps.style}
              selection={selectionRef.current}
              on={{ add: onCloseLinkTool, delete: onCloseLinkTool }}
            />
          </UI_HELPERS.Overlay>
        )}
        <div className={s.marks}>
          {hasActionMenuAsTool && (
            <>
              <button
                type="button"
                ref={handleIntoButtonRef}
                className={cx(s.elementButton, { [s.elementButtonActive]: turnIntoElementsProps.open })}
                onClick={handleTurnInto}
              >
                <span>{activeElement?.options?.displayLabel || activeElementType}</span>
              </button>
              <div className={s.separator} />
            </>
          )}
          {hasLinkAsTool && (
            <>
              <button
                type="button"
                ref={linkToolButtonRef}
                className={cx(s.elementButton, { [s.elementButtonActive]: linkToolProps.open || !!matchedLink })}
                onClick={openLinkTools}
              >
                <span>Link</span>
              </button>
              <div className={s.separator} />
            </>
          )}
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.bold.isActive })}
            onClick={() => marks.bold.toggle()}
          >
            <span>
              <b>B</b>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.italic.isActive })}
            onClick={() => marks.italic.toggle()}
          >
            <span>
              <i>I</i>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.underline.isActive })}
            onClick={() => marks.underline.toggle()}
          >
            <span>
              <u>U</u>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.strike.isActive })}
            onClick={() => marks.strike.toggle()}
          >
            <span>
              <s>S</s>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.code.isActive })}
            onClick={() => marks.code.toggle()}
          >
            <span>
              <span>{'</>'}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { DefaultToolbar };
