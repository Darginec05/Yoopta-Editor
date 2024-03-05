import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Transforms } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateElement, YooEditor } from '../types';

export function updateBlockElement<TElementKeys extends string, TElementProps>(
  editor: YooEditor,
  elementType: TElementKeys,
  elementProps: TElementProps,
) {
  console.log('updateBlockElement ElementType', elementType);
  console.log('updateBlockElement ElementProps', elementProps);

  const slate = findSlateBySelectionPath(editor);

  if (!slate) {
    console.warn('No slate found');
    return;
  }

  Editor.withoutNormalizing(slate, () => {
    Transforms.setNodes<SlateElement<TElementKeys, TElementProps>>(
      slate,
      {
        // check if element has props
        props: elementProps,
      },
      {
        at: [0],
        match: (n) => {
          return Element.isElement(n) && n.type === elementType;
        },
        mode: 'lowest',
      },
    );

    editor.applyChanges();
  });
}
