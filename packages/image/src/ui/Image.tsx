import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import { ImageComponent } from './ImageComponent';

const ImageRender = ({ element, attributes, children }: RenderElementProps) => {
  const { src, alt, srcSet, fit, sizes } = element.props;
  const selected = useSelected();
  const focused = useFocused();

  const style = {
    boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
  };

  return (
    <div contentEditable={false} draggable={false} className="mt-4" {...attributes} style={style}>
      <ImageComponent src={src} alt={alt} srcSet={srcSet} fit={fit} width={sizes.width} height={sizes.height} />
      {children}
    </div>
  );
};

export { ImageRender };
