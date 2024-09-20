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

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    'e252f92a-8631-4dce-8e89-911946bf1ed0': {
      id: 'e252f92a-8631-4dce-8e89-911946bf1ed0',
      value: [
        {
          id: '91f580b7-72e3-46a9-9aff-32bc5589d9cf',
          type: 'heading-two',
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
      type: 'HeadingTwo',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    'f240e5a5-bd7f-42c3-9508-becbf7dd4df9': {
      id: 'f240e5a5-bd7f-42c3-9508-becbf7dd4df9',
      value: [
        {
          id: '5c53dd6d-3166-4b28-99ac-4784fedecf2e',
          type: 'paragraph',
          children: [
            {
              text: 'If you want to keep your solution lightweight and don’t want to use any libraries, you can also implement your own lazy loading of DOM elements by using an',
            },
            {
              text: ' ',
            },
            {
              id: 'b719bd05-14ae-4d3d-86ff-153bdb57e5b7',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
                target: '_blank',
                rel: 'noreferrer noopener',
                title: 'Intersection Observer API',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Intersection Observer API',
                },
              ],
            },
            {
              text: '. ',
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
    'cb5476cd-4253-4939-90a5-ef41d6b1caa9': {
      id: 'cb5476cd-4253-4939-90a5-ef41d6b1caa9',
      value: [
        {
          id: '7f1b41e8-43d1-4736-adea-8268406cd97a',
          type: 'table',
          props: {
            headerRow: true,
            headerColumn: false,
          },
          children: [
            {
              id: 'f7202cf4-2078-40b3-9062-3c28fa611948',
              type: 'table-row',
              children: [
                {
                  id: '146c8fe5-a8ae-4289-b8e4-da3589e4efbb',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'Really first cell',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                    asHeader: true,
                    width: 200,
                  },
                },
                {
                  id: '6d65ec0f-1973-48ae-9dc1-06ed14c87ad4',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    asHeader: true,
                    width: 323,
                  },
                },
                {
                  id: '40bac655-82c3-40ed-b4b8-a5a59b11591d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    asHeader: true,
                  },
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '4197971e-2c59-492a-a825-09888fd31597',
              type: 'table-row',
              children: [
                {
                  id: '01665f2a-28f0-4b4f-a53c-46db6d9944bf',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '288f5856-a7ed-4909-b59a-dc03ce7a0eeb',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 323,
                  },
                },
                {
                  id: 'f28f8e38-19e8-4f50-9006-c45e4ba1a52c',
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
            {
              id: 'bb8644a7-bc9b-4d0d-aa0e-0f8df1d0bf38',
              type: 'table-row',
              children: [
                {
                  id: '3d73e70e-f109-4606-afb4-df45973c0cff',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '87a746c6-78e9-437c-821b-61533e86523d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                  props: {
                    width: 323,
                  },
                },
                {
                  id: 'c417ce2a-fd6f-4f0d-a7ae-cb53573c765c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'Last data',
                    },
                    {
                      text: ' cell',
                      bold: true,
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
    '50ef3ff2-9c5f-4fe8-bc73-22e4710b567a': {
      id: '50ef3ff2-9c5f-4fe8-bc73-22e4710b567a',
      value: [
        {
          id: '4c0222d7-f8fe-4dd0-84e7-3260dc1bd191',
          type: 'divider',
          props: {
            nodeType: 'void',
            theme: 'gradient',
          },
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      type: 'Divider',
      meta: {
        order: 3,
        depth: 0,
      },
    },
    '316b68a9-df3b-4468-b977-a5b578880675': {
      id: '316b68a9-df3b-4468-b977-a5b578880675',
      value: [
        {
          id: '8481fc29-95de-422a-998e-4ee997ea1657',
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
        order: 4,
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
