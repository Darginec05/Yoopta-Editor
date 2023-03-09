import { YoptaComponent } from '@yopta/editor';
import s from './TodoList.module.scss';
import { TodoListItem } from './TodoListItem';

const TodoListRender = ({ attributes, children, element }) => {
  return (
    <div draggable={false} {...attributes} className={s.todoList}>
      {children}
    </div>
  );
};

const TODO_LIST_NODE_TYPE = 'todo-list';

const TodoList = new YoptaComponent({
  type: TODO_LIST_NODE_TYPE,
  renderer: (editor) => TodoListRender,
  children: TodoListItem,
});

export { TodoList };
