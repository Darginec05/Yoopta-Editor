import YooptaEditor, {
  createYooptaEditor,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
  YooptaOnChangeOptions,
} from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { withCollaboration, YjsYooEditor } from '@/collaborative/withCollaboration';
import { CursorState, EditorWithAwareness, withYjsCursors } from '@/collaborative/withYjsCursors';
import { Awareness } from 'y-protocols/awareness';

const EDITOR_STYLE = {
  width: 750,
};

interface CursorMarkerProps {
  clientId: number;
  state: CursorState;
}

const CursorMarker = ({ state }: CursorMarkerProps) => {
  const blockElement = document.querySelector(`[data-yoopta-block-id="${state.selection?.blockId}"]`);

  if (!blockElement || !state.selection) {
    return null;
  }

  const { top, left } = blockElement.getBoundingClientRect();

  return (
    <div
      className="remote-cursor-container"
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        pointerEvents: 'none',
      }}
    >
      <div
        className="cursor"
        style={{
          width: 2,
          height: 20,
          backgroundColor: state.user.color,
          position: 'absolute',
        }}
      />
      <div
        className="label"
        style={{
          backgroundColor: state.user.color,
          color: 'white',
          padding: '2px 4px',
          borderRadius: 4,
          fontSize: 12,
          position: 'absolute',
          top: -20,
          whiteSpace: 'nowrap',
        }}
      >
        {state.user.name}
      </div>
    </div>
  );
};

interface RemoteCursorsProps {
  editor: EditorWithAwareness;
}

export const RemoteCursors = ({ editor }: RemoteCursorsProps) => {
  const [cursors, setCursors] = useState<Map<number, CursorState>>(new Map());

  useEffect(() => {
    const handleCursorsUpdate = (newCursors: Map<number, CursorState>) => {
      setCursors(new Map(newCursors));
    };

    editor.on('cursors-update', handleCursorsUpdate);
    return () => {
      editor.off('cursors-update', handleCursorsUpdate);
    };
  }, [editor]);

  return (
    <div className="remote-cursors">
      {Array.from(cursors.entries()).map(([clientId, state]) => (
        <CursorMarker key={clientId} clientId={clientId} state={state} />
      ))}
    </div>
  );
};

const {
  person: { firstName, lastName },
  color: { rgb },
} = faker;

const BasicExample = () => {
  const [connected, setConnected] = useState(false);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>();

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
    const sharedType = provider.document.get('content', Y.Map<YooptaBlockData>) as Y.Map<YooptaBlockData>;
    return withYjsCursors(
      withCollaboration(createYooptaEditor() as YjsYooEditor, sharedType),
      provider.awareness as Awareness,
      {
        data: {
          id: `user-${Math.random()}`,
          name: `${firstName()} ${lastName()}`,
          color: rgb(),
        },
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
        <FixedToolbar editor={editor} DEFAULT_DATA={{}} />
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={true}
          readOnly={false}
          placeholder="Type / to open menu"
          tools={TOOLS}
          style={EDITOR_STYLE}
          value={value}
          onChange={onChange}
        />
        {connected && <RemoteCursors editor={editor} />}
      </div>
    </>
  );
};

export default BasicExample;
