import { ElementRendererProps, useYooptaEditor } from '@yoopta/editor';
import { TodoListElementProps } from '../types';

const TodoListRender = ({ attributes, element, children, blockId }: ElementRendererProps) => {
  const editor = useYooptaEditor();
  const { className = '', ...attrs } = attributes;
  const { checked = false } = (element.props || {}) as TodoListElementProps;

  const style = {
    textDecoration: checked ? 'line-through' : 'none',
  };

  return (
    <div
      data-element-type={element.type}
      className={`yoo-lists-ml-[10px] yoo-lists-flex yoo-lists-items-center yoo-lists-pl-4 yoo-lists-space-x-1 yoo-lists-py-[2px] yoo-lists-text-[16px] yoo-lists-leading-[28px] yoo-lists-relative yoopta-todo-list ${className}`}
      data-checked={checked}
      {...attrs}
    >
      <span
        onClick={() => editor.blocks.TodoList.updateElement(blockId, 'todo-list', { checked: !checked })}
        contentEditable={false}
        className="yoo-lists-select-none yoo-lists-cursor-pointer yoo-lists-absolute yoo-lists-left-0 yoo-lists-top-[4px]"
      >
        <input
          type="checkbox"
          className="yoo-lists-form-checkbox yoo-lists-min-w-[10px] yoo-lists-w-auto"
          checked={checked}
          disabled={editor.readOnly}
        />
      </span>
      <div className="yoo-lists-flex-grow" style={style}>
        {children}
      </div>
    </div>
  );
};

export { TodoListRender };
