import { YooptaBaseElement } from '../../types';
import { YooptaPluginType, YooptaRenderElementFunc } from '../../utils/plugins';
import { Editor } from 'slate';

export const getDefaultParagraphLine = (id: string): YooptaBaseElement<'paragraph'> => ({
  id,
  type: 'paragraph',
  nodeType: 'block',
  children: [{ text: '' }],
});

export function getRenderFunctionFactory(plugin: YooptaPluginType): YooptaRenderElementFunc {
  if (typeof plugin.renderer === 'function') {
    return plugin.renderer;
  }

  return plugin.renderer.editor;
}

export function isElementHasText(element: YooptaBaseElement<string>): boolean {
  if (element?.children?.length === 1 && element?.children[0]?.text.length === 0) return false;

  return true;
}

function checkIsMarkActive(editor, mark) {
  const marks = Editor.marks(editor);
  const checkIsMarkActive = !!marks?.[mark];
  return checkIsMarkActive;
}

export function toggleMark(editor, mark: any, only: boolean = false) {
  if (only) {
    Object.keys(Editor.marks(editor) || {}).forEach((activeMark) => {
      Editor.removeMark(editor, activeMark);
    });
  }

  if (!checkIsMarkActive(editor, mark)) Editor.addMark(editor, mark, true);
  else Editor.removeMark(editor, mark);
}
