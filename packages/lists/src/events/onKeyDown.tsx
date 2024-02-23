import { generateId } from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';

export function onKeyDown(editor, slate, { hotkeys }) {
  return (event) => {
    Editor.withoutNormalizing(slate, () => {
      if (!slate.selection) return;
      const selection = slate.selection;
      const { anchor } = selection;

      if (hotkeys.isBackspace(event)) {
        event.preventDefault();
        return;
      }

      if (hotkeys.isTab(event)) {
        event.preventDefault();
        return;
      }

      if (hotkeys.isShiftTab(event)) {
        event.preventDefault();
        return;
      }

      if (hotkeys.isEnter(event)) {
        event.preventDefault();

        const nodeEntry = Editor.above(slate, {
          at: anchor,
          match: (n) => Element.isElement(n) && n.type === 'list-item',
        });

        if (!nodeEntry) return;

        const [listItemNode, listItemPath] = nodeEntry;
        const [parentNode, parentPath] = Editor.parent(slate, listItemPath);

        const isEnd = Editor.isEnd(slate, anchor, listItemPath);
        const isStart = Editor.isStart(slate, anchor, listItemPath);
        const text = Editor.string(slate, listItemPath);

        // [TODO] - When list item is empty check depth, remove it list-item and in case depth is 0 create block
        if (text.trim() === '') {
          return;
        }

        if (isStart) {
          let previousPath;

          try {
            previousPath = Path.previous(listItemPath);
          } catch (error) {
            previousPath = listItemPath;
          }

          console.log('Path.previous(listItemPath)', previousPath);
          console.log('listItemPath', listItemPath);

          // [TODO] - think about approach to create new nodes from elements
          const newListItemNode = {
            id: generateId(),
            type: 'list-item',
            children: [{ text: '' }],
            data: { depth: 0 },
          };

          Transforms.insertNodes(slate, newListItemNode, { at: listItemPath });
          return;
        }

        if (isEnd) {
          const nextPath = Path.next(listItemPath);
          console.log('Path.next(listItemPath)', Path.next(listItemPath));

          // [TODO] - think about approach to create new nodes from elements
          const newListItemNode = {
            id: generateId(),
            type: 'list-item',
            children: [{ text: '' }],
            data: { depth: 0 },
          };

          Transforms.insertNodes(slate, newListItemNode, { at: Path.next(listItemPath) });

          Transforms.select(slate, nextPath);
          return;
        }

        if (!isStart && !isEnd) {
          Transforms.splitNodes(slate, {
            at: anchor,
            match: (n) => Element.isElement(n) && n.type === 'list-item',
          });

          Transforms.setNodes(
            slate,
            { id: generateId() },
            {
              match: (n) => Element.isElement(n) && n.type === 'list-item',
            },
          );
          return;
        }

        console.log({ isStart, isEnd, parentNode });
      }
    });
  };
}
