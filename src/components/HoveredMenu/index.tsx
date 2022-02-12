import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement, Path, Point, Span, Range, Element } from 'slate';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { v4 } from 'uuid';
import { ReactComponent as PlusIcon } from '../../icons/add.svg';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import s from './HoveredMenu.module.scss';

const HoveredMenu = ({ element, editor }) => {
  const handlePlus = () => {
    // [TODO] - insert after clicked node
    const path = ReactEditor.findPath(editor, element);
    const after = Editor.after(editor, path);

    Transforms.insertNodes(
      editor,
      [
        {
          id: v4(),
          type: 'paragraph',
          children: [{ text: 'FIX ME' }],
        },
      ],
      {
        at: after,
        match: (n) => SlateElement.isElement(n),
      },
    );
  };

  return (
    <div className={s.hoverSettings}>
      <button type="button" onClick={handlePlus} title="Click to add node" className={s.hoverSettingsItem}>
        <PlusIcon />
      </button>
      <button type="button" title="Click to add node" className={s.hoverSettingsItem}>
        <DragIcon />
      </button>
    </div>
  );
};

const findNode = (editor: Editor, id) => {
  const voids = undefined;

  const nodeEntry = Editor.nodes(editor, {
    voids,
    match: (n) => {
      return Element.isElement(n) && n.id === id;
    },
  });

  const { value } = nodeEntry.next();
  return [value[0], value[1]];
};

const ElementHover = ({ children, element }) => {
  const ref = useRef(null);
  const editor = useSlate();
  const index = ReactEditor.findPath(editor, element)[0];

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { ...element, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (dragItem: any, monitor: DropTargetMonitor) => {
      ReactEditor.focus(editor);

      const dragEntry = findNode(editor, dragItem.id);
      const [, dragPath] = dragEntry;
      const dropEntry = findNode(editor, element.id);
      const [, dropPath] = dropEntry;

      console.log({ dropPath, dragPath });

      const _dropPath = dropPath as Path;

      const before = Path.isBefore(dragPath, _dropPath)
          && Path.isSibling(dragPath, _dropPath);
      const to = before ? _dropPath : Path.next(_dropPath);

      Transforms.moveNodes(editor, {
        at: dragPath,
        to,
      });
    },
    // hover: (item, monitor) => {
    //   const dragIndex = item.index;
    //   const hoverIndex = index;

    //   // console.log(
    //   //   Editor.nodes(editor, {
    //   //     at: [dragIndex],
    //   //   }),
    //   // );
    //   // console.log(
    //   //   Editor.nodes(editor, {
    //   //     at: [hoverIndex],
    //   //   }),
    //   // );

    //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //   const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //   const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

    //   // if dragging down, continue only when hover is smaller than middle Y
    //   if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
    //   // if dragging up, continue only when hover is bigger than middle Y
    //   if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

    //   // // moveListItem(dragIndex, hoverIndex);
    //   item.index = hoverIndex;
    // },
  });

  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div className={s.hoverWrap} data-node-id={element.id} ref={dragDropRef} style={{ opacity }}>
      <HoveredMenu element={element} editor={editor} />
      {children}
    </div>
  );
};

export { ElementHover };
