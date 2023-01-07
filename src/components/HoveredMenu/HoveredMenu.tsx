import { MouseEvent } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import cx from 'classnames';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { NodeSettings } from '../NodeSettings/NodeSettings';
import s from './HoveredMenu.module.scss';

const ElementHover = ({ children, element, attributes, shouldIgnoreSettings = false, isInlineNode = false }) => {
  const editor = useSlate();
  const index = ReactEditor.findPath(editor, element)[0];

  const [{ hoveredNode, isNodeSettingsOpen, nodeSettingsPos, dndState }, handlers] = useNodeSettingsContext();
  const { hoverIn, hoverOut, onDrop } = handlers;

  const isDragging = index === dndState.from;
  const isOver = index === dndState.to;
  const isOverSelf = isDragging && isOver;

  const styles = {
    opacity: isDragging ? 0.4 : 1,
  };

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => hoverIn(e, element);
  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => hoverOut(e, element);

  if (isInlineNode) return children;

  return (
    <section
      className={cx(s.hoverWrap, {
        [s.isOver]: isOver,
        [s.isOverSelf]: isOverSelf,
      })}
      data-node-id={element.id}
      data-node-type={element.type}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={styles}
      onDrop={onDrop}
      {...attributes}
    >
      {!shouldIgnoreSettings && (
        <NodeSettings
          hoveredNode={hoveredNode}
          elementId={element.id}
          isNodeSettingsOpen={isNodeSettingsOpen}
          nodeSettingsPos={nodeSettingsPos}
          handlers={handlers}
          editor={editor}
        />
      )}
      <div>{children}</div>
    </section>
  );
};

export { ElementHover };
