import { RenderElementProps } from 'slate-react';

const TodoListRender = (props: RenderElementProps) => {
  return (
    <ul className="list-disc pl-6" data-element-type="TodoList" {...props.attributes}>
      {props.children}
    </ul>
  );
};

export { TodoListRender };
