import { SlateElement, YooEditor } from '@yoopta/editor';
import { Path } from 'slate';

export function getBlockElementPath<TElementKeys extends string>(
  editor: YooEditor,
  blockId: string,
  elementType: TElementKeys,
  path: Path,
): Path {
  return [];
}
