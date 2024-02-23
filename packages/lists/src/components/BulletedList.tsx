import { RenderElementProps } from 'slate-react';

const BulletedListRender = (props: RenderElementProps) => {
  return (
    <ul data-element-type="BulletedList" {...props.attributes}>
      {props.children}
    </ul>
  );
};

export { BulletedListRender };
