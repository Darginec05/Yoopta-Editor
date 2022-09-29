import { Range } from 'slate';
import { useState } from 'react';
import { ReactEditor, useSelected, useSlate } from 'slate-react';
import cx from 'classnames';
import { HoveredMenuItem } from './HoveredMenuItem';
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
  const [hovered, setHovered] = useState(false);

  const index = ReactEditor.findPath(editor, element)[0];

  const isDragging = index === dndState.from;
  const isOver = index === dndState.to;
  const isOverCurrent = isDragging && isOver;

  const opacity = isDragging ? 0.4 : 1;

  const isCurrentItemSelected = editor.selection && Range.isCollapsed(editor.selection) && selected;

  const showPlaceholder =
    isCurrentItemSelected && element.children[0].text === '' && !element.isVoid && !['image'].includes(element.type);

  const onHover = () => setHovered(true);

  const handlePlusButton = () => {
    setHovered(false);
    onPlusButtonClick(element);
  };

  return (
    <section
      className={cx(s.hoverWrap, {
        [s.placeholder]: showPlaceholder,
        [s.isOver]: isOver,
        [s.isOverCurrent]: isOverCurrent,
      })}
      data-node-id={element.id}
      onMouseEnter={onHover}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity }}
      onDrop={onDrop}
      {...attributes}
    >
      <HoveredMenuItem
        handlePlusButton={handlePlusButton}
        hovered={hovered}
        elementRef={attributes.ref}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        isDragging={isDragging}
      />
      <div style={{ padding: '0 64px' }}>{children}</div>
    </section>
  );
};

export { ElementHover };
