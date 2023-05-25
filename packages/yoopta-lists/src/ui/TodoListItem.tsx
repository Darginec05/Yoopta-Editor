import {
  generateId,
  getElementByPath,
  cx,
  YooEditor,
  createYooptaPlugin,
  RenderYooptaElementProps,
} from '@yoopta/editor';
import { ChangeEvent } from 'react';
import { Editor, Element, NodeEntry, Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { TodoList, TodoListChildItemElement, TodoListItemOptions } from '../types';
import s from './TodoListItem.module.scss';

const TODO_LIST_NODE_ITEM_TYPE = 'todo-list-item';

const TodoListItemRender = (editor: YooEditor) => {
  return function TodoListItemRender({
    attributes,
    children,
    element,
    HTMLAttributes,
  }: RenderYooptaElementProps<TodoListChildItemElement>) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const path = ReactEditor.findPath(editor, element);

      Transforms.setNodes<TodoListChildItemElement>(
        editor,
        { data: { checked: event.target.checked } },
        {
          at: path,
          match: (n) => Element.isElement(n) && n.type === TODO_LIST_NODE_ITEM_TYPE,
        },
      );
    };

    const isChecked = element.data.checked;

    return (
      <div
        draggable={false}
        {...attributes}
        {...HTMLAttributes}
        className={cx(s.todoListItem, { [s.checked]: isChecked })}
      >
        <label className={s.label} contentEditable={false} style={{ userSelect: 'none' }}>
          <input type="checkbox" checked={isChecked} className={s.input} onChange={onChange} />
        </label>
        <span className={s.children}>{children}</span>
      </div>
    );
  };
};

const TodoListItem = createYooptaPlugin<TodoListItemOptions, TodoListChildItemElement>({
  type: TODO_LIST_NODE_ITEM_TYPE,
  renderer: TodoListItemRender,
  placeholder: null,
  defineElement: () => ({
    id: generateId(),
    type: 'todo-list-item',
    children: [{ text: '' }],
    nodeType: 'block',
    data: { checked: false },
  }),
  events: {
    onKeyDown:
      (editor, { hotkeys, defaultNode }) =>
      (event) => {
        if (!editor.selection) return;

        const node = getElementByPath(editor, editor.selection.anchor.path, 'lowest');
        if (node.type !== TODO_LIST_NODE_ITEM_TYPE) return;

        const todoItemEntry = Editor.above<TodoListChildItemElement>(editor, {
          at: editor.selection?.anchor.path,
          match: (n) => Element.isElement(n) && n.type === TODO_LIST_NODE_ITEM_TYPE,
        });

        if (!todoItemEntry) return;
        const [todoItemNode, todoItemPath] = todoItemEntry;
        const [parentNode, parentPath] = Editor.parent(editor, todoItemPath) as NodeEntry<TodoList>;

        const text = Editor.string(editor, todoItemPath);
        const isEnd = Editor.isEnd(editor, editor.selection.anchor, todoItemPath);
        const isStart = Editor.isStart(editor, editor.selection.anchor, todoItemPath);

        const currentDepth = todoItemPath.length - 1;
        const isMaxDepth = currentDepth === 2;
        const isMinDepth = currentDepth === 1;

        if (hotkeys.isShiftEnter(event)) {
          event.preventDefault();
          editor.insertText('\n');
          return;
        }

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          if (text.trim() === '') {
            Transforms.unwrapNodes(editor, {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
              split: true,
            });

            const candidateNode =
              currentDepth > 1
                ? {
                    id: generateId(),
                    type: TODO_LIST_NODE_ITEM_TYPE,
                    children: [{ text: '' }],
                    options: { checked: false },
                  }
                : defaultNode;

            Transforms.setNodes(editor, candidateNode, {
              at: editor.selection,
            });

            return;
          }

          if (!isEnd && !isStart) {
            Transforms.splitNodes(editor);
            Transforms.setNodes<TodoListChildItemElement>(
              editor,
              { id: generateId(), data: { checked: false } },
              {
                match: (n) => Element.isElement(n) && n.type === TODO_LIST_NODE_ITEM_TYPE,
              },
            );
            return;
          }

          const todoListItem: TodoListChildItemElement = {
            ...todoItemNode,
            id: generateId(),
            children: [
              {
                text: '',
              },
            ],
            data: { checked: false },
          };

          Transforms.insertNodes(editor, todoListItem, { select: true });
          return;
        }

        if (hotkeys.isCmdEnter(event)) {
          event.preventDefault();

          Transforms.setNodes<TodoListChildItemElement>(
            editor,
            { data: { checked: todoItemNode.data.checked ? false : true } },
            { at: todoItemPath, match: (n) => Element.isElement(n) && n.type === TODO_LIST_NODE_ITEM_TYPE },
          );
          return;
        }

        if (hotkeys.isBackspace(event)) {
          const [, firstPath] = Editor.first(editor, parentPath);
          const isFirstListItemNode = Path.compare(editor.selection.anchor.path, firstPath) === 0;

          if (isStart && isFirstListItemNode) {
            event.preventDefault();

            Transforms.unwrapNodes(editor, {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
              split: true,
            });

            Transforms.setNodes(editor, defaultNode, {
              at: editor.selection,
            });
          }
          return;
        }

        if (hotkeys.isTab(event)) {
          event.preventDefault();

          if (isMaxDepth) return;

          const parentNestedNode: TodoList = {
            ...parentNode,
            id: generateId(),
            type: parentNode.type,
            children: [TodoListItem.getPlugin.defineElement()],
          };

          Transforms.wrapNodes(editor, parentNestedNode, { at: todoItemPath });
          return;
        }

        if (hotkeys.isShiftTab(event)) {
          event.preventDefault();
          if (isMinDepth) return;

          Transforms.unwrapNodes(editor, {
            match: (n) => Element.isElement(n) && n.type === parentNode.type,
            split: true,
          });

          return;
        }
      },
  },
  options: {
    checked: false,
  },
  exports: {
    markdown: {
      serialize: (node, text) => {
        return `[${node.data.checked ? 'x' : ' '}] ${text}\n`;
      },
    },
    html: {
      serialize: (node, children) => {
        const isChecked = node.data.checked;
        return `<div>[${isChecked ? 'x' : ' '}] ${children}</div>`;
      },
    },
  },
});

export { TodoListItem };
