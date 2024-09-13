import { SlateEditor, SlateElement } from '@yoopta/editor';
import { NodeEntry } from 'slate';
import { TableCellElement, TableRowElement } from '../types';

export type SlateNodeEntry = NodeEntry<TableCellElement>;

export const EDITOR_TO_SELECTION = new WeakMap<SlateEditor, SlateNodeEntry[]>();
export const TABLE_SLATE_TO_SELECTION_SET = new WeakMap<SlateEditor, WeakSet<TableCellElement>>();
