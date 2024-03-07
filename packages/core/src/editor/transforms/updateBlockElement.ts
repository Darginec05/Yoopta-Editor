import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateElement, YooEditor } from '../types';

export function updateBlockElement<TElementKeys extends string, TElementProps>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  elementProps: TElementProps,
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
  console.log('slate children', slate.children);

  Editor.withoutNormalizing(slate, () => {
    const [elementEntry] = Editor.nodes<SlateElement>(slate, {
      at: [0],
      match: (n) => Element.isElement(n) && n.type === elementType,
    });

    console.log('elementEntry', elementEntry);

    const element = elementEntry?.[0];

    const props = element?.props || {};
    const updateNode = { props: { ...props, ...elementProps } };

    Transforms.setNodes<SlateElement>(slate, updateNode, {
      at: [0],
      match: (n) => Element.isElement(n) && n.type === elementType,
      mode: 'lowest',
    });

    editor.applyChanges();
  });
}
