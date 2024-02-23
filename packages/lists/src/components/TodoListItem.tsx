import { RenderElementProps } from 'slate-react';

const TodoListItemRender = (props: RenderElementProps) => {
  return (
    <div className="flex items-center space-x-2 py-1" data-element-type="TodoListItem" {...props.attributes}>
      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
      <div className="flex-grow">{props.children}</div>
    </div>
  );
};

export { TodoListItemRender };
