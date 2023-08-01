import { DragEvent, useEffect, useState } from 'react';
import { Element, Node, NodeEntry, Path } from 'slate';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooEditor, YooptaBaseElement } from '../types';
import { deepClone } from '../utils/deepClone';

export type DraggedNode = {
  path: number[] | null;
  element: Pick<YooptaBaseElement<string>, 'id' | 'type'> | null;
  parent: NodeEntry<Node> | null;
};

export type DndState = {
  from: DraggedNode;
  to: DraggedNode;
};

export type DragDropValues = {
  dndState: DndState;
  disableWhileDrag: boolean;
  DRAG_MAP: Map<YooptaBaseElement<string>['id'], YooptaBaseElement<string>>;
};

export type DragDropHandlers = {
  onDrop: (_e: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (_e: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (_e) => void;
  onDragStart: (_e, from: DraggedNode) => void;
};

export const DEFAULT_DRAG_STATE: DndState = {
  from: { path: null, element: null, parent: null },
  to: { path: null, element: null, parent: null },
};

export const useDragDrop = (editor: YooEditor): [DragDropValues, DragDropHandlers] => {
  const [disableWhileDrag, setIsDisableByDrag] = useState(false);
  const [dndState, setDndState] = useState<DndState>(DEFAULT_DRAG_STATE);
  const [DRAG_MAP] = useState(() => new Map());

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target: HTMLDivElement = e.target.closest('[data-element-id]');

    if (target) {
      const { elementId, elementType } = target.dataset;
      if (!elementId || !elementType) return;

      const toNodeElement = DRAG_MAP.get(elementId);
      if (toNodeElement.data?.skipDrag) return;

      const toNodePath = ReactEditor.findPath(editor, toNodeElement);

      setDndState((prevDragState) => ({
        from: prevDragState.from,
        to: { path: toNodePath, element: { id: elementId, type: elementType }, parent: null },
      }));
    }
  };

  const onDragEnd = (e) => {
    e.stopPropagation();

    e.target.removeAttribute('draggable');
    e.target.ondragstart = null;
    e.target.ondragend = null;
    e.target.ondragenter = null;
    e.target.ondragover = null;

    setIsDisableByDrag(false);
    setDndState(DEFAULT_DRAG_STATE);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    try {
      Editor.withoutNormalizing(editor, () => {
        e.preventDefault();
        e.stopPropagation();
        if (dndState.from.element?.id === dndState.to.element?.id) return;

        const fromPath = dndState.from.path;

        const toNodeElement = DRAG_MAP.get(dndState.to.element!.id);
        let toPath: Path | null = ReactEditor.findPath(editor, toNodeElement);

        if (!fromPath || !toPath) return;

        const [fromElementNode, fromElementPath] = Editor.node(editor, fromPath);
        const [parentElementNode, parentElementPath] = Editor.parent(editor, fromElementPath);

        console.log('fromPath', fromPath);
        console.log('fromElementPath', fromElementPath);
        console.log('toPath', toPath);
        console.log('toPath next', Path.next(toPath));
        console.log('fromElementNode', fromElementNode);
        console.log('parentElementNode', parentElementNode);

        if (toPath.length > 1) {
          const draggedElement = deepClone(fromElementNode);
          const deeper = toPath.length > fromPath.length;

          // [TODO] - strange behaviour of slate or of me
          if (deeper) {
            Transforms.insertNodes(editor, draggedElement, {
              at: toPath.length === fromPath.length ? toPath : Path.next(toPath),
              match: (n) => Element.isElement(n),
              mode: 'lowest',
            });
            Transforms.removeNodes(editor, {
              at: fromPath,
              match: (n) => Element.isElement(n) && n.id === draggedElement?.id,
              mode: 'lowest',
            });
          } else {
            Transforms.removeNodes(editor, {
              at: fromPath,
              match: (n) => Element.isElement(n) && n.id === draggedElement?.id,
              mode: 'lowest',
            });

            Transforms.insertNodes(editor, draggedElement, {
              at: toPath.length === fromPath.length ? toPath : Path.next(toPath),
              match: (n) => Element.isElement(n),
              mode: 'lowest',
            });
          }

          if (parentElementNode.children.length === 1 && Element.isElement(parentElementNode.children[0])) {
            Transforms.removeNodes(editor, {
              at: parentElementPath,
              match: (n) => Element.isElement(n) && parentElementNode.id === n.id,
              mode: 'lowest',
            });
          }
        } else {
          Transforms.moveNodes(editor, {
            at: fromPath,
            to: toPath,
            match: (node) =>
              Element.isElement(node) && Element.isElement(fromElementNode) && fromElementNode.type === node.type,
            mode: 'lowest',
          });
        }

        e.dataTransfer.clearData();
        DRAG_MAP.clear();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, from: DraggedNode) => {
    setIsDisableByDrag(true);

    e.dataTransfer.setData('Text', '');
    e.dataTransfer.effectAllowed = 'move';

    const editorEl = document.getElementById('yoopta-contenteditable');

    if (editorEl) {
      editorEl.ondragenter = (e) => onDragEnter(e);
      editorEl.ondragover = (event) => {
        event.stopPropagation();
        event.preventDefault();
        return false;
      };

      setDndState((prevDragState) => ({ to: prevDragState.to, from }));
    }
  };

  const values = { dndState, disableWhileDrag, DRAG_MAP };
  const events = {
    onDrop,
    onDragEnd,
    onDragEnter,
    onDragStart,
  };

  return [values, events];
};
