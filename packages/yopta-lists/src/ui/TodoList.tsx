import { createYoptaComponent } from '@yopta/editor';
import s from './TodoList.module.scss';

const TodoListRender = ({ attributes, children, element }) => {
  return (
    <div draggable={false} {...attributes} className={s.todoList}>
      {children}
    </div>
  );
};

const TODO_LIST_NODE_TYPE = 'todo-list';

const TodoList = createYoptaComponent({
  type: TODO_LIST_NODE_TYPE,
  renderer: (editor) => TodoListRender,
});

export { TodoList };
