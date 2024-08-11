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
            poster:
              'https://res.cloudinary.com/ench-app/image/upload/v1723381664/bc9ccb58-2383-4be3-a936-8255a0bcb5e4_sp0zvo.jpg',
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
        order: 2,
        depth: 0,
      },
    },
    '39aeb682-8ce1-4eea-9bd1-4d22bd8cf60e': {
      id: '39aeb682-8ce1-4eea-9bd1-4d22bd8cf60e',
      value: [
        {
          id: '28d07225-34de-4fa5-bdce-619d749f7954',
          type: 'heading-one',
          props: {
            nodeType: 'block',
          },
          children: [
            {
              text: 'Image is first',
            },
          ],
        },
      ],
      type: 'HeadingOne',
      meta: {
        order: 1,
        depth: 0,
      },
    },
    '2458cd0e-015f-414c-8352-d45051f2c0cb': {
      id: '2458cd0e-015f-414c-8352-d45051f2c0cb',
      value: [
        {
          id: 'cfb42efa-41b8-412f-a41f-2a2dec812116',
          type: 'image',
          props: {
            src: 'https://res.cloudinary.com/ench-app/image/upload/v1723381864/GPcx5zma8AAAQ1W_vscnie.jpg',
            alt: 'cloudinary',
            srcSet: null,
            bgColor: null,
            fit: 'contain',
            sizes: {
              width: 510,
              height: 510,
            },
            nodeType: 'void',
          },
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      type: 'Image',
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
