import { generateId, YoptaComponent } from '@yopta/editor';
import { Editor, Element, Transforms } from 'slate';
import s from './TodoList.module.scss';
import { TodoListItem } from './TodoListItem';

const TodoListRender = ({ attributes, children, element }) => {
  return (
    <div draggable={false} {...attributes} className={s.todoList}>
      {children}
    </div>
  );
};

const TODO_LIST_NODE_TYPE = 'todo-list';

const TodoList = new YoptaComponent({
  type: TODO_LIST_NODE_TYPE,
  renderer: (editor) => TodoListRender,
  childComponent: TodoListItem,
  createNode: (editor, type, data = {}) => {
    const childNode = {
      id: generateId(),
      type: 'todo-list-item',
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

export { TodoList };
