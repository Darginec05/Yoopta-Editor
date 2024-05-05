import { Editor, Path, Transforms } from 'slate';
import { buildBlockElement } from '../../components/Editor/utils';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateElement, YooEditor } from '../types';

export type CreateBlockElementOptions = {
  at?: 'next' | 'last' | 'first' | Path | 'prev';
  focus?: boolean;
};

export function createBlockElement<TElementKeys extends string, TElementProps>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  elementProps?: TElementProps,
  options?: CreateBlockElementOptions,
) {
  const blockData = editor.children[blockId];
  if (!blockData) {
    throw new Error(`Block with id ${blockId} not found`);
  }

  const slate = findSlateBySelectionPath(editor, { at: [blockData.meta.order] });
  if (!slate) {
    console.warn('No slate found');
    return;
  }

  Editor.withoutNormalizing(slate, () => {
    const block = editor.blocks[blockData.type];
    const blockElement = block.elements[elementType];
    const nodeElement = buildBlockElement({ type: elementType, props: { ...blockElement.props, ...elementProps } });

    const elementTypes = Object.keys(block.elements);

    let parentElement;
    let childrenElements: SlateElement[] = [];

    elementTypes.forEach((blockElementType) => {
      const blockElement = block.elements[blockElementType];
      const hasParentBlockElement = blockElement.children?.includes(elementType);

      if (blockElementType === elementType) {
        if (Array.isArray(blockElement.children) && blockElement.children.length > 0) {
          blockElement.children.forEach((childElementType) => {
            const childElement = block.elements[childElementType];
            childrenElements.push(buildBlockElement({ type: childElementType, props: childElement.props }));
          });
        }
      }

      if (hasParentBlockElement) {
        parentElement = buildBlockElement({ type: blockElementType, props: blockElement.props });
      }
    });

    if (childrenElements.length > 0) nodeElement.children = childrenElements;

    const { at, focus = true } = options || {};
    let atPath;

    const currentElementEntry = editor.blocks[block.type].getElement(blockId, elementType);

    if (currentElementEntry) {
      const [, elementPath] = currentElementEntry;

      if (Path.isPath(at)) {
        atPath = at;
      } else if (at === 'prev') {
        atPath = Path.previous(elementPath);
      } else if (at === 'next') {
        atPath = Path.next(elementPath);
      }
    }

    Transforms.insertNodes(slate, nodeElement, { at: atPath, select: focus });

    editor.applyChanges();
    editor.emit('change', editor.children);
  });
}
