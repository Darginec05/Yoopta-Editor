import { useSlate } from 'slate-react';
import { HoveredMenuItem } from './HoveredMenuItem';
import s from './HoveredMenu.module.scss';

const ElementHover = ({ children, element, attributes }) => {
  const editor = useSlate();
  // const ref = useRef(null);
  // const index = ReactEditor.findPath(editor, element)[0];

  // const findNode = (editor: Editor, id: string) => {
  //   const voids = undefined;

  //   const nodeEntry = Editor.nodes(editor, {
  //     voids,
  //     match: (n) => {
  //       return Element.isElement(n) && n.id === id;
  //     },
  //   });

  //   const { value } = nodeEntry.next();
  //   return [value[0], value[1]];
  // };

  // const [{ isDragging }, dragRef] = useDrag({
  //   type: 'item',
  //   item: { ...element, index },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // const [, dropRef] = useDrop({
  //   accept: 'item',
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //   }),
  //   drop: (dragItem: any, monitor: DropTargetMonitor) => {
  //     ReactEditor.focus(editor);

  //     const dragEntry = findNode(editor, dragItem.id);
  //     const [, dragPath] = dragEntry;
  //     const dropEntry = findNode(editor, element.id);
  //     const [, dropPath] = dropEntry;

  //     const _dropPath = dropPath as Path;

  //     const before = Path.isBefore(dragPath, _dropPath) && Path.isSibling(dragPath, _dropPath);
  //     const to = before ? _dropPath : Path.next(_dropPath);

  //     Transforms.moveNodes(editor, {
  //       at: dragPath,
  //       to,
  //     });
  //   },
  //   hover: (item, monitor) => {
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     // console.log(
  //     //   Editor.nodes(editor, {
  //     //     at: [dragIndex],
  //     //   }),
  //     // );
  //     // console.log(
  //     //   Editor.nodes(editor, {
  //     //     at: [hoverIndex],
  //     //   }),
  //     // );

  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

  //     // if dragging down, continue only when hover is smaller than middle Y
  //     if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
  //     // if dragging up, continue only when hover is bigger than middle Y
  //     if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

  //     // // moveListItem(dragIndex, hoverIndex);
  //     item.index = hoverIndex;
  //   // },
  // });

  // const dragDropRef = dragRef(dropRef(ref));
  // const opacity = isDragging ? 0.4 : 1;

  return (
    <section className={s.hoverWrap} data-node-id={element.id} {...attributes}>
      <HoveredMenuItem element={element} editor={editor} />
      {children}
    </section>
  );
};

export { ElementHover };
