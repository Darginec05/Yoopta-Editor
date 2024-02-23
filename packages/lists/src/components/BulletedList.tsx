import { RenderElementProps } from 'slate-react';

const BulletedListRender = (props: RenderElementProps) => {
  return (
    <ul data-element-type="BulletedList" {...props.attributes} className="my-4 ml-4 pl-4 list-disc [&>li]:mt-2">
      {props.children}
    </ul>
  );
};

export { BulletedListRender };
