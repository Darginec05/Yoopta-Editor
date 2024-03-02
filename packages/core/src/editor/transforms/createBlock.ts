import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Range, Transforms } from 'slate';
import { getDefaultParagraphBlock } from '../../components/Editor/defaultValue';
import { PluginElement, PluginElementProps } from '../../plugins/types';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions, YooptaBlock, SlateElement } from '../types';

export type CreateBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
};

// function buildChildrenTree(block: YooptaBlock, children: string[]) {
//   return children.map((child) => {
//     const childElement = block.elements[child];

//     const hasChildren = Array.isArray(childElement.children) && childElement.children.length > 0;

//     console.log('hasChildren', hasChildren);
//     console.log('childElement', childElement);

//     if (hasChildren) {
//       return {
//         ...childElement,
//         children: buildChildrenTree(block, childElement.children!),
//       };
//     }

//     return buildSlateNodeElement(child, childElement.props);
//   });
// }

function buildSlateNodeElement(
  type: string,
  props: PluginElementProps<unknown> = { nodeType: 'block' },
): SlateElement<any> {
  return { id: generateId(), type, children: [{ text: '' }], props: props };
}

// [TODO] - currently build two levels of children depth
function buildChildrenElementNodes(block: YooptaBlock, children: string[]): SlateElement[] {
  const nodes: SlateElement[] = [];

  children.forEach((child) => {
    const childElement = block.elements[child];
    const hasChildren = Array.isArray(childElement.children) && childElement.children.length > 0;

    if (hasChildren) {
      const childrenNodes = buildChildrenElementNodes(block, childElement.children!);
      const node = buildSlateNodeElement(child, childElement.props);
      node.children = childrenNodes;
      nodes.push(node);
    } else {
      nodes.push(buildSlateNodeElement(child, childElement.props));
    }
  });

  return nodes;
}

export function createBlock(editor: YooEditor, type: string, options?: CreateBlockOptions) {
  editor.children = createDraft(editor.children);

  const currentBlock = findPluginBlockBySelectionPath(editor);
  if (!currentBlock) throw new Error(`No block found in the current selection path. Passed path: ${editor.selection}`);

  const slate = findSlateBySelectionPath(editor, { at: [currentBlock?.meta.order] });
  if (!slate || !slate.selection) return;

  const selectedBlock = editor.blocks[type];

  console.log('selectedBlock.withCustomEditor', selectedBlock.withCustomEditor);

  if (selectedBlock.withCustomEditor) {
    if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

    currentBlock.type = selectedBlock.type;
    currentBlock.value = slate.children;

    const currentBlockId = currentBlock!.id;

    editor.children = finishDraft(editor.children);
    editor.applyChanges();

    if (options?.focus) {
      editor.focusBlock(currentBlockId, { slate });
    }

    return;
  }

  const blockSlateElements = Object.entries(selectedBlock.elements);
  const rootElementFromBlock =
    blockSlateElements.length === 1 ? blockSlateElements[0] : blockSlateElements.find((elem) => elem[1].asRoot);

  console.log('rootElementFromBlock', rootElementFromBlock);

  if (!rootElementFromBlock) {
    throw new Error(`No root element found in the block elements. Passed block: ${selectedBlock}`);
  }

  const [rootElementType, rootElement] = rootElementFromBlock as [string, PluginElement<unknown>];
  let rootChildrenNodes: Element[] = [];
  const hasRootChildren = Array.isArray(rootElement.children) && rootElement.children.length > 0;
  const props = rootElement.props || { nodeType: 'block' };
  const rootElementNode = buildSlateNodeElement(rootElementType, props);
  const nodeType = rootElementNode.props.nodeType;

  if (hasRootChildren) {
    rootChildrenNodes = buildChildrenElementNodes(selectedBlock, rootElement.children!);
  }

  const isInlineElement = nodeType === 'inline';
  const isNodeElementVoid = nodeType === 'void';
  const isNodeElementBlock = nodeType === 'block';
  const isInlineVoidElement = nodeType === 'inlineVoid';

  // [TODO] - fix this
  // if (isInlineElement || isInlineVoidElement) {
  //   const link = rootElementNode;
  //   Transforms.insertNodes(slate, link, { at: slate.selection.anchor.path, mode: 'lowest' });
  // }

  Transforms.setNodes(slate, rootElementNode, {
    at: [0, 0],
    match: (n) => Element.isElement(n),
    mode: 'highest',
  });

  if (hasRootChildren) {
    let path = [0, 0];

    // [TODO] - refactor code to handle more than two levels of children
    // [TODO] - run it recursively, but take care about max count of operations
    rootChildrenNodes.forEach((node) => {
      if (Element.isElement(node)) {
        Transforms.insertNodes(slate, node, {
          at: path,
          match: (n) => Element.isElement(n),
          mode: 'lowest',
        });

        path.push(0);
      }

      if (node.children) {
        node.children.forEach((child) => {
          if (Element.isElement(child)) {
            Transforms.insertNodes(slate, child, {
              at: path,
              match: (n) => Element.isElement(n),
              mode: 'lowest',
            });

            path.push(0);
          }
        });
      }
    });
  }

  if (options?.deleteText) Transforms.delete(slate, { at: hasRootChildren ? [0, 0, 0] : [0, 0] });

  if (isNodeElementBlock || isNodeElementVoid) currentBlock.type = selectedBlock.type;
  currentBlock.value = slate.children;

  const currentBlockId = currentBlock!.id;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();

  if (options?.focus) {
    editor.focusBlock(currentBlockId, { slate });
  }
}
