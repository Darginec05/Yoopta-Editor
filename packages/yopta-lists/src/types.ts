type ListElement<K extends string, V extends any[], O = ListOptions> = {
  id: string;
  type: K;
  options: O;
  children: V;
};

type ListChildElement<K extends string> = {
  id: string;
  type: K;
  children: [{ text: '' }];
};

export type ListOptions = { depth: number };
export type TodoListItemOptions = { checked: boolean };

export type ListChildItemElement = ListChildElement<'list-item'>;
export type TodoListChildItemElement = ListChildElement<'todo-list-item'> & { options: TodoListItemOptions };

export type BulletedList = ListElement<'bulleted-list', ListChildItemElement[]>;
export type NumberedList = ListElement<'numbered-list', ListChildItemElement[]>;
export type TodoList = ListElement<'todo-list', TodoListChildItemElement[]>;
