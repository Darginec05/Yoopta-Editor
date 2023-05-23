import { Overlay } from './Overlay';
import { CSSProperties, MouseEvent, ReactNode, useRef, useState } from 'react';
import { useSlate } from 'slate-react';
import cx from 'classnames';
import { Editor } from 'slate';
import TrashIcon from './icons/trash.svg';
import DuplicateIcon from './icons/duplicate.svg';
import TurnIcon from './icons/turn.svg';
import CopyIcon from './icons/copy.svg';
import { useElementSettings } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { useTools } from '../../contexts/YooptaContext/YooptaContext';
import s from './ElementOptions.module.scss';

type RenderProps = {
  handleDelete?: () => void;
  handleDuplicate?: () => void;
  handleCopy?: () => void;
};

type Props = {
  style: CSSProperties | undefined;
  onClose: (e?: MouseEvent) => void;
  additionalFields?: any;
  element: any;
  render?: (props: RenderProps) => ReactNode;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onCopy?: () => void;
};

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

const ElementOptions = ({ onClose, style, element, render, ...props }: Props) => {
  const [turnIntoElementsProps, setTurnIntoElementsProps] = useState<TurnInto>({
    style: DEFAULT_TURN_INTO_STYLES,
    open: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const tools = useTools();
  const [, handlers] = useElementSettings();

  const { ActionMenu } = tools || {};

  // [WIP]
  const handleTurnInto = (event: MouseEvent) => {
    const containerRect = containerRef.current!.getBoundingClientRect();
    const actionMenuRect = document.querySelector('.yoopta-action-menu-list')?.getBoundingClientRect();

    const position = {
      left: containerRect.left + containerRect.width + 10,
      top: containerRect.top + containerRect.height,
    };

    if (actionMenuRect && position.left + actionMenuRect.width > window.innerWidth) {
      position.left = containerRect.left - actionMenuRect.width - 10;
    }

    if (actionMenuRect && position.top < actionMenuRect.height) {
      position.top = actionMenuRect.height + 20;
    }

    setTurnIntoElementsProps((prevProps) => ({
      open: !prevProps.open,
      style: { ...prevProps.style, ...position },
    }));
  };

  const isVoid = Editor.isVoid(editor, element);

  const onDelete = () => {
    handlers.deleteNode();
    props.onDelete?.();
  };

  const onDuplicate = () => {
    handlers.duplicateNode();
    props.onDuplicate?.();
  };

  const onCopy = () => {
    handlers.copyLinkNode();
    props.onCopy?.();
  };

  const onCloseActionMenu = () => setTurnIntoElementsProps({ style: DEFAULT_TURN_INTO_STYLES, open: false });

  const onToggleActionMenu = () => {
    onCloseActionMenu();
    handlers.closeNodeSettings();
  };

  /* Work in progress */
  // if (render) {
  //   return (
  //     <Overlay onClose={onClose}>
  //       <div style={style} className={s.root}>
  //         {render({ handleDelete: onDelete, handleDuplicate: onDuplicate, handleCopy: onCopy })}
  //       </div>
  //     </Overlay>
  //   );
  // }

  return (
    <Overlay onClose={onClose}>
      <div style={style} className={cx(s.root, 'yoopta-element-options')} ref={containerRef}>
        <div className={s.content}>
          {turnIntoElementsProps.open && ActionMenu && (
            <Overlay onClose={onCloseActionMenu}>
              {ActionMenu && (
                <ActionMenu
                  style={turnIntoElementsProps.style}
                  options={{ shouldDeleteText: false }}
                  on={{ toggle: onToggleActionMenu }}
                />
              )}
            </Overlay>
          )}
          <div className={s.group}>
            <button type="button" className={s.item} onClick={onDelete}>
              <div className={s.icon}>
                <TrashIcon />
              </div>
              <div className={s.text}>Delete</div>
            </button>
            <button type="button" className={s.item} onClick={onDuplicate}>
              <div className={s.icon}>
                <DuplicateIcon />
              </div>
              <div className={s.text}>Duplicate</div>
            </button>
            {/* Work in progress */}
            {!isVoid && (
              <button type="button" className={s.item} onClick={handleTurnInto}>
                <div className={s.icon}>
                  <TurnIcon />
                </div>
                <div className={s.text}>Turn into</div>
              </button>
            )}
            <button type="button" className={s.item} onClick={onCopy}>
              <div className={s.icon}>
                <CopyIcon />
              </div>
              <div className={s.text}>Copy link to block</div>
            </button>
          </div>
          {/* Work in progress */}
          {/** [TODO] - add ability for custom options  */}
        </div>
      </div>
    </Overlay>
  );
};

export { ElementOptions };
