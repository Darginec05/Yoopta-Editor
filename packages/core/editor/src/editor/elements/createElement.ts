import { buildBlockElement, findSlateBySelectionPath, SlateElement, YooEditor } from '@yoopta/editor';
import { Editor, Path, Transforms } from 'slate';

export type CreateBlockElementOptions = {
  at?: 'next' | 'prev' | Path;
  focus?: boolean;
  split?: boolean;
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

    let childrenElements: SlateElement[] = [];

    elementTypes.forEach((blockElementType) => {
      const blockElement = block.elements[blockElementType];

      if (blockElementType === elementType) {
        if (Array.isArray(blockElement.children) && blockElement.children.length > 0) {
          blockElement.children.forEach((childElementType) => {
            const childElement = block.elements[childElementType];
            childrenElements.push(buildBlockElement({ type: childElementType, props: childElement.props }));
          });
        }
      }
    });

    if (childrenElements.length > 0) nodeElement.children = childrenElements;

    const { at, focus = true } = options || {};
    let atPath;

    const elementEntry = editor.blocks[block.type].getElementEntry(blockId, elementType);

    if (elementEntry) {
      const [, elementPath] = elementEntry;

      if (Path.isPath(at)) {
        atPath = at;
      } else if (at === 'prev') {
        atPath = Path.previous(elementPath);
      } else if (at === 'next') {
        atPath = Path.next(elementPath);
      }
    }

    Transforms.insertNodes(slate, nodeElement, { at: atPath, select: focus });

    if (focus) {
      if (childrenElements.length > 0) {
        const firstChild = childrenElements[0];
        const firstElementEntry = editor.blocks[block.type].getElementEntry(blockId, firstChild.type, {
          atPath: atPath,
        });

        if (firstElementEntry) {
          const [, firstElementPath] = firstElementEntry;
          Transforms.select(slate, firstElementPath);
        }
      }
    }

    editor.applyChanges();
    editor.emit('change', editor.children);
  });
}
