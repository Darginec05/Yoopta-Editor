import { Editor, Element, Path, Range, Transforms } from 'slate';
import { YooptaBaseElement } from '../../types';
import { deepClone } from '../../utils/deepClone';
import { generateId } from '../../utils/generateId';
import { HOTKEYS } from '../../utils/hotkeys';
import { UltraYooEditor, YooEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { getDefaultUltraBlock } from './defaultValue';

export const EVENT_HANDLERS = {
  onKeyDown,
};

function onKeyDown(editor: YooEditor, slate: Editor) {
  return (event) => {
    if (!slate.selection) return;

    if (HOTKEYS.isShiftEnter(event)) {
      if (event.isDefaultPrevented()) return;

      event.preventDefault();
      slate.insertText('\n');
    }

    if (HOTKEYS.isEnter(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);
      const isEnd = Editor.isEnd(slate, slate.selection.anchor, slate.selection.anchor.path);

      // Split the node at the cursor
      if (!isStart && !isEnd) {
      }
      const defaultBlock = getDefaultUltraBlock();
      const nextPath = editor.selection ? [editor.selection[0] + 1] : [0];
      editor.insertBlock(defaultBlock, { at: nextPath });
      // editor.focusBlock(defaultBlock.id);
      return;
    }

    if (HOTKEYS.isBackspace(event)) {
      const parentPath = Path.parent(slate.selection.anchor.path);
      const text = Editor.string(slate, parentPath);
      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);

      if (text.length === 0 && isStart) {
        event.preventDefault();
        editor.deleteBlock([2]);
        return;
      }
      return;
    }
  };
}

// function onKeyDown(event: any, editor: Editor, editor: UltraYooEditor) {
//   console.log('editor', editor.insertBlock);

//   Editor.withoutNormalizing(editor, () => {
//     if (!editor.selection) return;
//     const defaultNode = getDefaultParagraphLine(generateId());

//     const nodeEntry = Editor.above<YooptaBaseElement<string>>(editor, {
//       match: (n) => !Editor.isEditor(n),
//       mode: 'lowest',
//     });

//     console.log('HOTKEYS.isEnter(event)', HOTKEYS.isEnter(event));

//     if (HOTKEYS.isEnter(event)) {
//       if (event.isDefaultPrevented()) return;
//       event.preventDefault();

//       editor.insertBlock(getDefaultUltraBlock);
//       return;

//       const marks = Object.keys(Editor.marks(editor) || {});

//       if (marks.length > 0) marks.forEach((mark) => Editor.removeMark(editor, mark));

//       const parentPath = Path.parent(editor.selection.anchor.path);

//       const text = Editor.string(editor, parentPath);
//       const isDefaultNode = nodeEntry && nodeEntry[0].type !== defaultNode.type;

//       if (isDefaultNode && text.length === 0) {
//         Transforms.setNodes(editor, defaultNode, {
//           at: parentPath,
//         });

//         return;
//       }

//       const isStart = Editor.isStart(editor, editor.selection.anchor, editor.selection.anchor.path);

//       if (isStart && isDefaultNode) {
//         const [currentNode] = nodeEntry;

//         Transforms.setNodes(editor, defaultNode, { at: parentPath });
//         Transforms.delete(editor, { unit: 'block' });
//         Transforms.insertNodes(editor, deepClone(currentNode), { at: Path.next(parentPath) });

//         Transforms.select(editor, { path: [Path.next(editor.selection.anchor.path)[0] + 1, 0], offset: 0 });
//         return;
//       }

//       Transforms.splitNodes(editor, { always: true });
//       Transforms.setNodes(editor, defaultNode);
//       // changeHoveredNode(defaultNode);

//       return;
//     }

//     if (HOTKEYS.isShiftEnter(event)) {
//       if (event.isDefaultPrevented()) return;

//       event.preventDefault();
//       editor.insertText('\n');
//     }

//     if (HOTKEYS.isSelect(event)) {
//       if (event.isDefaultPrevented()) return;
//       event.preventDefault();

//       const nodeEntry = Editor.above(editor, {
//         at: editor.selection.anchor.path,
//         match: (n) => !Editor.isEditor(n) && Element.isElement(n),
//       });

//       if (!nodeEntry) return;

//       const text = Editor.string(editor, nodeEntry[1]);
//       if (Range.isExpanded(editor.selection) || text.length === 0) {
//         Transforms.select(editor, []);
//         return;
//       }

//       // [TODO] - check if is inline node
//       Transforms.select(editor, nodeEntry[1]);
//       return;
//     }
//   });
// }
