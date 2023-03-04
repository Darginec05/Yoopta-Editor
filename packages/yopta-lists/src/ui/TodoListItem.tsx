import { createYoptaComponent, generateId, getNodeByPath } from '@yopta/editor';
import { ChangeEvent } from 'react';
import { Editor, Element, Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import s from './TodoListItem.module.scss';

const TODO_LIST_NODE_ITEM_TYPE = 'todo-list-item';

const TodoListItemRender = (editor: Editor) => {
  return function TodoListItemRender({ attributes, children, element }) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const path = ReactEditor.findPath(editor, element);

      Transforms.setNodes(
        editor,
        { checked: event.target.checked },
        {
          at: path,
          match: (n) => {
            return n.type === TODO_LIST_NODE_ITEM_TYPE;
          },
        },
      );
    };

    return (
      <div draggable={false} {...attributes} className={s.todoListItem}>
        <label className={s.label} contentEditable={false} style={{ userSelect: 'none' }}>
          <input
            type="checkbox"
            value={element.checked}
            checked={element.checked}
            className={s.input}
            onChange={onChange}
          />
        </label>
        <span className={s.children}>{children}</span>
      </div>
    );
  };
};

const TodoListItem = createYoptaComponent({
  type: TODO_LIST_NODE_ITEM_TYPE,
  renderer: TodoListItemRender,
  handlers: {
    onKeyDown:
      (editor, { hotkeys, defaultComponent }) =>
      (event) => {
        Editor.withoutNormalizing(editor, () => {
          if (!editor.selection) return;

          const node = getNodeByPath(editor, editor.selection.anchor.path, 'lowest');
          if (node.type !== TODO_LIST_NODE_ITEM_TYPE) return;

          const todoItemEntry = Editor.above(editor, {
            at: editor.selection?.anchor.path,
            match: (n) => Element.isElement(n) && n.type === TODO_LIST_NODE_ITEM_TYPE,
          });

          if (!todoItemEntry) return;
          const [todoItemNode, todoItemPath] = todoItemEntry;
          const [parentNode, parentPath] = Editor.parent(editor, todoItemPath);

          const text = Editor.string(editor, todoItemPath);
          const isEnd = Editor.isEnd(editor, editor.selection.anchor, todoItemPath);
          const isStart = Editor.isStart(editor, editor.selection.anchor, todoItemPath);

          const currentDepth = todoItemPath.length - 1;
          const isMaxDepth = currentDepth === 2;
          const isMinDepth = currentDepth === 1;

          if (hotkeys.isSoftBreak(event)) {
            event.preventDefault();
            editor.insertText('\n');
            return;
          }

          if (hotkeys.isSplitBlock(event)) {
            event.preventDefault();

            if (text.trim() === '') {
              Transforms.unwrapNodes(editor, {
                match: (n) => Element.isElement(n) && n.type === parentNode.type,
                split: true,
              });

              const candidateNode =
                currentDepth > 1
                  ? { id: generateId(), type: TODO_LIST_NODE_ITEM_TYPE, children: [{ text: '' }], checked: false }
                  : defaultComponent;

              Transforms.setNodes(editor, candidateNode, {
                at: editor.selection,
              });

              return;
            }

            if (!isEnd && !isStart) {
              Transforms.splitNodes(editor);
              Transforms.setNodes(editor, { id: generateId(), checked: false });
              return;
            }

            const todoListItem = {
              ...todoItemNode,
              id: generateId(),
              checked: false,
              children: [
                {
                  text: '',
                },
              ],
            };

            Transforms.insertNodes(editor, todoListItem, { select: true });
            return;
          }

          if (hotkeys.isCmdEnter(event)) {
            event.preventDefault();

            Transforms.setNodes(editor, { checked: todoItemNode.checked ? false : true }, { at: todoItemPath });
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

              Transforms.setNodes(editor, defaultComponent, {
                at: editor.selection,
              });
            }
            return;
          }

          if (hotkeys.isIndent(event)) {
            event.preventDefault();

            if (isMaxDepth) return;

            const parentNestedNode = {
              id: generateId(),
              type: parentNode.type,
              children: [{ text: '' }],
            };

            Transforms.wrapNodes(editor, parentNestedNode, { at: todoItemPath });
            return;
          }

          if (hotkeys.isOutdent(event)) {
            event.preventDefault();
            if (isMinDepth) return;

            Transforms.unwrapNodes(editor, {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
              split: true,
            });

            return;
          }
        });
      },
  },
});

export { TodoListItem };
