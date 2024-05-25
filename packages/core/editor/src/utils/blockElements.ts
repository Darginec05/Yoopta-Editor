import { Editor, Element, NodeEntry, Path } from 'slate';
import { buildBlockElement } from '../components/Editor/utils';
import { SlateElement, YooEditor, YooptaBlock } from '../editor/types';
import { PluginElement, PluginElementProps, PluginElementsMap } from '../plugins/types';
import { generateId } from './generateId';

export function getRootBlockElementType(elems: PluginElementsMap<string, unknown> | undefined): string | undefined {
  if (!elems) return;

  const elements = Object.keys(elems);
  const rootElementType = elements.length === 1 ? elements[0] : elements.find((key) => elems[key].asRoot);

  return rootElementType;
}

export function getRootBlockElement(
  elems: PluginElementsMap<string, unknown> | undefined,
): PluginElement<unknown> | undefined {
  if (!elems) return;

  const rootElementType = getRootBlockElementType(elems);
  const rootElement = rootElementType ? elems[rootElementType] : undefined;

  return rootElement;
}

export function isRootElementVoid(elems: PluginElementsMap<string, unknown> | undefined): boolean {
  const rootElement = getRootBlockElement(elems);
  return rootElement?.props?.nodeType === 'void';
}

export type GetBlockElementNodeOptions = {
  at?: Path;
  elementType?: string;
};

export function getBlockElementNode(
  slate: Editor,
  options: GetBlockElementNodeOptions = {},
): NodeEntry<SlateElement> | undefined {
  const { at, elementType } = options;

  const atPath = at || slate.selection?.anchor.path;
  if (!atPath) return;

  let match = (n) => !Editor.isEditor(n) && Element.isElement(n);

  if (elementType) {
    match = (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === elementType;
  }

  const parentPath = Path.parent(atPath);
  const nodes = Editor.nodes(slate, {
    at: parentPath,
    match,
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

function recursivelyCollectElementChildren(
  blockElement: PluginElement<unknown>,
  blockElements: PluginElementsMap,
): SlateElement[] {
  return (
    blockElement.children?.map((elementType) => {
      const childElement = blockElements[elementType];
      if (!childElement) {
        throw new Error(`Element definition for ${elementType} not found`);
      }

      const childNode: SlateElement = buildBlockElement({
        id: generateId(),
        type: elementType,
        props: childElement.props,
        children:
          childElement.children && childElement.children.length > 0
            ? recursivelyCollectElementChildren(childElement, blockElements)
            : [{ text: '' }],
      });

      return childNode;
    }) || []
  );
}
export function buildBlockElementsStructure(editor: YooEditor, blockType: string): SlateElement {
  const block: YooptaBlock = editor.blocks[blockType];
  const blockElements = block.elements;
  const rootBlockElementType = getRootBlockElementType(blockElements);
  if (!rootBlockElementType) {
    throw new Error(`Root element type not found for block type ${blockType}`);
  }
  const rootBlockElement = blockElements[rootBlockElementType];

  const rootElementNode: SlateElement = {
    id: generateId(),
    type: rootBlockElementType,
    props: rootBlockElement.props,
    children:
      rootBlockElement.children && rootBlockElement.children.length > 0
        ? recursivelyCollectElementChildren(rootBlockElement, blockElements)
        : [{ text: '' }],
  };

  console.log('rootElementNode', rootElementNode);
  console.log('rootBlockElement', rootBlockElement);

  return rootElementNode;
}
