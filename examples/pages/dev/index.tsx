import { YoptaEditor } from 'yopta-editor';
import Blockquote from '@yopta/blockquote';
import Paragraph from '@yopta/paragraph';
import Callout from '@yopta/callout';
import Code from '@yopta/code';
import { KeyboardEvent, ReactNode, useState } from 'react';
import { Descendant } from 'slate';

import s from './styles.module.scss';
import 'yopta-editor/dist/index.css';
import { uploadToCloudinary } from '../../utils';

const initialValue = [
  {
    type: 'heading-two',
    id: 'ed117ae4-0177-4879-b4fd-c6423f57b190',
    children: [
      {
        text: 'Hi There!',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '36d5ece5-093e-450a-8cb9-674917472365',
    children: [
      {
        text: "Let's start to test our Yopta-Editor 🤟",
      },
    ],
  },
];

type YoptaTypes = 'block-quote' | 'image' | 'paragraph' | 'callout' | 'code';

type YoptaComponent = {
  render?: ReactNode;
  shortcut?: string;
  handlers?: {
    onKeyDown: (event: KeyboardEvent) => void;
  };
};

type YoptaComponents = Record<YoptaTypes, YoptaComponent>;

const components: YoptaComponents = {
  // blockquote: Blockquote.extend({
  //   render: (props) => <div></div>,
  //   handlers: {},
  //   nodeType: 'inline',
  // }),
  'block-quote': Blockquote,
  paragraph: Paragraph,
  callout: Callout,
  image: Blockquote,
  code: Code,
};

const BasicExample = () => {
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
        shouldStoreInLocalStorage={{ name: 'yopta-dev' }}
        media={media}
        components={components}
      />
    </div>
  );
};

export default BasicExample;
