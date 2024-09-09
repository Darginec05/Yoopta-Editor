import { SlateEditor, YooEditor, PluginEventHandlerOptions } from '@yoopta/editor';
import { Editor, Element, Node, Path, Range, Text, Transforms } from 'slate';
import { TableCommands } from '../commands';
import { EDITOR_TO_SELECTION, EDITOR_TO_SELECTION_SET } from '../utils/weakMaps';

export function onKeyDown(editor: YooEditor, slate: SlateEditor, { hotkeys, currentBlock }: PluginEventHandlerOptions) {
  return (event) => {
    if (!slate.selection) return;

    if (hotkeys.isBackspace(event)) {
      const parentPath = Path.parent(slate.selection.anchor.path);
      const isStart = Editor.isStart(slate, slate.selection.anchor, parentPath);

      const elementEntries = EDITOR_TO_SELECTION.get(slate);
      if (!!elementEntries) {
        event.preventDefault();

        Editor.withoutNormalizing(slate, () => {
          // just remove text in selected nodes
          for (const [element, path] of elementEntries) {
            for (const [childNode, childPath] of Node.children(slate, path)) {
              if (Text.isText(childNode)) {
                const textLength = Node.string(childNode).length;
                if (textLength > 0) {
                  Transforms.delete(slate, {
                    at: {
                      anchor: { path: childPath, offset: 0 },
                      focus: { path: childPath, offset: textLength },
                    },
                  });
                }
              }
            }
          }

          Transforms.select(slate, { path: elementEntries[0][1].concat(0), offset: 0 });
        });
        return;
      }

      if (isStart && Range.isCollapsed(slate.selection)) {
        event.preventDefault();
        return;
      }
    }

    // add new row before current row
    if (hotkeys.isCmdShiftEnter(event)) {
      event.preventDefault();
      TableCommands.insertTableRow(editor, currentBlock.id, { select: true, insertMode: 'before' });
      return;
    }

    // add new row after current row
    if (hotkeys.isShiftEnter(event)) {
      event.preventDefault();
      TableCommands.insertTableRow(editor, currentBlock.id, { select: true, insertMode: 'after' });
      return;
    }

    if (hotkeys.isCmdShiftRight(event)) {
      event.preventDefault();
      TableCommands.insertTableColumn(editor, currentBlock.id, { select: true, insertMode: 'after' });
      return;
    }

    if (hotkeys.isCmdShiftLeft(event)) {
      event.preventDefault();
      TableCommands.insertTableColumn(editor, currentBlock.id, { select: true, insertMode: 'before' });
      return;
    }

    if (hotkeys.isCmdShiftDelete(event)) {
      event.preventDefault();
      TableCommands.deleteTableRow(editor, currentBlock.id);
      return;
    }

    if (hotkeys.isCmdAltDelete(event)) {
      event.preventDefault();
      TableCommands.deleteTableColumn(editor, currentBlock.id);
      return;
    }

    if (hotkeys.isEnter(event)) {
      event.preventDefault();
      Transforms.insertText(slate, '\n');
    }

    // if first select then select the whole row
    if (hotkeys.isSelect(event)) {
      const tdElementEntry = Editor.above(slate, {
        match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
      });

      if (tdElementEntry) {
        event.preventDefault();
        const [tdElement, tdElementPath] = tdElementEntry;
        Transforms.select(slate, tdElementPath);
      }
    }
  };
}
