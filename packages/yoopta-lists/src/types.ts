import { Modify, YooptaBaseElement, YooptaPluginBaseOptions, YooptaRenderHTMLAttributes } from '@yoopta/editor';

export type ListOptions = { depth: number; skipDrag: boolean; skipSettings: boolean } & YooptaPluginBaseOptions &
  YooptaRenderHTMLAttributes;
export type TodoListItemOptions = { checked: boolean };

export type ListChildItemElement = YooptaBaseElement<'list-item'>;
export type TodoListChildItemElement = Modify<YooptaBaseElement<'todo-list-item'>, { data: TodoListItemOptions }>;

export type TodoListElement = Modify<
  YooptaBaseElement<'todo-list'>,
  { children: TodoListChildItemElement[]; data: ListOptions }
>;
export type BulletedListElement = Modify<
  YooptaBaseElement<'bulleted-list'>,
  { children: ListChildItemElement[]; data: ListOptions }
>;
export type NumberedListElement = Modify<
  YooptaBaseElement<'numbered-list'>,
  { children: ListChildItemElement[]; data: ListOptions }
>;
