import { Editor, Operation } from 'slate';
import { SlateEditor } from '../editor/types';

export const SAVING = new WeakMap<Editor, boolean | undefined>();
export const MERGING = new WeakMap<Editor, boolean | undefined>();

interface Batch {
  operations: Operation[];
  selectionBefore: Range | null;
}

/**
 * `History` objects hold all of the operations that are applied to a value, so
 * they can be undone or redone as necessary.
 */

export interface History {
  redos: Batch[];
  undos: Batch[];
}

// eslint-disable-next-line no-redeclare
export const History = {
  /**
   * Check if a value is a `History` object.
   */

  isHistory(value: any): value is History {
    return (
      Array.isArray(value.redos) &&
      Array.isArray(value.undos) &&
      (value.redos.length === 0 || Operation.isOperationList(value.redos[0].operations)) &&
      (value.undos.length === 0 || Operation.isOperationList(value.undos[0].operations))
    );
  },
};

export type HistoryEditor = SlateEditor & {
  history: History;
  undo: () => void;
  redo: () => void;
  writeHistory: (stack: 'undos' | 'redos', batch: any) => void;
};

// eslint-disable-next-line no-redeclare
export const HistoryEditor = {
  /**
   * Check if a value is a `HistoryEditor` object.
   */

  isHistoryEditor(value: any): value is HistoryEditor {
    return History.isHistory(value.history) && Editor.isEditor(value);
  },

  /**
   * Get the merge flag's current value.
   */

  isMerging(slate: HistoryEditor): boolean | undefined {
    return MERGING.get(slate);
  },

  /**
   * Get the saving flag's current value.
   */

  isSaving(slate: HistoryEditor): boolean | undefined {
    return SAVING.get(slate);
  },

  /**
   * Redo to the previous saved state.
   */

  redo(slate: HistoryEditor): void {
    slate.redo();
  },

  /**
   * Undo to the previous saved state.
   */

  undo(slate: HistoryEditor): void {
    slate.undo();
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, These operations will
   * be merged into the previous history.
   */
  withMerging(slate: HistoryEditor, fn: () => void): void {
    const prev = HistoryEditor.isMerging(slate);
    MERGING.set(slate, true);
    fn();
    MERGING.set(slate, prev);
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, without merging any of
   * the new operations into previous save point in the history.
   */

  withoutMerging(slate: HistoryEditor, fn: () => void): void {
    const prev = HistoryEditor.isMerging(slate);
    MERGING.set(slate, false);
    fn();
    MERGING.set(slate, prev);
  },

  /**
   * Apply a series of changes inside a synchronous `fn`, without saving any of
   * their operations into the history.
   */

  withoutSaving(slate: HistoryEditor, fn: () => void): void {
    const prev = HistoryEditor.isSaving(slate);
    console.log('withoutSaving prev ', prev);
    SAVING.set(slate, false);
    fn();
    SAVING.set(slate, prev);
  },
};
