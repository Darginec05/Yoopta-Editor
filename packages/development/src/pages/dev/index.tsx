import YooptaEditor, {
  Blocks,
  createYooptaEditor,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
} from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { LinkCommands } from '@yoopta/link';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '208e71cc-aa15-4fe8-93e1-446fc9b1053f': {
      id: '208e71cc-aa15-4fe8-93e1-446fc9b1053f',
      value: [
        {
          id: 'c2971883-6dd0-4cb7-bb7e-f9a3d3454cbe',
          type: 'table',
          children: [
            {
              id: '705cf815-5d00-4013-b92b-8934fb93454f',
              type: 'table-row',
              children: [
                {
                  id: 'c9021d7e-4336-4c68-a876-d0b76b83aee2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'First column',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
                {
                  id: '76893065-3256-47a2-95c2-9731922b69c8',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
                {
                  id: 'e57acf66-0327-4247-b4ff-bfc38bb1ccad',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
              ],
            },
            {
              id: '31ee10c5-7d17-4113-ae28-e81bbdbe0d70',
              type: 'table-row',
              children: [
                {
                  id: '65d46e0d-35fd-4668-8784-83d7b6a8c0f3',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
                {
                  id: 'f75c1bd0-9302-4404-8f25-4854bdc554eb',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
                {
                  id: '2a90d671-024e-4b69-9b8c-647a4a52093e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
              ],
            },
            {
              id: 'f3916ae1-d479-48d8-bcb2-055d7c152093',
              type: 'table-row',
              children: [
                {
                  id: '616fe6fa-0d21-4ab2-82ee-c00d2a5cfb8d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
                {
                  id: 'bf01e43c-fa1e-44bc-b815-90b6a29a6624',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
                {
                  id: 'd6d969fb-6c43-4b9a-9770-7984d89a9824',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                },
              ],
            },
          ],
          props: {
            headerColumn: false,
            headerRow: false,
          },
        },
      ],
      type: 'Table',
      meta: {
        order: 0,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (value: YooptaChildrenValue) => {
      setValue(value);
    });
  }, [editor]);

  console.log(value);

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} />
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={true}
          placeholder="Type / to open menu"
          tools={TOOLS}
          readOnly={readOnly}
          style={EDITOR_STYLE}
          value={value}
        />
      </div>
    </>
  );
};

export default BasicExample;
