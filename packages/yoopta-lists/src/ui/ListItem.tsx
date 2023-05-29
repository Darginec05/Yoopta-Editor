import { generateId, getElementByPath, createYooptaPlugin } from '@yoopta/editor';
import { Editor, Element, NodeEntry, Path, Text, Transforms } from 'slate';
import { BulletedList, ListChildItemElement, NumberedList } from '../types';
import s from './ListItem.module.scss';

const ListItemRender = ({ attributes, children, HTMLAttributes }) => {
  return (
    <li className={s.listItem} draggable={false} {...HTMLAttributes} {...attributes}>
      {children}
    </li>
  );
};

ListItemRender.displayName = 'ListItem';

const LIST_ITEM_NODE_TYPE = 'list-item';

const ListItemList = createYooptaPlugin<any, ListChildItemElement>({
  type: LIST_ITEM_NODE_TYPE,
  renderer: (editor) => ListItemRender,
  extendEditor(editor) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
      const [node, path] = entry;

      if (Element.isElement(node) && node.type === LIST_ITEM_NODE_TYPE) {
        const childNode = node.children[0];
        if (Element.isElement(childNode) && !Editor.isInline(editor, childNode)) {
          Transforms.unwrapNodes(editor, {
            at: path.concat(0),
          });
        }
      }

      normalizeNode(entry);
    };

    return editor;
  },
  shortcut: '-',
  defineElement: (): ListChildItemElement => ({
    id: generateId(),
    type: 'list-item',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  placeholder: null,
  events: {
    onKeyDown:
      (editor, { hotkeys, defaultNode }) =>
      (event) => {
        if (!editor.selection) return;

        const currentNode = getElementByPath(editor, editor.selection.anchor.path, 'lowest');
        if (currentNode.type !== LIST_ITEM_NODE_TYPE) return;

        const nodeEntry = Editor.above<ListChildItemElement>(editor, {
          at: editor.selection.anchor,
          match: (n) => Element.isElement(n) && n.type === LIST_ITEM_NODE_TYPE,
        });

        if (!nodeEntry) return;

        const { anchor } = editor.selection;
        const [listItemNode, listItemPath] = nodeEntry;
        const [parentNode, parentPath] = Editor.parent(editor, listItemPath) as NodeEntry<BulletedList | NumberedList>;

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
              match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === parentNode.type,
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

          if (isMaxDepth) return;

          const parentNestedNode: BulletedList | NumberedList = {
            ...parentNode,
            id: generateId(),
            type: parentNode.type,
            children: [ListItemList.getPlugin.defineElement()],
          };

          Transforms.wrapNodes(editor, parentNestedNode, { at: listItemPath });
          Transforms.setNodes<BulletedList | NumberedList>(
            editor,
            { data: { depth: currentDepth + 1, skipDrag: true } },
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

          Transforms.setNodes<BulletedList | NumberedList>(
            editor,
            { data: { depth: currentDepth - 1, skipDrag: true } },
            {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
            },
          );
          return;
        }
      },
  },
  exports: {
    markdown: {
      serialize: (node, text) => `- ${text}`,
    },
    html: {
      serialize: (node, children) => {
        console.log('children', children);
        return `<li>${children}</li>`;
      },
      deserialize: {
        nodeName: 'LI',
      },
    },
  },
});

export { ListItemList };
