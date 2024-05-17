import { SlateElement, YooEditor } from '../types';
import { getBlockElementEntry } from './getElementEntry';

export function getBlockElement<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
): SlateElement<TElementKeys> | undefined {
  const elementEntry = getBlockElementEntry(editor, blockId, elementType);

  if (elementEntry) {
    return elementEntry[0] as SlateElement<TElementKeys>;
  }

  return undefined;
}
