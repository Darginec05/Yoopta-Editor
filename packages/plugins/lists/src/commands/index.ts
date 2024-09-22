import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { BulletedListElement, TodoListElement, NumberedListElement, TodoListElementProps } from '../types';

export type ListElementOptions = { text?: string };
export type ListInsertOptions = ListElementOptions & { at: YooptaBlockPath; focus?: boolean };

export type TodoListElementOptions = ListElementOptions & { props?: TodoListElementProps };
export type TodoListInsertOptions = TodoListElementOptions & { at: YooptaBlockPath; focus?: boolean };

// BulletedList
export type BulletedListCommands = {
  buildBulletedListElements: (editor: YooEditor, options?: Partial<ListElementOptions>) => BulletedListElement;
  insertBulletedList: (editor: YooEditor, options?: Partial<ListInsertOptions>) => void;
  deleteBulletedList: (editor: YooEditor, blockId: string) => void;
};

export const BulletedListCommands: BulletedListCommands = {
  buildBulletedListElements: (editor, options) => {
    return { id: generateId(), type: 'bulleted-list', children: [{ text: options?.text || '' }] };
  },
  insertBulletedList: (editor, options = {}) => {
    const { at, focus, text } = options;
    const bulletList = BulletedListCommands.buildBulletedListElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [bulletList], type: 'BulletedList' }), { at, focus });
  },
  deleteBulletedList: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};

// NumberedList
export type NumberedListCommands = {
  buildNumberedListElements: (editor: YooEditor, options?: Partial<ListElementOptions>) => NumberedListElement;
  insertNumberedList: (editor: YooEditor, options?: Partial<ListInsertOptions>) => void;
  deleteNumberedList: (editor: YooEditor, blockId: string) => void;
};

export const NumberedListCommands: NumberedListCommands = {
  buildNumberedListElements: (editor, options) => {
    return { id: generateId(), type: 'numbered-list', children: [{ text: options?.text || '' }] };
  },
  insertNumberedList: (editor, options = {}) => {
    const { at, focus, text } = options;
    const numberdedList = NumberedListCommands.buildNumberedListElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [numberdedList], type: 'NumberedList' }), { at, focus });
  },
  deleteNumberedList: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};

// TodoList
export type TodoListCommands = {
  buildTodoListElements: (editor: YooEditor, options?: Partial<TodoListElementOptions>) => TodoListElement;
  insertTodoList: (editor: YooEditor, options?: Partial<TodoListInsertOptions>) => void;
  deleteTodoList: (editor: YooEditor, blockId: string) => void;
  updateTodoList: (editor: YooEditor, blockId: string, props: Partial<TodoListElementProps>) => void;
};

export const TodoListCommands: TodoListCommands = {
  buildTodoListElements: (editor, options) => {
    return { id: generateId(), type: 'todo-list', children: [{ text: options?.text || '' }] };
  },
  insertTodoList: (editor, options = {}) => {
    const { at, focus, text, props } = options;
    const todoList = TodoListCommands.buildTodoListElements(editor, { text, props });
    Blocks.insertBlock(editor, buildBlockData({ value: [todoList], type: 'TodoList' }), { at, focus });
  },
  deleteTodoList: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateTodoList: (editor, blockId, props) => {
    if (typeof props?.checked === 'boolean') {
      Elements.updateElement(editor, blockId, { type: 'todo-list', props: { checked: props?.checked } });
    }
  },
};
