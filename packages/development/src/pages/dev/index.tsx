import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

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
    '6516ae5e-46c5-4cf2-ac27-c135543ae745': {
      id: '6516ae5e-46c5-4cf2-ac27-c135543ae745',
      value: [
        {
          id: '347767ed-7c47-4a96-a59d-1fc292ff05e0',
          type: 'table',
          children: [
            {
              id: 'c2bbd42c-9ad0-49e1-a9e2-49e22d9f9caa',
              type: 'table-head',
              children: [
                {
                  id: 'c7e6d771-5019-4538-8825-d26e991f5dae',
                  type: 'table-row',
                  children: [
                    {
                      id: 'b6c55e6d-d29d-4bbc-a79d-4f5af0047177',
                      type: 'table-head-cell',
                      children: [
                        {
                          text: 'Table head 1',
                        },
                      ],
                    },
                    {
                      id: 'd2c8877a-0f28-439e-ba4d-e9bb0acca9ec',
                      type: 'table-head-cell',
                      children: [
                        {
                          text: 'Table head 2',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: '62e26267-912b-467e-881f-17bcb0c208db',
              type: 'tbody',
              children: [
                {
                  id: '6b4a16d4-b1ad-4833-8a0e-5e5912ae6148',
                  type: 'table-row',
                  children: [
                    {
                      id: 'a2cd8005-b434-45bd-b010-d9b8476d675f',
                      type: 'table-data-cell',
                      children: [
                        {
                          text: '',
                        },
                      ],
                    },
                    {
                      id: 'e3ca917f-f1ec-4458-acac-d2106372ac9f',
                      type: 'table-data-cell',
                      children: [
                        {
                          text: '',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '6b4a16d4-b1ad-4833-8a0e-5e5912ae6148',
                  type: 'table-row',
                  children: [
                    {
                      id: 'a2cd8005-b434-45bd-b010-d9b8476d675f',
                      type: 'table-data-cell',
                      children: [
                        {
                          text: '',
                        },
                      ],
                    },
                    {
                      id: 'e3ca917f-f1ec-4458-acac-d2106372ac9f',
                      type: 'table-data-cell',
                      children: [
                        {
                          text: '',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '332d7700-fa24-4c51-8027-faf18d2a8c4d',
                  type: 'table-row',
                  children: [
                    {
                      id: '9490c499-3a12-4e10-b857-4fe8b9ca0eda',
                      type: 'table-data-cell',
                      children: [
                        {
                          text: '',
                        },
                      ],
                    },
                    {
                      id: '2c0e0066-8d7d-45ef-a5e8-ab3f50597e70',
                      type: 'table-data-cell',
                      children: [
                        {
                          text: '',
                        },
                      ],
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
        style={{ width: 750 }}
        value={value}
      />
    </div>
  );
};

export default BasicExample;
