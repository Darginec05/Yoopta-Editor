import { generateId, YoptaComponent } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import { ListItemList } from './ListItem';

const NumberedListRender = ({ attributes, children }) => {
  return (
    <ol draggable={false} {...attributes}>
      {children}
    </ol>
  );
};

const NUMBERED_LIST_NODE_TYPE = 'numbered-list';

const NumberedList = new YoptaComponent({
  type: NUMBERED_LIST_NODE_TYPE,
  renderer: (editor) => NumberedListRender,
  childComponent: ListItemList,
  shortcut: '1.',
  createNode: (editor, type, data = {}) => {
    const childNode = {
      id: generateId(),
      type: 'list-item',
      children: [{ text: '' }],
      ...data,
    };

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.options?.depth >= 1,
      split: true,
    });

    Transforms.setNodes(editor, childNode, {
      at: editor.selection?.anchor,
    });

    const block = { id: generateId(), type: type, children: [{ text: '' }], options: { depth: 1 } };

    Transforms.wrapNodes(editor, block, {
      at: editor.selection?.anchor,
    });
  },
});

export { NumberedList };
