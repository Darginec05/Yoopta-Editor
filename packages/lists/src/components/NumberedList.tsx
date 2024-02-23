import { RenderElementProps } from 'slate-react';

const NumberedListRender = (props: RenderElementProps) => {
  return (
    <ol data-element-type="NumberedList" {...props.attributes}>
      {props.children}
    </ol>
  );
};

export { NumberedListRender };
