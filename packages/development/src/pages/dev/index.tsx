import { YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useRef, useState } from 'react';

import YooptaEditor from '@yoopta/starter-kit';
import { uploadToCloudinary } from '../../utils/cloudinary';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const [value, setValue] = useState<YooptaContentValue>();
  const selectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={selectionRef} className="p-20">
      <button type="button" onClick={() => console.log('value')}>
        GET
      </button>
      <YooptaEditor
        value={value}
        onChange={(data) => {
          console.log('data', data);
          setValue(data);
        }}
        style={{ width: 650 }}
        selectionRef={selectionRef}
        placeholder="Start typing here..."
        media={{
          imageUpload: async (file) => {
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
          fileUpload: async (file) => {
            const response = await uploadToCloudinary(file, 'auto');
            return { src: response.url, name: response.name };
          },
          videoUpload: async (file) => {
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
      />
    </div>
  );
};

export default BasicExample;
