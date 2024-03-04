import { SlateElement } from '@yoopta/editor';

export type BulletedListPluginKeys = 'bulleted-list' | 'list-item';
export type NumberedListPluginKeys = 'numbered-list' | 'list-item';
export type TodoListPluginKeys = 'todo-list' | 'todo-list-item';

export type NumberedListElement = SlateElement<'numbered-list'>;
export type BulletedListElement = SlateElement<'bulleted-list'>;
export type TodoListElement = SlateElement<'todo-list'>;

export type ListItemElement = SlateElement<'list-item'>;

type TodoListElementProps = {
  checked: boolean;
};

export type TodoListItemElement = SlateElement<'todo-list-item', TodoListElementProps>;
