import { NumberedList } from './ui/NumberedList';
import { BulletedList } from './ui/BulletedList';
import { TodoList } from './ui/TodoList';
import { YooEditor } from '@yoopta/editor';
import type {
  ListChildItemElement,
  TodoListChildItemElement,
  TodoListElement,
  BulletedListElement,
  NumberedListElement,
} from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element:
      | ListChildItemElement
      | TodoListChildItemElement
      | TodoListElement
      | BulletedListElement
      | NumberedListElement;
  }
}

const Lists = {
  NumberedList,
  BulletedList,
  TodoList,
};

export default Lists;
export { NumberedList, BulletedList, TodoList, TodoListElement , BulletedListElement, NumberedListElement};
