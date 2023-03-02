import { createYoptaComponent, generateId, getNodeByPath } from '@yopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';
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

const ListItemList = createYoptaComponent({
  type: LIST_ITEM_NODE_TYPE,
  renderer: (editor) => ListItemRender,
  handlers: {
    onKeyDown:
      (editor, { hotkeys, defaultComponent }) =>
      (event) => {
        Editor.withoutNormalizing(editor, () => {
          if (!editor.selection) return;

          const currentNode = getNodeByPath(editor, editor.selection.anchor.path, 'lowest');

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

          console.log({ currentDepth });

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
                  ? { id: generateId(), type: LIST_ITEM_NODE_TYPE, children: [{ text: '' }] }
                  : defaultComponent;

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

            // Transforms.select(editor, {
            //   anchor: { path: [anchor.path[0], anchor.path[1] + 1, 0], offset: 0 },
            //   focus: { path: [anchor.path[0], anchor.path[1] + 1, 0], offset: 0 },
            // });

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

            console.log('editor.selection.anchor.path', editor.selection.anchor.path);
            console.log({ isEnd, isStart, listItemPath, listItemNode, parentNode, parentPath });

            const parentNestedNode = {
              id: generateId(),
              type: parentNode.type,
              children: [{ text: '' }],
            };

            Transforms.wrapNodes(editor, parentNestedNode, { at: listItemPath });

            return;
          }

          if (hotkeys.isOutdent(event)) {
            event.preventDefault();
            console.log('editor.selection.anchor.path', editor.selection.anchor.path);
            console.log({ isEnd, isStart, listItemPath, listItemNode, parentNode, parentPath });

            if (isMinDepth) return;

            Transforms.unwrapNodes(editor, {
              match: (n) => Element.isElement(n) && n.type === parentNode.type,
              // at: listItemPath,
              split: true,
            });

            return;
          }
        });
      },
  },
});

export { ListItemList };
