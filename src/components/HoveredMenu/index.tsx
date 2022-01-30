import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { v4 } from 'uuid';
import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import s from './HoveredMenu.module.scss';

const HoveredMenu = ({ element }) => {
  const editor = useSlate();

  return (
    <div className={s.hoverSettings}>
      <button
        type="button"
        onClick={() => {
          // [TODO] - insert after clicked node
          const path = ReactEditor.findPath(editor, element);
          const after = Editor.after(editor, path);

          Transforms.insertNodes(
            editor,
            [
              {
                id: v4(),
                type: 'paragraph',
                children: [{ text: 'FIX ME' }],
              },
            ],
            {
              at: after,
              match: (n) => SlateElement.isElement(n),
            },
          );
        }}
        title="Click to add node"
        className={s.hoverSettingsItem}
      >
        <PlusIcon fill="red" color="red" />
      </button>
    </div>
  );
};

const ElementHover = ({ children, element }) => {
  return (
    <div className={s.hoverItem} data-node-id={element.id}>
      <HoveredMenu element={element} />
      {children}
    </div>
  );
};

export { ElementHover };
