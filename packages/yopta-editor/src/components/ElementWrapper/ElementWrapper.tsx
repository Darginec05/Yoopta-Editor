import type { ReactElement } from 'react';
import type { RenderElementProps } from 'slate-react';
import { YoptaElementConfig } from '../../types';

type Props = RenderElementProps & {
  nodeType: YoptaElementConfig['nodeType'];
  render: (props: RenderElementProps) => ReactElement;
};

const ElementWrapper = ({ children, element, attributes, nodeType, render }: Props) => {
  const isInline = nodeType === 'inline';

  if (isInline) return render({ attributes, element, children });

  return (
    <div data-element-id={element.id} data-element-type={element.type} {...attributes}>
      {render({ attributes, element, children })}
    </div>
  );
};

export { ElementWrapper };
