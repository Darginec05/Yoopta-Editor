import { SlateElement, YooEditor } from '../types';
import { getElement } from './getElement';
import { GetBlockElementEntryOptions } from './getElementEntry';

export type GetElementChildrenOptions = GetBlockElementEntryOptions;

export function getElementChildren<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  options?: GetElementChildrenOptions,
): SlateElement<TElementKeys>['children'] | undefined {
  const element = getElement(editor, blockId, options);
  if (element) return element.children;

  return undefined;
}
