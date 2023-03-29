import type { ReactElement } from 'react';
import type { RenderElementProps } from 'slate-react';
import type { ElementType } from '../../utils/plugins';

type Props = RenderElementProps & {
  type: ElementType['type'];
  render: (props: RenderElementProps) => ReactElement;
};

const ElementWrapper = ({ children, element, attributes, type, render }: Props) => {
  const isInline = type === 'inline';

  if (isInline) return render({ attributes, element, children });

  return (
    <div data-node-id={element.id} data-node-type={element.type} {...attributes}>
      {render({ attributes, element, children })}
    </div>
  );
};

export { ElementWrapper };
