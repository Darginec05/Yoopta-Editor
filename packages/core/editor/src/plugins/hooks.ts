import { useMemo } from 'react';
import { Editor, Element, Node, Operation, Path, Range, Transforms } from 'slate';
import { buildBlockData } from '../components/Editor/utils';
import { Blocks } from '../editor/blocks';
import { Paths } from '../editor/paths';
import { SlateEditor, YooEditor, YooptaBlockData, YooptaBlockPath } from '../editor/types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { getRootBlockElementType } from '../utils/blockElements';
import { generateId } from '../utils/generateId';
import { HOTKEYS } from '../utils/hotkeys';
import { withInlines } from './extenstions/withInlines';
import { PluginEventHandlerOptions, PluginEvents } from './types';
import { SetSlateOperation, YooptaOperation } from '../editor/core/applyTransforms';
import { finishDraft, isDraft } from 'immer';
import { HistoryEditor } from './slatehistory';

export const useSlateEditor = (
  id: string,
  editor: YooEditor,
  block: YooptaBlockData,
  elements: any,
  withExtensions: any,
) => {
  return useMemo(() => {
    let slate = editor.blockEditorsMap[id];

    const { normalizeNode, insertText, apply, writeHistory } = slate;
    const elementTypes = Object.keys(elements);

    elementTypes.forEach((elementType) => {
      const nodeType = elements[elementType].props?.nodeType;

      const isInline = nodeType === 'inline';
      const isVoid = nodeType === 'void';
      const isInlineVoid = nodeType === 'inlineVoid';

      if (isInlineVoid) {
        slate.markableVoid = (element) => element.type === elementType;
      }

      if (isVoid || isInlineVoid) {
        slate.isVoid = (element) => element.type === elementType;
      }

      if (isInline || isInlineVoid) {
        slate.isInline = (element) => element.type === elementType;

        // [TODO] - Move it to Link plugin extension
        slate = withInlines(editor, slate);
      }
    });

    slate.insertText = (text) => {
      const selectedPaths = Paths.getSelectedPaths(editor.selection);
      const path = Paths.getPath(editor.selection);
      if (Array.isArray(selectedPaths) && selectedPaths.length > 0) {
        editor.setSelection([path, []]);
      }

      insertText(text);
    };

    // This normalization is needed to validate the elements structure
    slate.normalizeNode = (entry) => {
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
          Transforms.setNodes(slate, { type: rootElementType, props: { ...node.props } }, { at: path });
          return;
        }

        if (node.type === rootElementType) {
          for (const [child, childPath] of Node.children(slate, path)) {
            if (Element.isElement(child) && !slate.isInline(child)) {
              Transforms.unwrapNodes(slate, { at: childPath });
              return;
            }
          }
        }
      }

      normalizeNode(entry);
    };

    if (withExtensions) {
      slate = withExtensions(slate, editor, id);
    }

    slate.history = { undos: [], redos: [] };

    slate.redo = () => {
      const { history } = slate;
      const { redos } = history;

      if (redos.length > 0) {
        const batch = redos[redos.length - 1];

        if (batch.selectionBefore) {
          Transforms.setSelection(slate, batch.selectionBefore);
        }

        HistoryEditor.withoutSaving(slate as HistoryEditor, () => {
          Editor.withoutNormalizing(slate, () => {
            for (const op of batch.operations) {
              slate.apply(op);
            }
          });
        });

        history.redos.pop();
        slate.writeHistory('undos', batch);
      }
    };

    slate.undo = () => {
      const { history } = slate;
      const { undos } = history;

      if (undos.length > 0) {
        const batch = undos[undos.length - 1];

        HistoryEditor.withoutSaving(slate as HistoryEditor, () => {
          Editor.withoutNormalizing(slate, () => {
            const inverseOps = batch.operations.map(Operation.inverse).reverse();

            for (const op of inverseOps) {
              slate.apply(op);
            }
            if (batch.selectionBefore) {
              Transforms.setSelection(slate, batch.selectionBefore);
            }
          });
        });

        slate.writeHistory('redos', batch);
        history.undos.pop();
      }
    };

    slate.apply = (op) => {
      if (Operation.isSelectionOperation(op)) {
        const selectedPaths = Paths.getSelectedPaths(editor.selection);
        const path = Paths.getPath(editor.selection);

        if (Array.isArray(selectedPaths) && slate.selection && Range.isExpanded(slate.selection)) {
          editor.setSelection([path, []]);
        }
      }

      const { operations, history } = slate;
      const { undos } = history;
      const lastBatch = undos[undos.length - 1];
      const lastOp = lastBatch && lastBatch.operations[lastBatch.operations.length - 1];
      let save = HistoryEditor.isSaving(slate as HistoryEditor);
      let merge = HistoryEditor.isMerging(slate as HistoryEditor);

      if (save == null) {
        save = shouldSave(op, lastOp);
      }

      if (save) {
        if (merge == null) {
          if (lastBatch == null) {
            merge = false;
          } else if (operations.length !== 0) {
            merge = true;
          } else {
            merge = shouldMerge(op, lastOp);
          }
        }

        if (lastBatch && merge) {
          if (lastOp !== op) {
            lastBatch.operations.push(op);
          }
        } else {
          const batch = {
            operations: [op],
            selectionBefore: slate.selection,
          };

          const setSlateOperation: SetSlateOperation = {
            type: 'set_slate',
            properties: {
              operations: batch.operations,
              selectionBefore: batch.selectionBefore,
            },
            blockId: id,
            slate: slate,
          };

          editor.history.undos.push({
            operations: [setSlateOperation],
            path: [0],
          });

          slate.writeHistory('undos', batch);
        }

        while (undos.length > 100) {
          undos.shift();
        }

        history.redos = [];
      }

      apply(op);
    };

    slate.writeHistory = (stack: 'undos' | 'redos', batch: any) => {
      const setSlateOperation: SetSlateOperation = {
        type: 'set_slate',
        properties: {
          operations: batch.operations,
          selectionBefore: batch.selectionBefore,
        },
        blockId: id,
        slate: slate,
      };

      editor.history.undos.push({
        operations: [setSlateOperation],
        path: [0],
      });

      slate.history[stack].push(batch);
    };

    return slate;
  }, []);
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

const shouldSave = (op: Operation, prev: Operation | undefined): boolean => {
  if (op.type === 'set_selection') {
    return false;
  }

  return true;
};

const shouldMerge = (op: Operation, prev: Operation | undefined): boolean => {
  if (prev === op) return true;

  if (
    prev &&
    op.type === 'insert_text' &&
    prev.type === 'insert_text' &&
    op.offset === prev.offset + prev.text.length &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  if (
    prev &&
    op.type === 'remove_text' &&
    prev.type === 'remove_text' &&
    op.offset + op.text.length === prev.offset &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  return false;
};
