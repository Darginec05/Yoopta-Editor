import { RenderElementProps } from 'slate-react';

const ImageRender = (props: RenderElementProps) => {
  return (
    <img data-element-type="Image" {...props.attributes} className="mt-4 border-l-2 pl-6 leading-7">
      {props.children}
    </img>
  );
};

export { ImageRender };
