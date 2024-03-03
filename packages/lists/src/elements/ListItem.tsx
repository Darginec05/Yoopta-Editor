import { PluginElementRenderProps } from '@yoopta/editor';

const ListItemRender = (props: PluginElementRenderProps) => {
  return (
    <li data-element-type="ListItem" {...props.attributes} className="">
      {props.children}
    </li>
  );
};
export { ListItemRender };
