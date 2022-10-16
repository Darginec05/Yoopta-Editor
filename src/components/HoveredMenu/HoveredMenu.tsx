import { Range, Transforms, Editor, Element as SlateElement } from 'slate';
import { v4 } from 'uuid';
import copy from 'copy-to-clipboard';
import { useMemo, useState } from 'react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import cx from 'classnames';
import { HoveredMenuItem } from './HoveredMenuItem';
import { useAlert } from '../Alert/Alert';
import s from './HoveredMenu.module.scss';

const ElementHover = ({
  children,
  element,
  attributes,
  onPlusButtonClick,
  onDragStart,
  onDragEnd,
  onDrop,
  dndState,
}) => {
  const editor = useSlate();
  const selected = useSelected();
  const alert = useAlert();
  const [hovered, setHovered] = useState(false);

  const id = useMemo(() => v4(), []);

  const elementRef = attributes.ref;

  const index = ReactEditor.findPath(editor, element)[0];

  const isDragging = index === dndState.from;
  const isOver = index === dndState.to;
  const isOverSelf = isDragging && isOver;

  const opacity = isDragging ? 0.4 : 1;

  const isCurrentItemSelected = editor.selection && Range.isCollapsed(editor.selection) && selected;

  const showPlaceholder =
    isCurrentItemSelected && element.children[0].text === '' && !element.isVoid && !['image'].includes(element.type);

  const onHover = () => setHovered(true);
  const onHoverOut = () => setHovered(false);

  const handlePlusButton = () => {
    onHoverOut();
    onPlusButtonClick(element);
  };

  const handleDeleteNode = () => {
    Transforms.removeNodes(editor, {
      at: editor.selection?.anchor,
      match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
    });
  };

  const handleDuplicateNode = () => {
    const currentNode = Array.from(
      Editor.nodes(editor, {
        match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
        at: editor.selection?.anchor,
      }),
    )[0]?.[0];

    if (currentNode) {
      const duplicatedNode = { ...currentNode, id: v4() };

      Transforms.insertNodes(editor, duplicatedNode, {
        at: { offset: 0, path: [editor.selection!.anchor.path[0] + 1, 0] },
        match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
      });
    }
  };

  const handleTransformIntoNode = () => {
    console.log(editor.selection?.anchor);
  };

  const handleCopyLinkNode = () => {
    copy(`${window.location.origin}#${element.id}`);
    alert.info('Link successfully copied', { position: 'right' });
  };

  return (
    <section
      className={cx(s.hoverWrap, {
        [s.placeholder]: showPlaceholder,
        [s.isOver]: isOver,
        [s.isOverSelf]: isOverSelf,
      })}
      data-node-id={element.id || id}
      data-node-type={element.type}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
      style={{ opacity }}
      onDrop={onDrop}
      {...attributes}
    >
      <HoveredMenuItem
        handlePlusButton={handlePlusButton}
        hovered={hovered}
        elementRef={elementRef}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        isDragging={isDragging}
        handleDeleteNode={handleDeleteNode}
        handleDuplicateNode={handleDuplicateNode}
        handleTransformIntoNode={handleTransformIntoNode}
        handleCopyLinkNode={handleCopyLinkNode}
      />
      <div style={{ padding: '0 64px' }}>{children}</div>
    </section>
  );
};

export { ElementHover };
