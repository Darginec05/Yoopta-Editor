import { YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useState } from 'react';

import YooptaEditor from '@yoopta/starter-kit';
import { uploadToCloudinary } from '../../utils/cloudinary';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const [value, setValue] = useState<YooptaContentValue>();

  return (
    <YooptaEditor
      value={value}
      onChange={(data) => setValue(data)}
      style={{ width: 650 }}
      mediaUploadsFn={{
        image: async (file) => {
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
        file: async (file) => {
          const response = await uploadToCloudinary(file, 'auto');
          return { src: response.url, name: response.name };
        },
        video: async (file) => {
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
  );
};

export default BasicExample;
