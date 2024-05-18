import { SlateElement, YooEditor } from '@yoopta/editor';
import { getBlockElementEntry, GetBlockElementEntryOptions } from './getElementEntry';

export type GetBlockElementOptions = GetBlockElementEntryOptions;

export function getBlockElement<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  options?: GetBlockElementOptions,
): SlateElement<TElementKeys> | undefined {
  const elementEntry = getBlockElementEntry(editor, blockId, elementType, options);

  if (elementEntry) {
    return elementEntry[0] as SlateElement<TElementKeys>;
  }

  return undefined;
}
