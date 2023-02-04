import { MouseEvent, useMemo } from 'react';
import { useSlate } from 'slate-react';
import cx from 'classnames';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { NodeSettings } from '../NodeSettings/NodeSettings';
import { getNodePath } from '../Editor/utils';
import s from './HoveredMenu.module.scss';

const ElementHover = ({
  children,
  element,
  attributes,
  hideSettings = false,
  isInlineNode = false,
  isNestedNode = false,
}) => {
  const editor = useSlate();

  const [{ hoveredNode, isNodeSettingsOpen, nodeSettingsPos, dndState }, handlers] = useNodeSettingsContext();
  const { hoverIn, hoverOut, onDrop } = handlers;

  const dragState = useMemo(() => {
    if (dndState.fromPath === null || dndState.toPath === null) {
      return {
        isDragging: false,
        isOver: false,
        isOverSelf: false,
      };
    }

    const nodePath = getNodePath(editor, element);
    const isDragging = dndState.fromPath.toString() === nodePath.toString();
    const isOver = dndState.toPath.toString() === nodePath.toString();
    const isOverSelf = isDragging && isOver;

    return {
      isDragging,
      isOver,
      isOverSelf,
    };
  }, [dndState.fromPath, dndState.toPath]);

  const { isDragging, isOver, isOverSelf } = dragState;

  const styles = {
    opacity: isDragging ? 0.4 : 1,
  };

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => hoverIn(e, element);
  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => hoverOut(e, element);

  if (isInlineNode) return children;

  return (
    <section
      className={cx(s.hoverWrap, { [s.noPadding]: isNestedNode }, 'yopta-node')}
      data-node-id={element.id}
      data-node-type={element.type}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={styles}
      onDrop={onDrop}
      {...attributes}
    >
      {!hideSettings && (
        <NodeSettings
          hoveredNode={hoveredNode}
          isNestedNode={isNestedNode}
          isNodeSettingsOpen={isNodeSettingsOpen}
          nodeSettingsPos={nodeSettingsPos}
          handlers={handlers}
          editor={editor}
          element={element}
        />
      )}
      <div
        className={cx(s.node, {
          [s.isOver]: isOver,
          [s.isOverSelf]: isOverSelf,
        })}
      >
        {children}
      </div>
    </section>
  );
};

export { ElementHover };
