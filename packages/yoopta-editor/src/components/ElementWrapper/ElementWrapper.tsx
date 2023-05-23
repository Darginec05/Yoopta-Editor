import { HTMLAttributes, MouseEvent, ReactElement, useMemo } from 'react';
import { RenderElementProps, useSlate } from 'slate-react';
import cx from 'classnames';
import { YooptaElementConfig } from '../../types';
import { useElementSettings } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { ElementActions } from './ElementActions';
import { YooptaRenderHTMLAttributes } from '../../utils/plugins';
import s from './ElementWrapper.module.scss';

type Props = RenderElementProps & {
  nodeType: YooptaElementConfig['nodeType'];
  render: (props: RenderElementProps & YooptaRenderHTMLAttributes) => ReactElement;
  HTMLAttributes?: HTMLAttributes<HTMLElement>;
};

const ElementWrapper = ({ children, element, attributes, nodeType, render, HTMLAttributes }: Props) => {
  const editor = useSlate();
  const [values, handlers] = useElementSettings();

  const isInline = nodeType === 'inline';
  const { hoverIn, onDrop } = handlers;
  const { dndState, DRAG_MAP } = values;

  const dragState = useMemo(() => {
    if (dndState.from.element === null || dndState.to.element === null) {
      return {
        isDragging: false,
        isDragOver: false,
        isDragSelf: false,
      };
    }

    const isDragging = values.dndState.from.element?.id === element.id;
    const isDragOver = values.dndState.to.element?.id === element.id;
    const isDragSelf = isDragging && isDragOver;

    return {
      isDragging,
      isDragOver,
      isDragSelf,
    };
  }, [values.dndState.from, values.dndState.to]);

  const skipSettings = element.data?.skipSettings;

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    // [TODO] - here is bug when use turn into
    if (skipSettings) return;
    hoverIn(e, element);
  };

  const { isDragging, isDragOver, isDragSelf } = dragState;

  const styles = { opacity: isDragging ? 0.7 : 1 };

  DRAG_MAP.set(element.id, element);

  if (isInline) return render({ attributes, element, children, HTMLAttributes });

  return (
    <div
      data-element-id={element.id}
      data-element-type={element.type}
      onMouseEnter={onMouseEnter}
      onDrop={onDrop}
      className={cx(s.elementWrapper, { [s.isDragOver]: isDragOver, [s.isDragSelf]: isDragSelf })}
      style={styles}
      {...attributes}
    >
      {skipSettings ? null : <ElementActions editor={editor} element={element} handlers={handlers} values={values} />}
      {render({ attributes, element, children, HTMLAttributes })}
    </div>
  );
};

ElementWrapper.displayName = 'ElementWrapper';

export { ElementWrapper };
