import { Editor, Element, NodeEntry, Path } from 'slate';
import { SlateElement } from '../editor/types';
import { PluginElement, PluginElementProps, PluginElementsMap } from '../plugins/types';
import { generateId } from './generateId';

export function getRootBlockElement(
  elems: PluginElementsMap<string, unknown> | undefined,
): PluginElement<unknown> | undefined {
  if (!elems) return;

  const elements = Object.values(elems);
  const rootElement = elements.length === 1 ? elements[0] : elements.find((el) => el.asRoot);

  return rootElement;
}

export function isRootElementVoid(elems: PluginElementsMap<string, unknown> | undefined): boolean {
  const rootElement = getRootBlockElement(elems);
  return rootElement?.props?.nodeType === 'void';
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

export function buildSlateNodeElement(
  type: string,
  props: PluginElementProps<unknown> = { nodeType: 'block' },
): SlateElement<any> {
  return { id: generateId(), type, children: [{ text: '' }], props: props };
}
