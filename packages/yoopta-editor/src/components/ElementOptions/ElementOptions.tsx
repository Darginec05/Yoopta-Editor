import { Overlay } from './Overlay';
import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import cx from 'classnames';
import { Editor, Element, Path, Transforms } from 'slate';
import TrashIcon from './icons/trash.svg';
import DuplicateIcon from './icons/duplicate.svg';
import TurnIcon from './icons/turn.svg';
import CopyIcon from './icons/copy.svg';
import { useElementSettings } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
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

const ElementOptions = ({ onClose, style, element, render, ...props }: Props) => {
  const editor = useSlate();
  const [, handlers] = useElementSettings();

  // [WIP]
  const handleTurnInto = () => {};

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

  if (render) {
    return (
      <Overlay onClose={onClose}>
        <div style={style} className={s.root}>
          {render({ handleDelete: onDelete, handleDuplicate: onDuplicate, handleCopy: onCopy })}
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose}>
      <div style={style} className={cx(s.root, 'yoopta-element-options')}>
        <div className={s.content}>
          <div className={s.group}>
            <button type="button" className={s.item} onClick={onDelete}>
              <div className={s.icon}>
                <TrashIcon />
              </div>
              <div className={s.text}>Delete</div>
              {/* <div className={s.hotkey}>Del or Ctrl+D</div> */}
            </button>
            <button type="button" className={s.item} onClick={onDuplicate}>
              <div className={s.icon}>
                <DuplicateIcon />
              </div>
              <div className={s.text}>Duplicate</div>
              {/* <div className={s.hotkey}>⌘+D</div> */}
            </button>
            {/* Work in progress */}
            {/* {!isVoid && (
              <button type="button" className={s.item} onClick={handleTurnInto}>
                <div className={s.icon}>
                  <TurnIcon />
                </div>
                <div className={s.text}>Turn into</div>
                <div className={s.hotkey}>{'>'}</div>
              </button>
            )} */}
            <button type="button" className={s.item} onClick={onCopy}>
              <div className={s.icon}>
                <CopyIcon />
              </div>
              <div className={s.text}>Copy link to block</div>
              {/* <div className={s.hotkey}>⌥+Shift+L</div> */}
            </button>
          </div>
          {/* Work in progress */}
          {/* <div className={s.group}>
            <button type="button" className={s.item}>
              <div className={s.icon}></div>
              <div className={s.text}>Caption</div>
              <div className={s.hotkey}>+D</div>
            </button>
          </div> */}
        </div>
      </div>
    </Overlay>
  );
};

export { ElementOptions };
