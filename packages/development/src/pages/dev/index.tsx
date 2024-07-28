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
    '5bdec252-def2-49d1-9a6d-414bc5d1b5e6': {
      id: '5bdec252-def2-49d1-9a6d-414bc5d1b5e6',
      value: [
        {
          id: '08087850-4568-4cb7-8c86-2cf38dd63fba',
          type: 'accordion-list',
          children: [
            {
              id: 'e733daf0-6cd0-4126-884c-eb1eae0e59a3',
              type: 'accordion-list-item',
              children: [
                {
                  id: 'fe95bcd1-c603-405b-8470-56fc1ade923c',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'First heading item',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: 'c5677c00-2e19-4603-a617-6ea6de29a28c',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'For this cursor position test, the rich text editor resides inside a Document Management System. Setting this up requires using the content_style option to target the body element and change the appearance',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
            {
              id: '79d41df7-cbb4-416f-8f22-88d498723ced',
              type: 'accordion-list-item',
              children: [
                {
                  id: '37c91acc-4def-467c-8fab-8886a1af8348',
                  type: 'accordion-list-item-heading',
                  children: [
                    {
                      text: 'Second heading item',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
                {
                  id: '766a51fd-e520-415d-9020-3fd7d9f6496a',
                  type: 'accordion-list-item-content',
                  children: [
                    {
                      text: 'You can change the “no-api-key” string to your TinyMCE API key. When you sign up for a FREE TinyMCE API key, you get a 14 day free trial of TinyMCE’s Premium plugins. Using the key also prevents domain identification errors showing up in the text area.',
                    },
                  ],
                  props: {
                    nodeType: 'block',
                  },
                },
              ],
              props: {
                nodeType: 'block',
                isExpanded: true,
              },
            },
          ],
        },
      ],
      type: 'Accordion',
      meta: {
        order: 0,
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
