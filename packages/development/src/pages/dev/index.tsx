import YooptaEditor, {
  createYooptaEditor,
  findPluginBlockBySelectionPath,
  YooEditor,
  YooptaBlockData,
} from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

type YjsEditor = YooEditor & {
  connect: () => void;
  disconnect: () => void;
  yRoot: Y.Map<YooptaBlockData>;
};

const CONNECTED: WeakSet<YjsEditor> = new WeakSet();

export const YjsEditor = {
  connect(editor: YjsEditor) {
    editor.connect();
  },
  disconnect(editor: YjsEditor) {
    editor.disconnect();
  },
};

export function withYjs(editor: YooEditor, root: Y.Map<YooptaBlockData>) {
  const e = editor as YjsEditor;

  const handleYjsEvents = (events: Y.YEvent<Y.Map<YooptaBlockData>>[], transaction: Y.Transaction) => {
    console.log('transaction.origin', transaction.origin);
    console.log('transaction.local', transaction.local);
    if (transaction.local) return;

    events.forEach((event) => {
      console.log('event.changes', event.changes);

      event.keys.forEach((change, key) => {
        console.log('change', change);

        if (change.action === 'add') {
          const block = e.yRoot.get(key) as YooptaBlockData;
          console.log('block', block);
          e.insertBlock(block);
        }

        if (change.action === 'delete') {
          const block = e.yRoot.get(key) as YooptaBlockData;
          console.log('DELETE ACTION block', key, block);

          // e.deleteBlock({ blockId: block.id });
        }
      });
    });
  };

  e.yRoot = root;

  e.connect = () => {
    const isConnected = CONNECTED.has(e);
    if (isConnected) {
      throw new Error('already connected');
    }

    e.yRoot.observeDeep(handleYjsEvents);
    console.log('e.yRoot', e.yRoot.toJSON());

    CONNECTED.add(e);
  };

  e.disconnect = () => {
    const isConnected = CONNECTED.has(e);
    if (!isConnected) return;

    e.yRoot.unobserveDeep(handleYjsEvents);
    CONNECTED.delete(e);
  };

  const { insertBlock, deleteBlock } = e;

  e.insertBlock = (block, options = {}) => {
    console.log('e.insertBlock options', options);

    const { at } = options;
    const insertedBlock = structuredClone(block);
    insertedBlock.meta.order = at?.[0] || 0;

    const blocks = e.yRoot;
    blocks.set(insertedBlock.id, insertedBlock);
    insertBlock(insertedBlock, options);
  };

  e.deleteBlock = (options) => {
    const block = findPluginBlockBySelectionPath(e, options);
    const blocks = e.yRoot;

    console.log('e.deleteBlock ID', block?.id!);
    console.log('e.deleteBlock options', options);
    console.log('blocks ', blocks.toJSON());

    const first = Array.from(blocks.entries())[0];
    console.log('first', first);

    blocks.delete(first[0]);

    deleteBlock(options);
  };

  return e;
}

const BasicExample = () => {
  const [connected, setConnected] = useState(false);

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: 'ws://127.0.0.1:1234',
        name: 'yoopta-editor-server',
        onConnect: () => setConnected(true),
        onDisconnect: () => setConnected(false),
        connect: false,
      }),
    [],
  );

  const editor = useMemo(() => {
    const yBlocks = provider.document.getMap<YooptaBlockData>('blocks');
    return withYjs(createYooptaEditor(), yBlocks);
  }, []);

  useEffect(() => {
    provider.connect();
    return () => provider.disconnect();
  }, [provider]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  const selectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={YOOPTA_PLUGINS}
        selectionBoxRoot={selectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        style={{ width: 750 }}
      />
    </div>
  );
};

export default BasicExample;
