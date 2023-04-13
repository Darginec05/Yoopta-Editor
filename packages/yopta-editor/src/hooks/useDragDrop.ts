import { DragEvent, useEffect, useState } from 'react';
import { Element, Node, Path } from 'slate';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { ReactEditor } from 'slate-react';
// import { markdown, html } from '@yopta/exports';
import { YoEditor, YoptaBaseElement } from '../types';

// markdown.deserialize();
// markdown.serialize();
// html.serialize();
// html.deserialize();

export type DraggedNode = { path: number[] | null; element: Pick<YoptaBaseElement<string>, 'id' | 'type'> | null };

export type DndState = {
  from: DraggedNode;
  to: DraggedNode;
};

export type DragDropValues = {
  dndState: DndState;
  disableWhileDrag: boolean;
  DRAG_MAP: Map<YoptaBaseElement<string>['id'], YoptaBaseElement<string>>;
};

export type DragDropHandlers = {
  onDrop: (_e: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (_e: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (_e) => void;
  onDragStart: (_e, from: DraggedNode) => void;
};

export const DEFAULT_DRAG_STATE = {
  from: { path: null, element: null },
  to: { path: null, element: null },
};

const findNodeBy = ({ nodes, value, by = 'id' }) => {
  let foundElement;

  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];

    if (Element.isElement(element)) {
      if (element.id === value) {
        console.log('element.id === value element', element);
        foundElement = element;
        break;
      } else findNodeBy({ nodes: element.children, value, by });
    }
  }

  if (foundElement) return foundElement;
};

export const useDragDrop = (editor: YoEditor): [DragDropValues, DragDropHandlers] => {
  const [disableWhileDrag, setIsDisableByDrag] = useState(false);
  const [dndState, setDndState] = useState<DndState>(DEFAULT_DRAG_STATE);
  const [DRAG_MAP] = useState(() => new Map());

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target: HTMLDivElement = e.target.closest('[data-element-id]');

    console.log(e.target!.closest('[data-element-id]'));

    if (target) {
      const { elementId, elementType } = target.dataset;
      if (!elementId || !elementType) return;

      let path: Path | null = null;

      setDndState((prevDragState) => ({
        from: prevDragState.from,
        to: { path: path, element: { id: elementId, type: elementType } },
      }));
    }
  };

  const onDragEnd = (e) => {
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
        e.stopPropagation();
        if (dndState.from.element?.id === dndState.to.element?.id) return;

        const fromPath = dndState.from.path;

        const toNodeElement = DRAG_MAP.get(dndState.to.element!.id);
        let toPath: Path | null = ReactEditor.findPath(editor, toNodeElement);

        if (!fromPath || !toPath) return;

        const [fromElementNode, fromElementPath] = Editor.node(editor, fromPath);
        const [parentElementNode, parentElementPath] = Editor.parent(editor, fromElementPath);

        // [TODO] - bug with list
        if (parentElementNode.children.length === 1 && Element.isElement(parentElementNode.children[0])) {
          Transforms.removeNodes(editor, {
            at: parentElementPath,
            match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.id === parentElementNode.id,
          });
        }

        console.log('fromPath', fromPath);
        console.log('toPath', toPath);
        console.log('toPath next', Path.next(toPath));
        console.log('fromElementNode', fromElementNode);
        console.log('parentElementNode', parentElementNode);
        console.log('DRAG_MAP', DRAG_MAP);

        if (toPath.length > 1) {
          // if (toPath.length === fromPath.length) {
          Transforms.removeNodes(editor, {
            at: fromPath,
            match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.id === dndState.from.element?.id,
          });

          Transforms.insertNodes(editor, fromElementNode, {
            // [TODO] - check if current parent item is the same
            at: toPath.length === fromPath.length ? toPath : Path.next(toPath),
            // at: Path.next(toPath),
            match: (n) => !Editor.isEditor(n) && Element.isElement(n),
            mode: 'lowest',
          });
          // } else {
          //   console.log('just FUCK YOU with diff length');
          // }
        } else {
          Transforms.moveNodes(editor, {
            at: fromPath,
            to: toPath,
            match: (node) => Editor.isEditor(editor) && Element.isElement(node),
            mode: 'highest',
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

    const editorEl = document.getElementById('yopta-contenteditable');

    if (editorEl) {
      editorEl.ondragenter = (e) => onDragEnter(e);
      editorEl.ondragover = (event) => {
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
