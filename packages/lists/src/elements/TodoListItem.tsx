import { PluginElementRenderProps } from '@yoopta/editor';

const TodoListItemRender = (props: PluginElementRenderProps) => {
  const { checked } = props.element.props;

  const styles = {
    textDecoration: checked ? 'line-through' : 'none',
  };

  return (
    <div className="flex items-center space-x-2 py-1" data-element-type="TodoListItem" {...props.attributes}>
      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" value={checked} />
      <div className="flex-grow">{props.children}</div>
    </div>
  );
};

export { TodoListItemRender };
