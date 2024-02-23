import { RenderElementProps } from 'slate-react';

const TodoListRender = (props: RenderElementProps) => {
  return (
    <ul className="my-4 ml-4 [&>li]:mt-2" data-element-type="TodoList" {...props.attributes}>
      {props.children}
    </ul>
  );
};

export { TodoListRender };
