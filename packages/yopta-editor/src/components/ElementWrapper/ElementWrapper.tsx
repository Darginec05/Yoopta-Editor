import { ReactElement } from 'react';
import { RenderElementProps } from 'slate-react';

type Props = RenderElementProps & {
  isInline?: boolean;
  component: any;
  render: (props: RenderElementProps) => ReactElement;
};

const ElementWrapper = ({ children, element, attributes, component, render }: Props) => {
  const isInline = component.element.type === 'inline';

  if (isInline) return render({ attributes, element, children });

  return (
    <div data-node-id={element.id} data-node-type={element.type} {...attributes}>
      {render({ attributes, element, children })}
    </div>
  );
};

export { ElementWrapper };
