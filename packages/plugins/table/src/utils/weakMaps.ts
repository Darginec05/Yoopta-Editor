import { SlateEditor, SlateElement } from '@yoopta/editor';
import { NodeEntry } from 'slate';
import { TableCellElement, TableRowElement } from '../types';

export type NodeEntryWithContext = NodeEntry<TableCellElement>;

export const EDITOR_TO_SELECTION = new WeakMap<SlateEditor, NodeEntryWithContext[]>();
export const EDITOR_TO_SELECTION_SET = new WeakMap<SlateEditor, WeakSet<TableCellElement>>();
export const TABLE_ROW_TO_SELECTED_WEAK_MAP = new WeakMap<SlateEditor, WeakSet<TableRowElement>>();
