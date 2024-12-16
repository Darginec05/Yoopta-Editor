import * as Y from 'yjs';
import { Blocks, YooEditor, YooptaBlockData, YooptaOperation } from '@yoopta/editor';
import { withSlateYjs, YjsSlateEditor } from './slate-yjs/withSlateYjs';
import debounce from 'lodash/debounce';
import BlockOrderResolver from './conflict-resolver';

const LOCAL_ORIGIN = Symbol('yoopta-local-change');
const CONNECTED: WeakSet<YjsYooEditor> = new WeakSet();

const orderResolver = new BlockOrderResolver();

export type EditorState = {
  operations: YooptaOperation[];
  timestamp: number;
};

export type YjsYooEditor = YooEditor & {
  sharedState: Y.Map<EditorState>;
  localOrigin: symbol;
  isLocalOrigin: (origin: symbol) => boolean;
  applyRemoteEvents: (events: any[], origin: symbol) => void;
  connect: () => void;
  disconnect: () => void;
};

const isValidState = (state: unknown): state is EditorState => {
  return (
    !!state &&
    typeof state === 'object' &&
    'operations' in state &&
    Array.isArray((state as EditorState).operations) &&
    'timestamp' in state &&
    typeof (state as EditorState).timestamp === 'number'
  );
};

export const withCollaboration = (editor: YjsYooEditor, sharedState: Y.Map<EditorState>) => {
  const { applyTransforms } = editor;

  editor.sharedState = sharedState;
  editor.localOrigin = LOCAL_ORIGIN;
  editor.isLocalOrigin = (origin) => origin === editor.localOrigin;

  function handleYEvents(event: Y.YMapEvent<EditorState>, transaction: Y.Transaction) {
    console.log('handleYEvents transaction.origin', transaction.origin);
    if (editor.isLocalOrigin(transaction.origin)) return;

    const state = sharedState.get('state');
    if (!state) return;

    const remoteOperations = state.operations;
    const resolvedOperations = orderResolver.resolveConflicts(state, editor.children);
    console.log('handleYEvents remoteOperations', remoteOperations);
    console.log('handleYEvents state.timestamp', state.timestamp);
    console.log('handleYEvents editor.children', editor.children);

    if (remoteOperations.length > 0) {
      editor.withoutSavingHistory(() => {
        applyTransforms(remoteOperations, { validatePaths: true });
      });
    }
  }

  editor.connect = () => {
    if (CONNECTED.has(editor)) {
      console.warn('Editor already connected');
      return;
    }

    editor.sharedState.observe(handleYEvents);
    CONNECTED.add(editor);

    const state = editor.sharedState.get('state');
    if (state && Array.isArray(state.operations)) {
      const ops = state.operations.filter(
        (op) => !!op?.type && op.type !== 'set_path' && op.type !== 'set_block_value',
      );
      if (ops.length > 0) {
        editor.withoutSavingHistory(() => {
          console.log('editor.connect ops', ops);
          applyTransforms(ops, { validatePaths: true });
        });
      }
    }
  };

  editor.disconnect = () => {
    editor.sharedState.unobserve(handleYEvents);
    CONNECTED.delete(editor);
  };

  editor.applyTransforms = (operations: YooptaOperation[], options?: any) => {
    applyTransforms(operations, { ...options, validatePaths: true });

    const ops = operations.filter((op) => !!op?.type && op.type !== 'set_path' && op.type !== 'set_block_value');
    if (ops.length > 0) {
      // debounce(() => {
      editor.sharedState.doc?.transact(() => {
        console.log('editor.applyTransforms ops', ops);

        editor.sharedState.set('state', {
          operations: ops,
          timestamp: Date.now(),
        });
      }, editor.localOrigin);
      // }, 100);
    }
  };

  return editor;
};
