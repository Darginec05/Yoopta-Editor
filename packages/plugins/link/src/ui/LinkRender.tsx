import { PluginElementRenderProps, useYooptaReadOnly } from '@yoopta/editor';
import { LinkElementProps } from '../types';

const VALID_TARGET_VALUES = ['_blank', '_self', '_parent', '_top', 'framename'];

const LinkRender = (props: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = props.HTMLAttributes || {};

  const { url, target = '', rel } = props.element.props || {};
  const isReadOnly = useYooptaReadOnly();

  const onClick = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
  };

  const linkProps: Partial<Pick<LinkElementProps, 'rel' | 'target'>> = {
    rel,
    target,
  };

  if (!VALID_TARGET_VALUES.includes(target)) {
    delete linkProps.target;
  }

  if (typeof rel !== 'string' || rel?.length === 0) {
    delete linkProps.rel;
  }

  return (
    <a
      data-element-type={props.element.type}
      draggable={false}
      href={url || ''}
      onClick={onClick}
      className={`yoopta-link ${className}`}
      {...linkProps}
      {...htmlAttrs}
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

export { LinkRender };
