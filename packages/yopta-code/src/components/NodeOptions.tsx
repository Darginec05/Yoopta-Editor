import { Overlay } from './Overlay';
import { CSSProperties, MouseEvent } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Element, Transforms } from 'slate';
import TrashIcon from './icons/trash.svg';
import DuplicateIcon from './icons/duplicate.svg';
import TurnIcon from './icons/turn.svg';
import CopyIcon from './icons/copy.svg';
import { generateId } from '@yopta/editor';
import s from './NodeOptions.module.scss';

type Props = {
  style: CSSProperties | undefined;
  onClose: (e?: MouseEvent) => void;
  additionalFields?: any;
  element: any;
};

const NodeOptions = ({ onClose, style, element }: Props) => {
  const editor = useSlate();

  const handleDelete = () => {
    try {
      const path = ReactEditor.findPath(editor, element);
      if (!path) return;

      Transforms.removeNodes(editor, {
        at: path, // remove the whole node including inline nodes
        match: (node) => Editor.isEditor(editor) && Element.isElement(node),
        mode: 'highest',
      });

      onClose();
    } catch (error) {}
  };

  const handleDuplicate = () => {
    Editor.withoutNormalizing(editor, () => {
      const path = ReactEditor.findPath(editor, element);
      if (!path) return;

      const currentNodeEntry = Editor.node(editor, path);
      const after = Editor.after(editor, path);

      const currentNode = currentNodeEntry?.[0];

      if (currentNode && !Element.isElement(currentNode)) return;

      const duplicatedNode = deepClone(currentNode);
      duplicatedNode.id = generateId();

      const nextPath = after ? [after.path[0]] : [path[0] + 1];

      Transforms.insertNodes(editor, duplicatedNode, {
        at: nextPath,
        mode: 'highest',
        select: true,
      });

      if (after) {
        ReactEditor.focus(editor);
      }

      onClose();
    });
  };

  const handleTurnInto = () => {};
  const handleCopyLink = () => {
    console.log(`${window.location.href}#${element.id}`);
    onClose();
  };

  const isVoid = Editor.isVoid(editor, element);

  return (
    <Overlay onClose={onClose}>
      <div style={style} className={s.root}>
        <div className={s.content}>
          <div className={s.group}>
            <button type="button" className={s.item} onClick={handleDelete}>
              <div className={s.icon}>
                <TrashIcon />
              </div>
              <div className={s.text}>Delete</div>
              <div className={s.hotkey}>Del or Ctrl+D</div>
            </button>
            <button type="button" className={s.item} onClick={handleDuplicate}>
              <div className={s.icon}>
                <DuplicateIcon />
              </div>
              <div className={s.text}>Duplicate</div>
              <div className={s.hotkey}>⌘+D</div>
            </button>
            {!isVoid && (
              <button type="button" className={s.item} onClick={handleTurnInto}>
                <div className={s.icon}>
                  <TurnIcon />
                </div>
                <div className={s.text}>Turn into</div>
                <div className={s.hotkey}>{'>'}</div>
              </button>
            )}
            <button type="button" className={s.item} onClick={handleCopyLink}>
              <div className={s.icon}>
                <CopyIcon />
              </div>
              <div className={s.text}>Copy link to block</div>
              <div className={s.hotkey}>⌥+Shift+L</div>
            </button>
          </div>
          {/* <div className={s.group}>
            <button type="button" className={s.item} onClick={handleCopyLink}>
              <div className={s.icon}>
                <CaptionIcon />
              </div>
              <div className={s.text}>Filename</div>
              <div className={s.hotkey}>+D</div>
            </button>
          </div> */}
        </div>
      </div>
    </Overlay>
  );
};

export { NodeOptions };
