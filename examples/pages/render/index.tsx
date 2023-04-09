import { YoptaEditor } from '@yopta/editor';

import { useState } from 'react';
import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';

// import '@yopta/editor/dist/index.css';
import s from './styles.module.scss';

const initialData = [
  {
    id: '663607d6-80c8-4d96-811a-1d7ad2aadcdd',
    type: 'heading-one',
    children: [
      {
        text: '<YoptaRenderer /> - component just for render',
      },
    ],
    isVoid: false,
  },
  {
    id: 'f903cce8-8b70-441a-a81b-57181fbd2a7b',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Use this component for just displaying your data',
      },
    ],
  },
  {
    id: 'a727fd8f-402f-4eb0-8e3e-d6c93e213955',
    type: 'paragraph',
    children: [
      {
        text: 'This component will speed up the page loading speed.',
      },
    ],
  },
  {
    id: 'e8bbed69-ff94-4fe4-b136-6161d1a354ad',
    type: 'paragraph',
    children: [
      {
        text: 'As an example, you can look at the page speed metrics in the blog platform ',
      },
      {
        id: '55719bc8-12c6-4374-811d-a7d5c7cbf2cb',
        type: 'link',
        url: 'https://yopage.co/blog/0zntIA46L4/qOQqVaxxRZ',
        children: [
          {
            text: 'Yopage.co',
          },
        ],
      },
      {
        text: '',
      },
    ],
  },
  {
    id: 'fa9319e9-bdd9-4bd6-a890-3edf3bded4f0',
    type: 'image',
    children: [
      {
        text: '',
      },
    ],
    isVoid: true,
    src: 'https://res.cloudinary.com/ench-app/image/upload/v1674646129/Screen_Shot_2023-01-25_at_11.56.55_azpxkj.png',
    options: {
      width: 1909,
      height: 980,
      format: 'png',
      name: 'Screen_Shot_2023-01-25_at_11.56.55_azpxkj',
      id: '3431383615f5d9998b04f97e8ac79cbe',
      secure_url:
        'https://res.cloudinary.com/ench-app/image/upload/v1674646129/Screen_Shot_2023-01-25_at_11.56.55_azpxkj.png',
    },
  },
];

const JustRenderExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialData);
  const [mode, setMode] = useState<'render' | 'editor'>('render');

  if (mode === 'editor') {
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

    console.log(editorValue);

    return (
      <div className={s.container}>
        <YoptaEditor
          value={editorValue}
          onChange={(data) => setEditorValue(data)}
          className={s.editor}
          autoFocus
          media={media}
          key="editor"
        />
        <button onClick={() => setMode('render')} className={s.button}>
          Switch to render mode
        </button>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {/* <YoptaRenderer data={editorValue} className={s.editor} /> */}
      <button className={s.button} onClick={() => setMode('editor')}>
        Switch to edit mode
      </button>
    </div>
  );
};

export default JustRenderExample;
