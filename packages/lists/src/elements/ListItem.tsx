import { RenderElementProps } from 'slate-react';

const ListItemRender = (props: RenderElementProps) => {
  return (
    <li data-element-type="ListItem" {...props.attributes} className="">
      {props.children}
    </li>
  );
};
export { ListItemRender };
