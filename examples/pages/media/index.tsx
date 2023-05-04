import { YoptaEditor } from '@yoopta/editor';
import { useState } from 'react';
import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';

import s from './styles.module.scss';
// import '@yoopta/editor/dist/index.css';

const initialValue = [
  {
    id: '4e186dc3-d1a1-4a61-b43e-f9686deac4b3',
    type: 'heading-one',
    children: [
      {
        text: 'Media ',
      },
    ],
    isVoid: false,
  },
  {
    id: 'c155a967-16a9-417b-8965-8f6d75ac5b35',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Media can be uploaded directly from your device',
      },
    ],
  },
  {
    id: '54af19ec-720e-4adb-b0a4-d1ba1a5abb58',
    type: 'image',
    children: [
      {
        text: '',
      },
    ],
    isVoid: true,
    src: 'https://res.cloudinary.com/ench-app/image/upload/v1674513457/1000_F_67721434_N9j2svFTHgZEnmYE6QLWsGqlNnG2ksmy_ffu8mr.jpg',
    options: {
      width: 1000,
      height: 805,
      format: 'jpg',
      name: '1000_F_67721434_N9j2svFTHgZEnmYE6QLWsGqlNnG2ksmy_ffu8mr',
      id: '7770321939c78aed9f48e7ff6938d981',
      secure_url:
        'https://res.cloudinary.com/ench-app/image/upload/v1674513457/1000_F_67721434_N9j2svFTHgZEnmYE6QLWsGqlNnG2ksmy_ffu8mr.jpg',
    },
  },
  {
    id: '957d109d-6df5-47b3-add0-ccb63f1565e9',
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    id: 'e59602fe-2cb4-4a48-8437-4f5dcf83f0e6',
    type: 'paragraph',
    children: [
      {
        text: 'Or you can add media from external resources',
      },
    ],
  },
  {
    id: 'b227323d-ff30-42f9-af3c-2d6306ac4b08',
    type: 'image',
    children: [
      {
        text: '',
      },
    ],
    isVoid: false,
    src: 'https://img.freepik.com/free-photo/funny-grumpy-cat-studio-brown-background-close-up-photo-family-pet_482257-36554.jpg?w=1800&t=st=1674513164~exp=1674513764~hmac=c9046d7305233638a96dc666ac897ff4fa23be160de06aa21b2f66cdbe187b29',
  },
  {
    id: 'bd1c0aa9-1f04-495a-9960-eedfa294e6a2',
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    id: '08f246b9-835f-4de0-9471-56b4c580fe67',
    type: 'paragraph',
    children: [
      {
        text: 'Example with video',
      },
    ],
  },
  {
    id: '8250de46-38de-47a7-bd91-fd7a48f32501',
    type: 'video',
    children: [
      {
        text: '',
      },
    ],
    isVoid: true,
    src: 'https://res.cloudinary.com/ench-app/video/upload/v1674515322/Cat_Transcendence-_limitless_hy80yr.mp4',
    options: {
      width: 1280,
      height: 720,
      format: 'mp4',
      name: 'Cat_Transcendence-_limitless_hy80yr',
      id: 'a762c12e32747ed62e010725179a8b9b',
      secure_url:
        'https://res.cloudinary.com/ench-app/video/upload/v1674515322/Cat_Transcendence-_limitless_hy80yr.mp4',
    },
  },
];

const MediaExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

  const onChangeMedia = async (file: File, type: string) => {
    const { url, data } = await uploadToCloudinary(file, type);
    return { url, options: data };
  };

  const media = {
    imageProps: {
      onChange: (file: File) => onChangeMedia(file, 'image'),
      accept: 'image/*',
    },
    videoProps: {
      onChange: (file: File) => onChangeMedia(file, 'video'),
    },
  };

  return (
    <div className={s.container}>
      <YoptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        className={s.editor}
        media={media}
      />
    </div>
  );
};

export default MediaExample;
