import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';
import { withHistory } from './withHistory';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => withHistory(createYooptaEditor()), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '6245440a-5916-4885-b947-512840225ac8': {
      id: '6245440a-5916-4885-b947-512840225ac8',
      type: 'HeadingOne',
      meta: {
        align: 'left',
        depth: 0,
        order: 0,
      },
      value: [
        {
          id: '73c0fc83-d576-4b8c-a3cb-c43985d0d9a9',
          type: 'heading-one',
          props: {
            nodeType: 'block',
          },
          children: [
            {
              text: 'Heading title',
            },
          ],
        },
      ],
    },
    'e2c48582-67c6-4ecf-9bdb-7e2abf99f7c7': {
      id: 'e2c48582-67c6-4ecf-9bdb-7e2abf99f7c7',
      type: 'Blockquote',
      meta: {
        align: 'left',
        depth: 0,
        order: 1,
      },
      value: [
        {
          id: 'f1e0b88a-70f0-4841-87f0-aba0c1634cde',
          type: 'blockquote',
          children: [
            {
              text: 'Blockquote description',
            },
          ],
        },
      ],
    },
  });

  const onChange = (value: YooptaContentValue) => {
    console.log(value);
    setValue(value);
  };

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
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default BasicExample;
