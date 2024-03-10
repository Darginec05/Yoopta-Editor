import { generateId, YooEditor, PluginEventHandlerOptions, findPluginBlockBySelectionPath } from '@yoopta/editor';
import { Editor, Element, Path, Transforms } from 'slate';
import { ListItemElement } from '../types';

export function onKeyDown(
  editor: YooEditor,
  slate: Editor,
  { hotkeys, currentBlock, defaultBlock }: PluginEventHandlerOptions,
) {
  return (event) => {
    Editor.withoutNormalizing(slate, () => {
      if (!slate.selection) return;
      const selection = slate.selection;
      const { anchor } = selection;

      if (hotkeys.isBackspace(event)) {
        // event.preventDefault();
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

        console.log({ isStart, isEnd, text, listItemPath });

        if (text.trim() === '') {
          const nextListItemPath = Path.next(listItemPath);
          console.log('nextListItemPath', nextListItemPath);

          // check for depth
          const block = findPluginBlockBySelectionPath(editor, { at: editor.selection });
          if (!block) return;

          Transforms.removeNodes(slate, {
            at: listItemPath,
            match: (n) => Element.isElement(n) && n.type === 'list-item',
          });
          editor.insertBlock(defaultBlock, { at: [block.meta.order + 1], focus: true });

          return;
        }

        if (!isStart && !isEnd) {
          const nextListItemPath = Path.next(listItemPath);

          Transforms.splitNodes(slate, {
            match: (n) => Element.isElement(n) && n.type === 'list-item',
            always: true,
          });

          Transforms.select(slate, { path: nextListItemPath.concat(0), offset: 0 });
          return;
        }

        if (isStart && text.trim() !== '') {
          const nextListItemPath = Path.next(listItemPath);
          const listItemProps = editor.blocks[currentBlock.type].elements['list-item'];

          const newListItemNode: ListItemElement = {
            id: generateId(),
            type: 'list-item',
            children: [{ text: '' }],
            props: listItemProps,
          };

          Transforms.insertNodes(slate, newListItemNode, {
            at: Path.next(listItemPath),
            match: (n) => Element.isElement(n) && n.type === 'list-item',
          });
          Transforms.select(slate, nextListItemPath);
          return;
        }

        if (isEnd) {
          const nextListItemPath = Path.next(listItemPath);
          const listItemProps = editor.blocks[currentBlock.type].elements['list-item'];

          const newListItemNode: ListItemElement = {
            id: generateId(),
            type: 'list-item',
            children: [{ text: '' }],
            props: listItemProps,
          };

          Transforms.insertNodes(slate, newListItemNode, {
            at: Path.next(listItemPath),
            match: (n) => Element.isElement(n) && n.type === 'list-item',
          });
          Transforms.select(slate, nextListItemPath);

          return;
        }

        // if (isStart) {
        //   let previousPath;

        //   try {
        //     previousPath = Path.previous(listItemPath);
        //   } catch (error) {
        //     previousPath = listItemPath;
        //   }

        //   console.log('Path.previous(listItemPath)', previousPath);
        //   console.log('listItemPath', listItemPath);

        //   // [TODO] - think about approach to create new nodes from elements
        //   const newListItemNode: ListItemElement = {
        //     id: generateId(),
        //     type: 'list-item',
        //     children: [{ text: '' }],
        //   };

        //   Transforms.insertNodes(slate, newListItemNode, { at: listItemPath });
        //   return;
        // }

        // if (isEnd) {
        //   const nextPath = Path.next(listItemPath);
        //   console.log('Path.next(listItemPath)', Path.next(listItemPath));

        //   // [TODO] - think about approach to create new nodes from elements
        //   const newListItemNode: ListItemElement = {
        //     id: generateId(),
        //     type: 'list-item',
        //     children: [{ text: '' }],
        //   };

        //   Transforms.insertNodes(slate, newListItemNode, { at: Path.next(listItemPath) });
        //   Transforms.select(slate, nextPath);
        //   return;
        // }

        // if (!isStart && !isEnd) {
        //   Transforms.splitNodes(slate, {
        //     at: anchor,
        //     match: (n) => Element.isElement(n) && n.type === 'list-item',
        //   });

        //   Transforms.setNodes(
        //     slate,
        //     { id: generateId() },
        //     {
        //       match: (n) => Element.isElement(n) && n.type === 'list-item',
        //     },
        //   );
        //   return;
        // }
      }
    });
  };
}
