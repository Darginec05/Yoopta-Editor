import { createDraft, finishDraft } from 'immer';
import { createEditor, Editor, Element, Path, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorOptions } from '../types';

export function splitBlock(editor: YooEditor, options: YooptaEditorOptions = {}) {
  // editor.children = createDraft(editor.children);

  const { at = null, focus = false, slate = null } = options;

  if (!slate || !slate.selection) return;

  const before = Editor.before(slate, slate.selection);
  const after = Editor.after(slate, slate.selection);

  const stringBefore = before ? Editor.string(slate, before) : '';
  const stringAfter = after ? Editor.string(slate, after) : '';

  console.log('slate.selection before', before);
  console.log('slate.selection after', after);
  console.log('stringBefore', stringBefore);
  console.log('stringAfter', stringAfter);
  console.log('Editor.nodes', [...Editor.nodes(slate, { match: (n) => !Editor.isEditor(n) })]);

  // const depth = slate.selection.anchor.path.length;
  // const offsetPosition = slate.selection.anchor.offset;

  // console.log('depth', depth);
  // console.log('offsetPosition', offsetPosition);

  // editor.children = finishDraft(editor.children);
  // editor.applyChanges();

  // const newBlock = {
  //   id: generateId(),
  //   value: [{ text: 'k via the toolbar icon above,@elon.musk' }],
  //   type: 'ParagraphPlugin',
  //   meta: {
  //     // ...data.meta,
  //     order: 0,
  //   },
  // };

  // editor.insertBlock(newBlock, { at, focus: true });
  // editor.applyChanges();
}
