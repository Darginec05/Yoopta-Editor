import { PluginElementRenderProps, useYooptaReadOnly } from '@yoopta/editor';
import { LinkRender } from '../render/LinkRender';

const LinkEditor = (props: PluginElementRenderProps) => {
  const isReadOnly = useYooptaReadOnly();

  const onClick = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
  };

  const attrs = { ...props.attributes, onClick };

  return <LinkRender {...props} attributes={attrs} />;
};

export { LinkEditor };
