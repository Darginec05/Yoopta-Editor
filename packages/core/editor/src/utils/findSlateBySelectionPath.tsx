import { SlateEditor, YooEditor, YooptaEditorTransformOptions } from '../editor/types';

export function findSlateBySelectionPath(
  editor: YooEditor,
  options: Pick<YooptaEditorTransformOptions, 'at'> = {},
): SlateEditor | undefined {
  const childrenKeys = Object.keys(editor.children);
  const { at = editor.selection } = options;

  const blockId = childrenKeys.find((childrenId) => {
    const plugin = editor.children[childrenId];
    return plugin.meta.order === at?.[0];
  });

  if (!blockId) return undefined;
  return editor.blockEditorsMap[blockId];
}
