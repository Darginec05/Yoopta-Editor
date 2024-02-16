import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Transforms } from 'slate';
import { PluginElement } from '../../plugins/types';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export type ApplyBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
  data?: any;
};

export function applyBlock(editor: YooEditor, type: string, options?: ApplyBlockOptions) {
  editor.children = createDraft(editor.children);

  const currentBlock = findPluginBlockBySelectionPath(editor);
  if (!currentBlock) throw new Error(`No block found in the current selection path. Passed path: ${editor.selection}`);

  const slate = findSlateBySelectionPath(editor, { at: [currentBlock?.meta.order] });
  if (!slate || !slate.selection) return;

  const selectedBlock = editor.blocks[type];

  Editor.withoutNormalizing(slate, () => {
    const blockSlateElements = Object.entries(selectedBlock.elements);
    const rootElementFromBlock =
      blockSlateElements.length === 1 ? blockSlateElements[0] : blockSlateElements.find((elem) => elem[1].isRoot);

    const [type, element] = rootElementFromBlock as [string, PluginElement<any>];

    const props = element.elementProps || {};
    const node = { id: generateId(), type, children: [{ text: '' }], props };

    const isInlineElement = element?.options?.nodeType === 'inline';

    if (isInlineElement) {
    }

    Transforms.setNodes(slate, node, {
      at: [0],
      match: (n) => Element.isElement(n),
      mode: 'highest',
    });

    if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });
    currentBlock.type = selectedBlock.type;
  });

  const currentBlockId = currentBlock!.id;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();

  if (options?.focus) {
    editor.focusBlock(currentBlockId, { slate });
  }
}
