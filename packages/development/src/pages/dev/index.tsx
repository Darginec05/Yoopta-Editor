import YooptaEditor, {
  createYooptaEditor,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
  YooptaOnChangeOptions,
  YooptaOperation,
} from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { EditorState, withCollaboration, YjsYooEditor } from '@/collaborative/withCollaboration';
import {
  CursorState,
  EditorWithAwareness,
  RemoteCursorChangeEventListener,
  withYjsCursors,
} from '@/collaborative/withYjsCursors';
import { Awareness } from 'y-protocols/awareness';
import { RemoteOverlayCursor } from '@/collaborative/RemoteCursorOverlay';
import { withYjsHistory } from '@/collaborative/withYjsHistory';
import Head from 'next/head';

const EDITOR_STYLE = {
  width: 750,
};

const {
  person: { firstName, lastName },
  color: { rgb },
} = faker;

const BasicExample = () => {
  const [connected, setConnected] = useState(false);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>();
  const [username] = useState(`${firstName()} ${lastName()}`);

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        name: 'yoopta-collab',
        url: 'ws://localhost:1234',
        onConnect: () => setConnected(true),
        onDisconnect: () => setConnected(false),
        connect: false,
      }),
    [],
  );

  const editor = useMemo(() => {
    const sharedContent = provider.document.getMap('content') as Y.Map<EditorState>;

    return withYjsHistory(
      withYjsCursors(
        withCollaboration(createYooptaEditor() as YjsYooEditor, sharedContent),
        provider.awareness as Awareness,
        {
          data: {
            name: username,
            color: rgb(),
          },
        },
      ),
      {
        captureTimeout: 500,
        onStackItemAdded: () => console.log('Added to history'),
        onStackItemPopped: () => console.log('Restored from history'),
      },
    );
  }, [provider.document]);

  useEffect(() => {
    provider.connect();
    return () => provider.disconnect();
  }, [provider]);

  useEffect(() => {
    editor.connect();
    return () => editor.disconnect();
  }, [editor]);

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    console.log('onChange', value, options);
    setValue(value);
  };

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <Head>
          <title>Yoopta | {username}</title>
        </Head>
        {/* <FixedToolbar editor={editor} DEFAULT_DATA={{}} /> */}
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={false}
          readOnly={false}
          placeholder="Type / to open menu"
          tools={TOOLS}
          style={EDITOR_STYLE}
          value={value}
          onChange={onChange}
        />
        {connected && <RemoteOverlayCursor editor={editor} />}
      </div>
    </>
  );
};

export default BasicExample;
