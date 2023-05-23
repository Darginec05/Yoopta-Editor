import { ToolbarProps } from './Toolbar';
import { cx, UI_HELPERS, useElements, useMarks, useTools, disableBodyScroll, enableBodyScroll } from '@yoopta/editor';
import s from './DefaultToolbar.module.scss';
import { CSSProperties, MouseEvent, useRef, useState } from 'react';
import { Editor, Element, Node } from 'slate';
import { useSlate } from 'slate-react';

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

const DefaultToolbar = ({ getRootProps }: ToolbarProps) => {
  const marks = useMarks();
  const elements = useElements();
  const tools = useTools();
  const editor = useSlate();

  const { ActionMenu } = tools || {};

  const buttonRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [turnIntoElementsProps, setTurnIntoElementsProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const handleTurnInto = (event: MouseEvent) => {
    const buttonRect = buttonRef.current!.getBoundingClientRect();
    const toolbarRect = toolbarRef.current!.getBoundingClientRect();
    const actionMenuRect = document.querySelector('.yoopta-action-menu-list')?.getBoundingClientRect();

    disableBodyScroll(document.body, { reserveScrollBarGap: true });

    const position = {
      left: buttonRect.left - 5,
      top: buttonRect.top + toolbarRect.height + (actionMenuRect?.height || 0) + 5,
    };

    if (position.top > window?.innerHeight) {
      position.top = buttonRect.top - 10;
    }

    setTurnIntoElementsProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const onCloseActionMenu = () => {
    enableBodyScroll(document.body);
    setTurnIntoElementsProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });
  };

  const onToggleActionMenu = () => {
    onCloseActionMenu();
  };

  const activeElementType = Object.keys(elements).find((key) => elements[key].isActive) || '';
  const activeElement = elements[activeElementType];

  return (
    <div {...getRootProps()} className={cx(getRootProps().className, 'yoopta-toolbar')}>
      <div className={s.toolbar} ref={toolbarRef}>
        {turnIntoElementsProps.open && ActionMenu && (
          <UI_HELPERS.Overlay onClose={onCloseActionMenu}>
            {ActionMenu && (
              <ActionMenu
                style={turnIntoElementsProps.style}
                options={{ shouldDeleteText: false }}
                on={{ toggle: onToggleActionMenu }}
              />
            )}
          </UI_HELPERS.Overlay>
        )}
        <div className={s.marks}>
          <button
            type="button"
            ref={buttonRef}
            className={cx(s.elementButton, { [s.elementButtonActive]: turnIntoElementsProps.open })}
            onClick={handleTurnInto}
          >
            <span>{activeElement?.options?.displayLabel || activeElementType}</span>
          </button>
          <div className={s.separator} />
          <button
            type="button"
            className={cx(s.elementButton, { [s.elementButtonActive]: turnIntoElementsProps.open })}
            // onClick={handleTurnInto}
          >
            <span>Link</span>
          </button>
          <div className={s.separator} />
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
