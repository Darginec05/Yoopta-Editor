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
    'b0defd51-217f-436c-a8ed-905068adadae': {
      id: 'b0defd51-217f-436c-a8ed-905068adadae',
      value: [
        {
          id: '9c535e92-e63e-41b2-b38e-e24b4cb20c02',
          type: 'bulleted-list',
          children: [
            {
              text: 'Many typical solved problems in UX behavior.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    '2aea3408-3081-4c45-a782-ba48f6e00a5b': {
      id: '2aea3408-3081-4c45-a782-ba48f6e00a5b',
      value: [
        {
          id: 'c9833dfa-a724-499b-b4cf-385d5730be2d',
          type: 'bulleted-list',
          children: [
            {
              text: 'Media plugins on steroids with optimization and lazy loadings',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 1,
        depth: 0,
        align: 'center',
      },
    },
    '3d402583-48e6-4970-b6a1-697bc8157e4e': {
      id: '3d402583-48e6-4970-b6a1-697bc8157e4e',
      value: [
        {
          id: '1aa1c5ee-19a9-4179-be5a-c148e3071ee2',
          type: 'bulleted-list',
          children: [
            {
              text: 'Code plugin on steroids with themes and languages',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 2,
        depth: 0,
        align: 'center',
      },
    },
    'e21d680d-c802-4fe4-a3ee-30e83e649c14': {
      id: 'e21d680d-c802-4fe4-a3ee-30e83e649c14',
      value: [
        {
          id: 'b3ddb481-02c7-4776-92c3-3151840314f3',
          type: 'bulleted-list',
          children: [
            {
              text: 'Each plugin can be easily customized and extensible',
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
    '96e0ceb5-1df2-4275-9ed0-59ab571066f9': {
      id: '96e0ceb5-1df2-4275-9ed0-59ab571066f9',
      type: 'HeadingOne',
      meta: {
        order: 4,
        depth: 5,
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
    '79b7379d-4b4c-4642-bd19-ba37ab8f6574': {
      id: '79b7379d-4b4c-4642-bd19-ba37ab8f6574',
      value: [
        {
          id: '4e75620a-3a25-4936-a2cd-b8f4c4c730a5',
          type: 'bulleted-list',
          children: [
            {
              text: 'Selection box for manipulating with multiple blocks at once',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 5,
        depth: 2,
      },
    },
    '618838b9-c0fd-40b3-b3e8-6a544fb9229c': {
      id: '618838b9-c0fd-40b3-b3e8-6a544fb9229c',
      value: [
        {
          id: '4ec2f9b0-598e-4c29-8d78-9722f537fbc0',
          type: 'heading-two',
          children: [
            {
              text: 'Roadmap',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 6,
        depth: 0,
        align: 'center',
      },
    },
    '265ee1dd-3922-4033-9dab-5103ab15ea79': {
      id: '265ee1dd-3922-4033-9dab-5103ab15ea79',
      type: 'Blockquote',
      meta: {
        order: 7,
        depth: 3,
      },
      value: [
        {
          id: '932ca5b6-159b-4174-97c4-4d9e2c1af5a2',
          type: 'blockquote',
          children: [
            {
              text: 'Develop other powerful plugins',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    '980c4088-ec98-4dd9-b6bd-01ec45062e5d': {
      id: '980c4088-ec98-4dd9-b6bd-01ec45062e5d',
      value: [
        {
          id: 'cd8cc627-9da5-441d-9c50-f34239b0e008',
          type: 'bulleted-list',
          children: [
            {
              text: 'Super AI tools not for HYPE, but for real useful work with editor content',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'BulletedList',
      meta: {
        order: 8,
        depth: 3,
      },
    },
    '124268a3-ea74-4e8c-992f-67c6373285de': {
      id: '124268a3-ea74-4e8c-992f-67c6373285de',
      type: 'Callout',
      meta: {
        order: 9,
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
        order: 10,
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
    '0f1e3251-324f-47fa-907d-52688bd12820': {
      id: '0f1e3251-324f-47fa-907d-52688bd12820',
      type: 'NumberedList',
      meta: {
        order: 11,
        depth: 0,
      },
      value: [
        {
          id: 'd3925cbc-c272-4b10-ba96-a2ecfa4e6a85',
          type: 'numbered-list',
          children: [
            {
              text: 'Plugin system',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    '6dc9b36c-adb8-4557-aa3e-e45ac37065a2': {
      id: '6dc9b36c-adb8-4557-aa3e-e45ac37065a2',
      type: 'NumberedList',
      meta: {
        order: 12,
        depth: 0,
      },
      value: [
        {
          id: '7da33851-2a9d-421a-ba60-4c49c3eb9934',
          type: 'numbered-list',
          children: [
            {
              text: 'Optimizations for media components (',
            },
            {
              bold: true,
              text: 'srcSet ',
            },
            {
              text: 'for image and ',
            },
            {
              bold: true,
              text: 'sources',
            },
            {
              text: ' for video)',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    },
    'd6185ad3-7ad6-41bf-9a30-fb44dbc802c9': {
      id: 'd6185ad3-7ad6-41bf-9a30-fb44dbc802c9',
      type: 'NumberedList',
      meta: {
        order: 13,
        depth: 0,
      },
      value: [
        {
          id: 'a9de8e64-1c45-4467-a0ea-9bfb29719b48',
          type: 'numbered-list',
          children: [
            {
              text: 'Rethink approach for just rendering to increase SEO perfomance',
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
        order: 14,
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
