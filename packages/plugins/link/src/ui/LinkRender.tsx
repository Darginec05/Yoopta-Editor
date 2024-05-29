import { PluginElementRenderProps, useYooptaReadOnly, useYooptaTools, UI } from '@yoopta/editor';
import { useState } from 'react';
import { LinkElementProps } from '../types';
import { LinkHoverPreview } from './LinkHoverPreview';
import { useFloating, offset, flip, shift, inline, autoUpdate, useTransitionStyles } from '@floating-ui/react';
import { SquareArrowOutUpRight } from 'lucide-react';

const VALID_TARGET_VALUES = ['_blank', '_self', '_parent', '_top', 'framename'];

const LinkRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const [hovered, setHovered] = useState(false);

  const { className = '', ...htmlAttrs } = props.HTMLAttributes || {};

  const {
    refs: linkPreviewRefs,
    floatingStyles: linkPreviewFloatingStyles,
    context,
  } = useFloating({
    placement: 'bottom',
    open: hovered,
    onOpenChange: setHovered,
    middleware: [inline(), flip(), shift(), offset(0)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted: isActionMenuMounted, styles: linkPreviewTransitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 100,
      close: 100,
    },
  });

  const linkPreviewStyles = { ...linkPreviewFloatingStyles, ...linkPreviewTransitionStyles };

  const { url, target = '', rel } = props.element.props || {};
  const isReadOnly = useYooptaReadOnly();

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

  if (extendRender) {
    return extendRender(props);
  }
  const onMouseOver = () => {
    console.log('onMouseOver', onMouseOver);
    setHovered(true);
  };
  const onMouseOut = () => {
    console.log('onMouseOut', onMouseOut);
    setHovered(false);
  };

  const onRef = (ref) => {
    props.attributes.ref = ref;
    linkPreviewRefs.setReference(ref);
  };

  const onClick = (e) => {
    // if (isReadOnly) return;
    // e.preventDefault();
  };

  return (
    <a
      draggable={false}
      href={url || ''}
      onClick={onClick}
      className={`yoopta-link ${className}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      {...linkProps}
      {...htmlAttrs}
      {...props.attributes}
      ref={onRef}
    >
      {props.children}

      {isActionMenuMounted && !isReadOnly && (
        <LinkHoverPreview style={linkPreviewStyles} setFloating={linkPreviewRefs.setFloating} element={props.element} />
      )}
    </a>
  );
};

export { LinkRender };
