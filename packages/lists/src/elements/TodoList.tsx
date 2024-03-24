import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { TodoListElementProps } from '../types';

const TodoListRender = ({ attributes, element, children, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const { checked = false } = (element.props || {}) as TodoListElementProps;

  const style = {
    textDecoration: checked ? 'line-through' : 'none',
  };

  return (
    <div
      data-element-type={element.type}
      className="flex items-center pl-4 space-x-2 py-[3px] text-[16px] relative"
      data-checked={checked}
      {...attributes}
    >
      <span
        onClick={() => editor.blocks.TodoList.updateElement(blockId, 'todo-list', { checked: !checked })}
        contentEditable={false}
        className="select-none cursor-pointer absolute left-0 top-[3px]"
      >
        <input type="checkbox" className="form-checkbox min-w-[10px] w-auto" checked={checked} />
      </span>
      <div className="flex-grow" style={style}>
        {children}
      </div>
    </div>
  );
};

export { TodoListRender };
