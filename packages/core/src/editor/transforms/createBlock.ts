import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Range, Transforms } from 'slate';
import { getDefaultParagraphBlock } from '../../components/Editor/defaultValue';
import { PluginElement, PluginElementProps } from '../../plugins/types';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions, YooptaBlock } from '../types';

export type CreateBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
};

function buildChildrenTree(block: YooptaBlock, children: string[]) {
  return children.map((child) => {
    const childElement = block.elements[child];
    const childChildren = Array.isArray(childElement.children) && childElement.children.length > 0;

    if (childChildren) {
      return {
        ...childElement,
        children: buildChildrenTree(block, childElement.children!),
      };
    }

    return buildSlateNodeElement(child, childElement.props);
  });
}

function buildSlateNodeElement(type: string, props: PluginElementProps<unknown> = { nodeType: 'block' }) {
  return { id: generateId(), type, children: [{ text: '' }], props: props };
}

export function createBlock(editor: YooEditor, type: string, options?: CreateBlockOptions) {
  editor.children = createDraft(editor.children);

  const currentBlock = findPluginBlockBySelectionPath(editor);
  if (!currentBlock) throw new Error(`No block found in the current selection path. Passed path: ${editor.selection}`);

  const slate = findSlateBySelectionPath(editor, { at: [currentBlock?.meta.order] });
  if (!slate || !slate.selection) return;

  const selectedBlock = editor.blocks[type];
  const blockSlateElements = Object.entries(selectedBlock.elements);
  const rootElementFromBlock =
    blockSlateElements.length === 1 ? blockSlateElements[0] : blockSlateElements.find((elem) => elem[1].asRoot);

  if (!rootElementFromBlock)
    throw new Error(`No root element found in the block elements. Passed block: ${selectedBlock}`);

  const [rootElementType, rootElement] = rootElementFromBlock as [string, PluginElement<unknown>];

  let rootChildrenNodes: Element[] = [];
  const hasRootChildren = Array.isArray(rootElement.children) && rootElement.children.length > 0;

  const props = rootElement.props || { nodeType: 'block' };
  const rootElementNode = buildSlateNodeElement(rootElementType, props);
  const nodeType = rootElementNode.props.nodeType;

  if (hasRootChildren) {
    rootChildrenNodes = buildChildrenTree(selectedBlock, rootElement.children!);
  }

  const isInlineElement = nodeType === 'inline';
  const isVoidElement = nodeType === 'void';
  const isBlockElement = nodeType === 'block';
  const isInlineVoidElement = Array.isArray(nodeType) && nodeType.includes('inline') && nodeType.includes('void');

  // [TODO] - fix this
  if (isInlineElement || isInlineVoidElement) {
    const link = rootElementNode;
    Transforms.insertNodes(slate, link, { at: slate.selection.anchor.path, mode: 'lowest' });
  } else {
    Transforms.setNodes(slate, rootElementNode, {
      at: [0, 0],
      match: (n) => Element.isElement(n),
      mode: 'highest',
    });

    if (hasRootChildren) {
      Transforms.insertNodes(slate, rootChildrenNodes, {
        at: [0, 0],
        match: (n) => Element.isElement(n),
        mode: 'lowest',
      });
    }
  }

  if (options?.deleteText) Transforms.delete(slate, { at: hasRootChildren ? [0, 0, 0] : [0, 0] });

  if (isBlockElement) currentBlock.type = selectedBlock.type;
  currentBlock.value = slate.children;

  const currentBlockId = currentBlock!.id;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();

  if (options?.focus) {
    editor.focusBlock(currentBlockId, { slate });
  }
}
