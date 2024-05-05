import { createDraft, finishDraft } from 'immer';
import { Element, Transforms } from 'slate';
import { buildBlockData, buildBlockElement } from '../../components/Editor/utils';
import { getRootBlockElementType } from '../../utils/blockElements';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export type CreateBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
};

export function createBlock(editor: YooEditor, type: string, options?: CreateBlockOptions) {
  editor.children = createDraft(editor.children);

  const block = findPluginBlockBySelectionPath(editor);
  if (!block) throw new Error(`No block found in the current selection path. Passed path: ${editor.selection}`);

  const slate = options?.slate || findSlateBySelectionPath(editor, { at: [block?.meta.order] });
  if (!slate || !slate.selection) return;

  const selectedBlock = editor.blocks[type];
  const rootBlockElementType = getRootBlockElementType(selectedBlock.elements);
  const rootBlockElement = selectedBlock.elements[rootBlockElementType!];

  if (!rootBlockElement) return;

  const nodeProps = { nodeType: rootBlockElement.props?.nodeType || 'block', ...rootBlockElement.props };

  console.log('nodeProps', nodeProps);

  const elementNode = buildBlockElement({
    id: generateId(),
    type: rootBlockElementType,
    props: nodeProps,
  });

  Transforms.setNodes(slate, elementNode, {
    at: [0, 0],
    match: (n) => Element.isElement(n),
    mode: 'highest',
  });

  if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

  const blockData = buildBlockData({
    id: block.id,
    type: selectedBlock.type,
    meta: {
      order: block.meta.order,
      depth: block.meta.depth,
    },
    value: [elementNode],
  });

  const blockId = blockData.id;

  editor.children[blockId] = blockData;
  editor.blockEditorsMap[blockId] = slate;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
  editor.emit('change', editor.children);

  if (options?.focus) {
    editor.focusBlock(blockId, { slate, waitExecution: true });
  }
}
