import { PluginElementRenderProps } from '@yoopta/editor';
import { TodoListElementProps } from '../types';

const TodoListRender = ({ attributes, element, children }: PluginElementRenderProps) => {
  const { checked = false } = (element.props || {}) as TodoListElementProps;

  return (
    <div
      data-element-type={element.type}
      className="flex items-center pl-4 space-x-2 py-[3px] text-[16px]"
      {...attributes}
    >
      <input type="checkbox" className="form-checkbox min-w-[10px] w-auto" checked={checked} />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export { TodoListRender };
