import { Awareness } from 'y-protocols/awareness';
import { YjsYooEditor } from './withCollaboration';

export type CursorUser = {
  id: string;
  name: string;
  color: string;
};

export type CursorState = {
  user: CursorUser;
  selection?: {
    blockId: string;
    path: any;
    timestamp: number;
  };
};

export type CursorStateChangeEvent = {
  added: number[];
  updated: number[];
  removed: number[];
};

export type EditorWithAwareness = YjsYooEditor & {
  awareness: Awareness;
  cursorOptions: WithCursorsOptions;
  updateCursor: (selection?: { blockId: string; path: any }) => void;
  getCursors: () => Map<number, CursorState>;
};

export type WithCursorsOptions = {
  data?: Partial<CursorUser>;
  autoSend?: boolean;
  debounce?: number;
  filter?: (state: CursorState) => boolean;
};

export function withYjsCursors(
  editor: YjsYooEditor,
  awareness: Awareness,
  options: WithCursorsOptions = {},
): EditorWithAwareness {
  const e = editor as EditorWithAwareness;

  const defaultOptions: WithCursorsOptions = {
    autoSend: true,
    debounce: 50,
    data: {},
    filter: (state) => {
      const isRecent = state.selection ? Date.now() - state.selection.timestamp < 5 * 60 * 1000 : false;
      return isRecent;
    },
  };

  e.awareness = awareness;
  e.cursorOptions = { ...defaultOptions, ...options };

  e.updateCursor = (selection) => {
    e.awareness.setLocalState({
      user: e.cursorOptions.data,
      selection: selection
        ? {
            ...selection,
            timestamp: Date.now(),
          }
        : undefined,
    });
  };

  e.getCursors = () => {
    const states = e.awareness.getStates();
    const filteredStates = new Map();

    states.forEach((state: CursorState, clientId: number) => {
      if (clientId === e.awareness.clientID) return;

      if (e.cursorOptions.filter?.(state)) {
        filteredStates.set(clientId, state);
      }
    });

    return filteredStates;
  };

  const handleAwarenessChange = (yEvent: CursorStateChangeEvent) => {
    console.log('handleAwarenessChange yEvent', yEvent);

    const localId = e.awareness.clientID;
    const event = {
      added: yEvent.added.filter((id) => id !== localId),
      removed: yEvent.removed.filter((id) => id !== localId),
      updated: yEvent.updated.filter((id) => id !== localId),
    };

    const cursors = e.getCursors();
    console.log('handleAwarenessChange cursors', cursors);
    e.emit('cursors-update', cursors);
  };

  if (e.cursorOptions.autoSend) {
    let debounceTimeout: NodeJS.Timeout;

    const updateSelectionState = (path: any) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const blockId =
          path?.current !== null
            ? Object.keys(e.children).find((id) => e.children[id].meta.order === path.current)
            : undefined;

        e.updateCursor(blockId ? { blockId, path } : undefined);
      }, e.cursorOptions.debounce);
    };

    e.on('path-change', updateSelectionState);
  }

  const { disconnect, connect } = e;

  e.connect = () => {
    connect?.();
    e.awareness.on('change', handleAwarenessChange);
    handleAwarenessChange({
      removed: [],
      added: Array.from(e.awareness.getStates().keys()),
      updated: [],
    });

    if (e.cursorOptions.autoSend) {
      e.updateCursor();
    }
  };

  e.disconnect = () => {
    e.awareness.off('change', handleAwarenessChange);
    e.awareness.setLocalState(null);
    disconnect?.();
  };

  return e;
}
