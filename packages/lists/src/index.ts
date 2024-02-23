import { LISTS } from './plugin';
import {
  NumberedListElement,
  BulletedListElement,
  TodoListElement,
  ListItemElement,
  TodoListItemElement,
} from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: NumberedListElement | BulletedListElement | TodoListElement | ListItemElement | TodoListItemElement;
  }
}

export default LISTS;

const NumberedList = LISTS.NumberedList;
const BulletedList = LISTS.BulletedList;
const TodoList = LISTS.TodoList;

export {
  NumberedListElement,
  BulletedListElement,
  TodoListElement,
  ListItemElement,
  TodoListItemElement,
  // plugins
  NumberedList,
  BulletedList,
  TodoList,
};
