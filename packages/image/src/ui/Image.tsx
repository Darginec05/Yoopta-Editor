import { RenderElementProps } from 'slate-react';

const ImageRender = (props: RenderElementProps) => {
  const { src, alt, srcSet, fit, sizes } = props.element.props;

  console.log({ src, alt, srcSet, fit, sizes });

  return (
    <div contentEditable={false} draggable={false}>
      <img
        data-element-type="Image"
        {...props.attributes}
        src={src}
        width={sizes.width}
        height={sizes.width}
        className="mt-4 border-l-2 pl-6 leading-7"
      />
      {props.children}
    </div>
  );
};

export { ImageRender };
