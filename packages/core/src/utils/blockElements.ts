import { Editor, Element, NodeEntry, Path } from 'slate';
import { SlateElement } from '../editor/types';
import { PluginElement, PluginElementsMap } from '../plugins/types';

export function getRootBlockElement(
  elems: PluginElementsMap<string, unknown> | undefined,
): PluginElement<unknown> | undefined {
  if (!elems) return;

  const elements = Object.values(elems);
  const rootElement = elements.length === 1 ? elements[0] : elements.find((el) => el.asRoot);

  return rootElement;
}

export function getBlockElementNode(slate): NodeEntry<SlateElement> | undefined {
  const parentPath = Path.parent(slate.selection.anchor.path);

  const nodes = Editor.nodes(slate, {
    at: parentPath,
    match: (n) => !Editor.isEditor(n) && Element.isElement(n),
    mode: 'lowest',
  });

  if (nodes) {
    const [nodeEntry] = nodes;
    return nodeEntry as NodeEntry<SlateElement>;
  }
}
