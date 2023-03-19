import { getNodeByPath, YoptaComponent } from '@yopta/editor';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Editor, Node, Path } from 'slate';
import s from './ActionMenuList.module.scss';

type LibProps = {
  // items={components} groupRender={() => <div></div>} itemRender={() => <div></div>} trigger={'/'}
  items: YoptaComponent[] | [YoptaComponent[]];
  groupRender?: ReactNode;
  itemRender?: ReactNode;
  trigger?: string | null;
};

type Props = LibProps & {
  editor: Editor;
};

const ActionMenuList = ({ editor, items, itemRender, groupRender, trigger = '/' }: Props) => {
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuShown, setMenuShow] = useState(false);
  const [searchString, setSearchString] = useState('');

  const handleKeyup = (event) => {
    if (!editor.selection) return;

    if (isMenuShown) {
      const parentPath = Path.parent(editor.selection.anchor.path);
      const string = Editor.string(editor, parentPath);

      return setSearchString(string);
    }

    if (event.key === trigger) {
      return setMenuShow(true);
    }
  };

  console.log({ searchString, isMenuShown });

  useEffect(() => {
    const contentEditor = document.querySelector('#yopta-contenteditable');

    if (contentEditor) {
      contentEditor.addEventListener('keyup', handleKeyup);

      return () => contentEditor.removeEventListener('keyup', handleKeyup);
    }
  }, [editor, isMenuShown]);

  return (
    <div
      className={s.dropdown}
      role="dialog"
      aria-modal="true"
      ref={actionMenuRef}
      // style={style}
    >
      <ul className={s.elementList}>
        {/* {elements.map((element, i) => (
          <li
            key={element.type}
            className={cx(s.elementListItem, {
              [s.__active]: isBlockActive(element),
              [s.hovered]: i === focusableElement,
            })}
            data-type={element.type}
          >
            <button
              type="button"
              onMouseDown={(e) => handleChangeNode(e, element.type)}
              className={s.button}
              aria-hidden
            >
              {element.icon} <span>{element.name}</span>
            </button>
          </li>
        ))}
        {notFound && (
          <li className={s.elementListItem}>
            <button type="button" className={s.button}>
              <span>Not found</span>
            </button>
          </li>
        )} */}
      </ul>
    </div>
  );
};

export { ActionMenuList };
