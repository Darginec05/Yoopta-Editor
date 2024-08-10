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
    '02c793dd-fb54-46fd-875d-f9d32115b037': {
      id: '02c793dd-fb54-46fd-875d-f9d32115b037',
      value: [
        {
          id: '43183ec6-d3ec-464a-a6f1-ff9b9c9c1803',
          type: 'video',
          props: {
            src: 'https://res.cloudinary.com/ench-app/video/upload/v1723327986/30-03-19-02_mpe2w3.mp4',
            srcSet: null,
            bgColor: null,
            sizes: {
              width: 720,
              height: 1280,
            },
            nodeType: 'void',
            fit: 'fill',
            provider: {
              type: null,
              id: '',
            },
            settings: {
              controls: true,
              loop: true,
              muted: true,
              playsInline: true,
            },
          },
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      type: 'Video',
      meta: {
        order: 0,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
  }, []);

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
