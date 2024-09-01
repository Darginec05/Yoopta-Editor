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
          props: {
            headerRow: true,
            headerColumn: false,
            columns: [
              {
                index: 0,
                width: 150,
              },
              {
                index: 1,
                width: 180,
              },
              {
                index: 2,
                width: 220,
              },
              {
                index: 3,
                width: 300,
              },
            ],
          },
          children: [
            {
              id: '8ca2cfcb-22ae-4f5d-9b61-22051ad4e160',
              type: 'table-row',
              children: [
                {
                  id: 'a2cd8005-b434-45bd-b010-d9b8476d675f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'First row',
                    },
                  ],
                },
                {
                  id: 'e3ca917f-f1ec-4458-acac-d2106372ac9f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'Second column',
                    },
                  ],
                },
                {
                  id: 'bf3111bf-c6c1-4639-9d89-a5edefcd7de6',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0eb973a8-92e8-42da-94d6-2db321bb8af5',
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
                      text: 'Second row',
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
                {
                  id: '43d688ce-03b7-49ab-850a-9742cb7c0ff2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '591f81eb-ed11-4f8c-87b2-3acf81df6118',
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
                      text: 'Third ',
                    },
                    {
                      bold: true,
                      text: 'row',
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
                {
                  id: '1f7bc81f-1c4e-4a3c-9ab2-f74c4b8c3b2e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b813c809-9e85-4af2-b244-8692f1f8b36f',
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
              id: 'e027a48c-ec2f-43ef-9e75-99017c88489a',
              type: 'table-row',
              children: [
                {
                  id: '7807959f-54b1-45b8-9d1a-98c107a14f5f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '4f97c4f6-37fb-48c8-a35c-3d07472a7155',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f16f3621-a960-496d-ac86-e1e102ff61f1',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '4bbfb8ae-d0b1-462e-b176-79fcee897d7a',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
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
