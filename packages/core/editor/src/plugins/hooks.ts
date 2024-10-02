import { useMemo } from 'react';
import { Element, Node, Operation, Range, Transforms } from 'slate';
import { buildBlockData } from '../components/Editor/utils';
import { Blocks } from '../editor/blocks';
import { Paths } from '../editor/paths';
import { SlateEditor, YooEditor, YooptaBlockData } from '../editor/types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { getRootBlockElementType } from '../utils/blockElements';
import { generateId } from '../utils/generateId';
import { HOTKEYS } from '../utils/hotkeys';
import { withInlines } from './extenstions/withInlines';
import { PluginEventHandlerOptions, PluginEvents } from './types';

export const useSlateEditor = (
  id: string,
  editor: YooEditor,
  block: YooptaBlockData,
  elements: any,
  withExtensions: any,
) => {
  return useMemo(() => {
    let slateEditor = editor.blockEditorsMap[id];

    const { normalizeNode, insertText, apply } = slateEditor;
    const elementTypes = Object.keys(elements);

    elementTypes.forEach((elementType) => {
      const nodeType = elements[elementType].props?.nodeType;

      const isInline = nodeType === 'inline';
      const isVoid = nodeType === 'void';
      const isInlineVoid = nodeType === 'inlineVoid';

      if (isInlineVoid) {
        slateEditor.markableVoid = (element) => element.type === elementType;
      }

      if (isVoid || isInlineVoid) {
        slateEditor.isVoid = (element) => element.type === elementType;
      }

      if (isInline || isInlineVoid) {
        slateEditor.isInline = (element) => element.type === elementType;

        // [TODO] - Move it to Link plugin extension
        slateEditor = withInlines(editor, slateEditor);
      }
    });

    slateEditor.insertText = (text) => {
      const selectedPaths = Paths.getSelectedPaths(editor.selection);
      const path = Paths.getPath(editor.selection);
      console.log('selectedPaths', selectedPaths);
      if (Array.isArray(selectedPaths)) {
        editor.setSelection([path, []]);
      }

      insertText(text);
    };

    slateEditor.apply = (op) => {
      if (Operation.isSelectionOperation(op)) {
        const selectedPaths = Paths.getSelectedPaths(editor.selection);
        const path = Paths.getPath(editor.selection);

        if (Array.isArray(selectedPaths) && slateEditor.selection && Range.isExpanded(slateEditor.selection)) {
          editor.setSelection([path, []]);
        }
      }

      apply(op);
    };

    // This normalization is needed to validate the elements structure
    slateEditor.normalizeNode = (entry) => {
      const [node, path] = entry;
      const blockElements = editor.blocks[block.type].elements;

      // Normalize only `simple` block elements.
      // Simple elements are elements that have only one defined block element type.
      // [TODO] - handle validation for complex block elements
      if (Object.keys(blockElements).length > 1) {
        return normalizeNode(entry);
      }

      if (Element.isElement(node)) {
        const { type } = node;
        const rootElementType = getRootBlockElementType(blockElements);

        if (!elementTypes.includes(type)) {
          Transforms.setNodes(slateEditor, { type: rootElementType, props: { ...node.props } }, { at: path });
          return;
        }

        if (node.type === rootElementType) {
          for (const [child, childPath] of Node.children(slateEditor, path)) {
            if (Element.isElement(child) && !slateEditor.isInline(child)) {
              Transforms.unwrapNodes(slateEditor, { at: childPath });
              return;
            }
          }
        }
      }

      normalizeNode(entry);
    };

    if (withExtensions) {
      slateEditor = withExtensions(slateEditor, editor, id);
    }

    return slateEditor;
  }, [elements, id, withExtensions]);
};

export const useEventHandlers = (
  events: PluginEvents | undefined,
  editor: YooEditor,
  block: YooptaBlockData,
  slate: SlateEditor,
) => {
  return useMemo<EditorEventHandlers>(() => {
    if (!events || editor.readOnly) return {};
    const { onBeforeCreate, onDestroy, onCreate, ...eventHandlers } = events || {};

    const eventHandlersOptions: PluginEventHandlerOptions = {
      hotkeys: HOTKEYS,
      currentBlock: block,
      defaultBlock: Blocks.buildBlockData({ id: generateId() }),
    };
    const eventHandlersMap = {};

    Object.keys(eventHandlers).forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        if (eventHandlers[eventType]) {
          const handler = eventHandlers[eventType](editor, slate, eventHandlersOptions);
          handler(event);
        }
      };
    });

    return eventHandlersMap;
  }, [events, editor, block]);
};
