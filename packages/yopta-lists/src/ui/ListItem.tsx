import { generateId, getElementByPath, createYoptaPlugin } from '@yopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';
import { ListChildItemElement } from '../types';
import s from './ListItem.module.scss';

const ListItemRender = ({ attributes, children }) => {
  return (
    <li className={s.listItem} draggable={false} {...attributes}>
      {children}
    </li>
  );
};

ListItemRender.displayName = 'ListItem';

const LIST_ITEM_NODE_TYPE = 'list-item';

const ListItemList = createYoptaPlugin<any, ListChildItemElement>({
  type: LIST_ITEM_NODE_TYPE,
  renderer: (editor) => ListItemRender,
  shortcut: '-',
  events: {
    onKeyDown:
      (editor, { hotkeys, defaultNode }) =>
      (event) => {
        if (!editor.selection) return;

        const currentNode = getElementByPath(editor, editor.selection.anchor.path, 'lowest');
        if (currentNode.type !== LIST_ITEM_NODE_TYPE) return;

        const nodeEntry = Editor.above(editor, {
          at: editor.selection.anchor,
          match: (n) => Element.isElement(n) && n.type === LIST_ITEM_NODE_TYPE,
        });

        if (!nodeEntry) return;

        const { anchor } = editor.selection;
        const [listItemNode, listItemPath] = nodeEntry;
        const [parentNode, parentPath] = Editor.parent(editor, listItemPath);

        const text = Editor.string(editor, listItemPath);
        const isEnd = Editor.isEnd(editor, anchor, listItemPath);
        const isStart = Editor.isStart(editor, anchor, listItemPath);

        const currentDepth = listItemPath.length - 1;
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
                ? { id: generateId(), type: LIST_ITEM_NODE_TYPE, children: [{ text: '' }] }
                : defaultNode;

            Transforms.setNodes(editor, candidateNode, {
              at: editor.selection,
            });

            return;
          }

          // [TODO]
          // if (isStart) {

          // }

          if (!isEnd && !isStart) {
            Transforms.splitNodes(editor);
            Transforms.setNodes(editor, { id: generateId() });
            return;
          }

          const listItem = {
            ...listItemNode,
            id: generateId(),
            children: [
              {
                text: '',
              },
            ],
          };

          Transforms.insertNodes(editor, listItem);
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

          console.log({ currentDepth });

          if (isMaxDepth) return;

          const parentNestedNode = {
            id: generateId(),
            type: parentNode.type,
            children: [{ text: '' }],
          };

          Transforms.wrapNodes(editor, parentNestedNode, { at: listItemPath });
          Transforms.setNodes(
            editor,
            { options: { depth: currentDepth + 1 } },
            {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
            },
          );

          return;
        }

        if (hotkeys.isShiftTab(event)) {
          event.preventDefault();
          if (isMinDepth) return;

          Transforms.unwrapNodes(editor, {
            match: (n) => Element.isElement(n) && n.type === parentNode.type,
            // at: listItemPath,
            split: true,
          });

          Transforms.setNodes(
            editor,
            { options: { depth: currentDepth - 1 } },
            {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
            },
          );
          return;
        }
      },
  },
});

export { ListItemList };
