import { Editor, Element, Path, Range, Transforms } from 'slate';
import { YooptaBaseElement } from '../../types';
import { deepClone } from '../../utils/deepClone';
import { generateId } from '../../utils/generateId';
import { HOTKEYS } from '../../utils/hotkeys';
import { UltraYooEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { getDefaultUltraBlock } from './defaultValue';

export const EVENT_HANDLERS = {
  onKeyDown,
};

function onKeyDown(yooEditor: UltraYooEditor, slateEditor: Editor) {
  return (event) => {
    if (!slateEditor.selection) return;

    if (HOTKEYS.isShiftEnter(event)) {
      if (event.isDefaultPrevented()) return;

      event.preventDefault();
      slateEditor.insertText('\n');
    }

    if (HOTKEYS.isEnter(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

      const isStart = Editor.isStart(slateEditor, slateEditor.selection.anchor, slateEditor.selection.anchor.path);
      const isEnd = Editor.isEnd(slateEditor, slateEditor.selection.anchor, slateEditor.selection.anchor.path);

      // Split the node at the cursor
      if (!isStart && !isEnd) {
        console.log('slateEditor.selection.anchor', slateEditor.selection.anchor);
        console.log('slateEditor.selection.focus', slateEditor.selection.focus);
      }
      const defaultBlock = getDefaultUltraBlock();

      yooEditor.insertBlock(defaultBlock);
      yooEditor.focusBlock(defaultBlock.id);
      return;
    }

    if (HOTKEYS.isBackspace(event)) {
      const parentPath = Path.parent(slateEditor.selection.anchor.path);
      const text = Editor.string(slateEditor, parentPath);
      const isStart = Editor.isStart(slateEditor, slateEditor.selection.anchor, slateEditor.selection.anchor.path);

      console.log('isStart', isStart);
      console.log('text', text);
      console.log('delete block', text.length === 0 && isStart);

      if (text.length === 0 && isStart) {
        event.preventDefault();
        yooEditor.deleteBlock([2]);
        return;
      }
      return;
    }
  };
}

// function onKeyDown(event: any, editor: Editor, yooEditor: UltraYooEditor) {
//   console.log('yooEditor', yooEditor.insertBlock);

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

//       yooEditor.insertBlock(getDefaultUltraBlock);
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
