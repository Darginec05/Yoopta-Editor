import { Range } from 'slate';
import { useState } from 'react';
import { useSelected, useSlate } from 'slate-react';
import cx from 'classnames';
import { HoveredMenuItem } from './HoveredMenuItem';
import s from './HoveredMenu.module.scss';

const ElementHover = ({ children, element, attributes, onPlusButtonClick }) => {
  const editor = useSlate();
  const selected = useSelected();
  const [hovered, setHovered] = useState(false);

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
      className={cx(s.hoverWrap, { [s.placeholder]: showPlaceholder })}
      data-node-id={element.id}
      onMouseEnter={onHover}
      onMouseLeave={() => setHovered(false)}
      {...attributes}
    >
      <HoveredMenuItem handlePlusButton={handlePlusButton} hovered={hovered} />
      <div style={{ padding: '0 64px' }}>{children}</div>
    </section>
  );
};

export { ElementHover };
