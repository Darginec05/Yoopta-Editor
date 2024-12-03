import * as Y from 'yjs';
import { YjsYooEditor } from './withCollaboration';

export type EditorWithYjsHistory = YjsYooEditor & {
  history: {
    clear: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
  };
  undoManager: Y.UndoManager;
};

export interface YjsHistoryOptions {
  captureTimeout?: number;
  trackedOrigins?: Set<any>;
  onStackItemAdded?: () => void;
  onStackItemPopped?: () => void;
}

export function withYjsHistory(editor: YjsYooEditor, options: YjsHistoryOptions = {}): EditorWithYjsHistory {
  const e = editor as EditorWithYjsHistory;

  const undoManager = new Y.UndoManager(e.sharedRoot, {
    trackedOrigins: options.trackedOrigins || new Set([e.localOrigin]),
    captureTimeout: options.captureTimeout || 500,
  });

  undoManager.on('stack-item-added', () => {
    options.onStackItemAdded?.();

    e.emit('history-change', {
      canUndo: undoManager.canUndo(),
      canRedo: undoManager.canRedo(),
    });
  });

  undoManager.on('stack-item-popped', () => {
    options.onStackItemPopped?.();

    e.emit('history-change', {
      canUndo: undoManager.canUndo(),
      canRedo: undoManager.canRedo(),
    });
  });

  e.undo = () => {
    if (undoManager.canUndo()) {
      undoManager.undo();
    }
  };

  e.redo = () => {
    if (undoManager.canRedo()) {
      undoManager.redo();
    }
  };

  e.undoManager = undoManager;
  e.history = {
    clear: () => {
      undoManager.clear();
    },

    canUndo: () => undoManager.canUndo(),
    canRedo: () => undoManager.canRedo(),
  };

  const { connect, disconnect } = e;

  e.connect = () => {
    connect?.();
    e.emit('history-change', {
      canUndo: undoManager.canUndo(),
      canRedo: undoManager.canRedo(),
    });
  };

  e.disconnect = () => {
    undoManager.clear();
    disconnect?.();
  };

  return e;
}
