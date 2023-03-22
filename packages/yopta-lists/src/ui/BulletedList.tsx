import { generateId, YoptaComponent } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import { ListItemList } from './ListItem';

const BulletedListRender = ({ attributes, children, element }) => {
  return (
    <ul draggable={false} {...attributes}>
      {children}
    </ul>
  );
};

const BULLETED_LIST_NODE_TYPE = 'bulleted-list';

const BulletedList = new YoptaComponent({
  type: BULLETED_LIST_NODE_TYPE,
  renderer: (editor) => BulletedListRender,
  children: ListItemList,
  createNode: (editor, type, data = {}) => {
    const childNode = {
      id: generateId(),
      type: 'list-item',
      children: [{ text: '' }],
      ...data,
    };

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'code',
      split: true,
    });

    Transforms.setNodes(editor, childNode, {
      at: editor.selection?.anchor,
    });

    const block = { id: generateId(), type: type, children: [{ text: '' }] };

    Transforms.wrapNodes(editor, block, {
      at: editor.selection?.anchor,
    });
  },
});

export { BulletedList };
