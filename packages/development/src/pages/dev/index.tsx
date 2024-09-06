import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '0c1e755c-7fc2-457e-9a84-96a447c265d5': {
      id: '0c1e755c-7fc2-457e-9a84-96a447c265d5',
      value: [
        {
          id: 'd3b769aa-4cde-496f-80c9-87020f89e687',
          type: 'heading-one',
          props: {
            nodeType: 'block',
          },
          children: [
            {
              text: 'Developing Table',
            },
          ],
        },
      ],
      type: 'HeadingOne',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    '252e6cc7-56e8-4484-9d1e-c57201198e99': {
      id: '252e6cc7-56e8-4484-9d1e-c57201198e99',
      value: [
        {
          id: '63903621-1cd1-4491-9c4c-5bbafdd86a59',
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 1,
        depth: 0,
      },
    },
    '2d15e2fd-9f9f-4ea9-a651-e0e754602201': {
      id: '2d15e2fd-9f9f-4ea9-a651-e0e754602201',
      value: [
        {
          id: '688fb854-6e98-49be-b66d-1553e904afa0',
          type: 'table',
          props: {
            nodeType: 'block',
          },
          children: [
            {
              id: '3bd04509-0d93-48c1-b8b3-91eba87c3e51',
              type: 'table-row',
              children: [
                {
                  id: '0ef1abd5-34d7-48fc-8523-19bbce2b7e16',
                  type: 'table-data-cell',
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                  children: [
                    {
                      text: 'Table cell 1',
                    },
                  ],
                },
                {
                  id: '9e17b9fc-fc57-4a32-8fab-249b7ade47a5',
                  type: 'table-data-cell',
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                  children: [
                    {
                      text: 'Table ',
                    },
                    {
                      text: 'cell 2',
                      bold: true,
                    },
                  ],
                },
              ],
            },
            {
              id: '6a26131f-8c83-418a-98af-7644ed11070e',
              type: 'table-row',
              children: [
                {
                  id: 'ed936b15-ed70-41c0-ac3c-5cfb59fe1ba8',
                  type: 'table-data-cell',
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '18fd1eaa-d9ae-46d3-a2cd-f5dc21d089a2',
                  type: 'table-data-cell',
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              id: 'f440cf2b-1e56-4650-88d1-e581e04bdc5f',
              type: 'table-row',
              children: [
                {
                  id: '759f8d69-bebc-4a77-bf17-23296de4f8c2',
                  type: 'table-data-cell',
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e079f7cc-ec78-4301-96a1-a2ebbd92a1bd',
                  type: 'table-data-cell',
                  props: {
                    width: 200,
                    asHeader: false,
                  },
                  children: [
                    {
                      text: 'Really last data cell',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      type: 'Table',
      meta: {
        order: 2,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => {
      setValue(data);
    });
  }, []);

  console.log(value);

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
        readOnly={readOnly}
        style={EDITOR_STYLE}
        value={value}
      />
    </div>
  );
};

export default BasicExample;
