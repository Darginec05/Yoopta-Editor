import { Elements, PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { TodoListElementProps } from '../types';

const TodoListRender = ({ attributes, element, children, blockId, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const block = useBlockData(blockId);
  const { className = '', ...htmlAttrs } = HTMLAttributes;
  const { checked = false } = (element.props || {}) as TodoListElementProps;

  const style = {
    textDecoration: checked ? 'line-through' : 'none',
  };

  const currentAlign = block?.meta?.align || 'left';
  const alignClass = `yoopta-align-${currentAlign}`;

  return (
    <div
      className={`yoopta-todo-list ${alignClass} ${className}`}
      data-checked={checked}
      {...htmlAttrs}
      {...attributes}
    >
      <span
        onClick={() => Elements.updateElement(editor, blockId, { type: 'todo-list', props: { checked: !checked } })}
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
