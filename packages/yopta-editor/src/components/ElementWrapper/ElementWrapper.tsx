import { ReactElement } from 'react';
import { RenderElementProps } from 'slate-react';
import { YoptaPluginType } from '../../utils/plugins';

type Props = RenderElementProps & {
  isInline?: boolean;
  plugin: YoptaPluginType;
  render: (props: RenderElementProps) => ReactElement;
};

const ElementWrapper = ({ children, element, attributes, plugin, render }: Props) => {
  const isInline = plugin.element?.type === 'inline';

  if (isInline) return render({ attributes, element, children });

  return (
    <div data-node-id={element.id} data-node-type={element.type} {...attributes}>
      {render({ attributes, element, children })}
    </div>
  );
};

export { ElementWrapper };
