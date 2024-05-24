import { SlateElement, YooEditor } from '../types';
import { getElement } from './getElement';
import { GetBlockElementEntryOptions } from './getElementEntry';

export type GetElementChildrenOptions = GetBlockElementEntryOptions;

export function getElementChildren<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  options?: GetElementChildrenOptions,
): SlateElement<TElementKeys>['children'] | undefined {
  const element = getElement(editor, blockId, elementType, options);
  if (element) return element.children;

  return undefined;
}
