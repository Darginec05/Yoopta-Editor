import { Editor, Element, Path } from 'slate';

export const getMatchedNode = (editor: Editor, type: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    }),
  );

  return match;
};

export const isElementActive = (editor: Editor, type: string) => !!getMatchedNode(editor, type);

export const getNodeByPath = (editor: Editor, path?: Path, mode: 'all' | 'highest' | 'lowest' = 'lowest') => {
  const nodeEntry = Array.from(
    Editor.nodes(editor, {
      match: (node) => Editor.isEditor(editor) && Element.isElement(node),
      at: path || editor.selection?.anchor.path,
      mode,
    }),
  )[0];

  if (nodeEntry) return nodeEntry[0];

  return editor.children[0];
};
