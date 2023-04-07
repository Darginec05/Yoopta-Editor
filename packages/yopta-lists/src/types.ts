import { Modify, YoptaBaseElement } from '@yopta/editor';

export type ListOptions = { depth: number };
export type TodoListItemOptions = { checked: boolean };

export type ListChildItemElement = YoptaBaseElement<'list-item'>;
export type TodoListChildItemElement = Modify<YoptaBaseElement<'todo-list-item'>, { data: TodoListItemOptions }>;

export type TodoList = Modify<
  YoptaBaseElement<'todo-list'>,
  { children: TodoListChildItemElement[]; data: ListOptions }
>;
export type BulletedList = Modify<
  YoptaBaseElement<'bulleted-list'>,
  { children: ListChildItemElement[]; data: ListOptions }
>;
export type NumberedList = Modify<
  YoptaBaseElement<'numbered-list'>,
  { children: ListChildItemElement[]; data: ListOptions }
>;
