import YooptaEditor, {
  Blocks,
  createYooptaEditor,
  Elements,
  useYooptaEditor,
  useYooptaFocused,
  YooEditor,
  YooptaBlockData,
  YooptaContentValue,
} from '@yoopta/editor';
import YooptaStarterKit from '@yoopta/starter-kit';
import { html } from '@yoopta/exports';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '96e0ceb5-1df2-4275-9ed0-59ab571066f9': {
      id: '96e0ceb5-1df2-4275-9ed0-59ab571066f9',
      type: 'HeadingOne',
      meta: {
        order: 0,
        depth: 0,
      },
      value: [
        {
          id: '1f3779a6-4099-42af-9992-8047d7e7ee98',
          type: 'heading-one',
          children: [
            {
              text: 'Drag and drop, nested dnd is supporte',
              bold: true,
            },
            {
              text: 'd also',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    '124268a3-ea74-4e8c-992f-67c6373285de': {
      id: '124268a3-ea74-4e8c-992f-67c6373285de',
      type: 'Callout',
      meta: {
        order: 1,
        depth: 0,
        align: 'center',
      },
      value: [
        {
          id: '7f3d59ab-58e9-4d28-a488-6d8793c1e025',
          type: 'callout',
          children: [
            {
              text: 'Simplify API for creating plugins',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    '174ac0e2-ced5-4696-b281-efc2c32d7766': {
      id: '174ac0e2-ced5-4696-b281-efc2c32d7766',
      type: 'Paragraph',
      meta: {
        order: 2,
        depth: 0,
        align: 'center',
      },
      value: [
        {
          id: '52c03ccb-6857-495a-b4b3-184fec3c5690',
          type: 'paragraph',
          children: [
            {
              text: 'Collabrative mode super',
              bold: true,
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    '1398b9f0-084c-4b7f-abad-cd153222639f': {
      id: '1398b9f0-084c-4b7f-abad-cd153222639f',
      value: [
        {
          id: 'b07eb98c-b6db-4d16-8445-ccc66995974a',
          type: 'bulleted-list',
          children: [
            {
              text: 'Continue improving the project. We are listening to you and your requests 💙',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 3,
        depth: 0,
      },
    },
    '7d35407d-dec8-4cb9-8220-d551f4f4e81d': {
      id: '7d35407d-dec8-4cb9-8220-d551f4f4e81d',
      value: [
        {
          id: '37d7b8d3-5575-44c8-b075-c3a6ababfc34',
          type: 'image',
          props: {
            src: 'https://res.cloudinary.com/ench-app/image/upload/v1722025817/Screen_Shot_2024-07-26_at_11.59.26_q52gco.png',
            alt: 'cloudinary',
            srcSet: null,
            fit: 'contain',
            sizes: {
              width: 300,
              height: 300,
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
        order: 4,
        depth: 0,
      },
    },
    '04bafc81-ac52-4f64-bff5-a381ae78cb44': {
      id: '04bafc81-ac52-4f64-bff5-a381ae78cb44',
      value: [
        {
          id: '12ebec46-67fc-4809-853f-02215987465d',
          type: 'embed',
          props: {
            sizes: {
              width: 554,
              height: 341,
            },
            nodeType: 'void',
            provider: {
              type: 'youtube',
              id: 'leKOlt3g6HA',
              url: 'https://www.youtube.com/watch?v=leKOlt3g6HA&ab_channel=%D0%9F%D1%80%D0%B8%D0%B7%D1%8B%D0%B2Dawah',
            },
          },
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      type: 'Embed',
      meta: {
        order: 5,
        depth: 0,
        align: 'right',
      },
    },
    '2cef9067-dc5c-4c1d-b298-27fbaad4abd5': {
      id: '2cef9067-dc5c-4c1d-b298-27fbaad4abd5',
      value: [
        {
          id: '4ee172b3-98c3-4cf4-bf12-d108ce8e856e',
          type: 'video',
          props: {
            src: 'https://res.cloudinary.com/ench-app/video/upload/v1722025885/Coding_vv9a8u.mov',
            srcSet: null,
            sizes: {
              width: 566,
              height: 479,
            },
            nodeType: 'void',
            provider: {
              type: null,
              id: '',
            },
            settings: {
              controls: false,
              loop: true,
              muted: true,
              autoPlay: true,
            },
            fit: 'cover',
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
        order: 6,
        depth: 0,
        align: 'left',
      },
    },
    '571842af-eb2a-4c85-ab56-6f5e8572f475': {
      id: '571842af-eb2a-4c85-ab56-6f5e8572f475',
      value: [
        {
          id: 'c6f3ad75-ba61-40d1-8526-2117ad6e16ef',
          type: 'file',
          props: {
            size: 1084157,
            name: 'Screen Shot 2024-07-26 at 15.20.34',
            src: 'https://res.cloudinary.com/ench-app/image/upload/v1722025896/Screen_Shot_2024-07-26_at_15.20.34_au4l0g.png',
            format: 'png',
            nodeType: 'void',
          },
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      type: 'File',
      meta: {
        order: 7,
        depth: 0,
      },
    },
    'ba3b3e24-7a26-42b3-93d2-f36b7d149e5b': {
      id: 'ba3b3e24-7a26-42b3-93d2-f36b7d149e5b',
      value: [
        {
          id: '533311c7-3407-4ca5-814c-ac979e10f47c',
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
        order: 8,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
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

      {/* <YooptaStarterKit
        id="starter-kit"
        value={value}
        onChange={(data) => setValue(data)}
        style={{ width: 650 }}
        selectionBoxRoot={selectionRef}
        placeholder="Start typing here..."
        media={{
          imageUpload: async (file: File) => {
            const data = await uploadToCloudinary(file, 'image');

            return {
              src: data.secure_url,
              alt: 'cloudinary',
              sizes: {
                width: data.width,
                height: data.height,
              },
            };
          },
          fileUpload: async (file: File) => {
            const response = await uploadToCloudinary(file, 'auto');
            return { src: response.url, name: response.name };
          },
          videoUpload: async (file: File) => {
            const data = await uploadToCloudinary(file, 'video');
            return {
              src: data.secure_url,
              alt: 'cloudinary',
              sizes: {
                width: data.width,
                height: data.height,
              },
            };
          },
        }}
      /> */}
    </div>
  );
};

export default BasicExample;
