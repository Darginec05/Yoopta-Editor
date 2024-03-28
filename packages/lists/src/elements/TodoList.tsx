import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { TodoListElementProps } from '../types';

const TodoListRender = ({ attributes, element, children, blockId, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const { className, ...htmlAttrs } = HTMLAttributes;
  const { checked = false } = (element.props || {}) as TodoListElementProps;

  const style = {
    textDecoration: checked ? 'line-through' : 'none',
  };

  return (
    <div
      data-element-type={element.type}
      className={`yoo-lists-flex yoo-lists-items-center yoo-lists-pl-4 yoo-lists-space-x-2 yoo-lists-py-[1px] yoo-lists-text-[16px] yoo-lists-relative yoopta-todo-list ${className}`}
      data-checked={checked}
      {...htmlAttrs}
      {...attributes}
    >
      <span
        onClick={() => editor.blocks.TodoList.updateElement(blockId, 'todo-list', { checked: !checked })}
        contentEditable={false}
        className="yoo-lists-select-none yoo-lists-cursor-pointer yoo-lists-absolute yoo-lists-left-0 yoo-lists-top-[3px]"
      >
        <input
          type="checkbox"
          className="yoo-lists-form-checkbox yoo-lists-min-w-[10px] yoo-lists-w-auto"
          checked={checked}
        />
      </span>
      <div className="yoo-lists-flex-grow" style={style}>
        {children}
      </div>
    </div>
  );
};

export { TodoListRender };
