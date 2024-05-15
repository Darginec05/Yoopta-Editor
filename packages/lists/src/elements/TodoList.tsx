import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { TodoListElementProps } from '../types';

const TodoListRender = ({ attributes, element, children, blockId, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const { className = '', ...htmlAttrs } = HTMLAttributes;
  const { checked = false } = (element.props || {}) as TodoListElementProps;

  const style = {
    textDecoration: checked ? 'line-through' : 'none',
  };

  return (
    <div
      data-element-type={element.type}
      className={`yoopta-todo-list ${className}`}
      data-checked={checked}
      {...htmlAttrs}
      {...attributes}
    >
      <span
        onClick={() => editor.blocks.TodoList.updateElement(blockId, 'todo-list', { checked: !checked })}
        contentEditable={false}
        className="yoopta-todo-list-checkbox"
      >
        <input
          type="checkbox"
          className="yoopta-todo-list-checkbox-input"
          checked={checked}
          disabled={editor.readOnly}
        />
      </span>
      <div className="yoopta-todo-list-content" style={style}>
        {children}
      </div>
    </div>
  );
};

export { TodoListRender };
