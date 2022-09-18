import { useRef, useState, MouseEvent, useEffect } from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { ReactEditor } from 'slate-react';
import { v4 } from 'uuid';
import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import { ElementList } from '../Editor/Toolbar';
import { Fade } from '../Fade';
import { OutsideClick } from '../OutsideClick';
import s from './HoveredMenu.module.scss';

export const HoveredMenuItem = ({ element, editor }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const elementListRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);

  const togglePlusButton = () => {
    if (isOpenMenu) setIsOpenMenu(false);
    else setIsOpenMenu(true);
  };

  const handleBlockClick = (_e: any, type: string) => {
    console.log({ type });

    // // [TODO] - insert after clicked node
    // const path = ReactEditor.findPath(editor, element);
    // const after = Editor.after(editor, path);

    // console.log({ path, after });

    // const paragraph = {
    //   id: v4(),
    //   type: 'paragraph',
    //   isVoid: false,
    //   children: [{ text: 'Type text' }],
    // };

    // Transforms.insertNodes(editor, [paragraph], {
    //   at: after,
    //   match: (n) => SlateElement.isElement(n),
    //   // select: true,
    // });

    // // const point = Editor.end(editor, after!.path);
    // // console.log({ point });

    // // if (point) {
    // //   Transforms.select(editor, point);
    // // }

    // Transforms.select(editor, after?.path);
  };

  useEffect(() => {
    if (elementListRef.current && isOpenMenu) {
      const elementListRect = elementListRef.current.getBoundingClientRect();
      const plusButtonRect = plusButtonRef.current!.getBoundingClientRect();

      if (plusButtonRect.top < elementListRect.height) {
        elementListRef.current.style.top = 'calc(100% + 10px)';
        elementListRef.current.style.bottom = 'auto';
      }
    }
  }, [elementListRef.current, plusButtonRef.current, isOpenMenu]);

  return (
    <OutsideClick onClose={() => setIsOpenMenu(false)}>
      <div className={s.hoverSettings} style={isOpenMenu ? { opacity: 1 } : undefined}>
        <button
          type="button"
          onClick={() => setIsOpenMenu(true)}
          disabled={isOpenMenu}
          title="Click to add node"
          className={s.hoverSettingsItem}
          ref={plusButtonRef}
        >
          <PlusIcon />
          <div>
            <Fade show={isOpenMenu}>
              <ElementList ref={elementListRef} handleBlockClick={handleBlockClick} />
            </Fade>
          </div>
        </button>
        <button type="button" title="Click to add node" className={s.hoverSettingsItem}>
          <DragIcon />
        </button>
      </div>
    </OutsideClick>
  );
};
