import { Editor, Element, Path, Transforms } from 'slate';
import { findSlateBySelectionPath, SlateElement, YooEditor } from '@yoopta/editor';

export type UpdateElementOptions = {
  path?: Path;
};

export function updateElement<TElementKeys extends string, TElementProps>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  elementProps: TElementProps,
  options?: UpdateElementOptions,
) {
  const block = editor.children[blockId];

  if (!block) {
    throw new Error(`Block with id ${blockId} not found`);
  }

  const slate = findSlateBySelectionPath(editor, { at: [block.meta.order] });

  if (!slate) {
    console.warn('No slate found');
    return;
  }
  Editor.withoutNormalizing(slate, () => {
    const [elementEntry] = Editor.nodes<SlateElement>(slate, {
      at: options?.path || [0],
      match: (n) => Element.isElement(n) && n.type === elementType,
    });

    const element = elementEntry?.[0];

    const props = element?.props || {};
    const updatedNode = { props: { ...props, ...elementProps } };

    Transforms.setNodes<SlateElement>(slate, updatedNode, {
      at: options?.path || [0],
      match: (n) => Element.isElement(n) && n.type === elementType,
      mode: 'lowest',
    });

    editor.applyChanges();
    editor.emit('change', editor.children);
  });
}
