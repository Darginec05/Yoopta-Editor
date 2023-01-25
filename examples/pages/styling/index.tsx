import { YoptaEditor } from 'yopta-editor';
import { useState } from 'react';
import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';

import s from './styles.module.scss';
import 'yopta-editor/dist/index.css';

const initialValue = [
  {
    type: 'heading-one',
    id: '7f4c5d1a-3cf6-42fe-a26e-2454dc1f04f3',
    children: [
      {
        text: 'Custom styles',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '80f27da1-dc4e-4983-ab5f-653dc3a87194',
    children: [
      {
        text: 'You can easy add custom styles in Yopta-Editor! ',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'b5c9722f-7367-4929-91c9-efe221472075',
    children: [
      {
        text: 'I have provided some global class names for all elements, leafs and some tools.',
      },
    ],
  },
  {
    type: 'paragraph',
    id: '4248b198-c595-4aeb-bf24-e8a1ef2a6ad1',
    children: [
      {
        text: 'Elements',
        underline: true,
      },
      {
        text: ' classnames:',
      },
    ],
  },
  {
    type: 'bulleted-list',
    id: 'f9ffe339-b183-448c-b37b-5c7ea5c07772',
    children: [
      {
        type: 'list-item',
        id: 'db89223b-eb38-4f87-bd3e-6ada80e46973',
        children: [
          {
            text: 'Heading 1 - ',
          },
          {
            text: 'yopta-heading-one',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '5b492099-a60a-4a54-aa73-9c03ae464a77',
        children: [
          {
            text: 'Heading 2 - ',
          },
          {
            text: 'yopta-heading-two',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: 'fa1ca4bf-8aa7-4304-ae3b-a038227b5928',
        children: [
          {
            text: 'Heading 3 - ',
          },
          {
            text: 'yopta-heading-three',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '2c7f6591-ed44-489f-b657-e7a9d03528f4',
        children: [
          {
            text: 'Paragraph (Text) - ',
          },
          {
            text: 'yopta-paragraph',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '8db43175-3c75-49e1-a65b-2f05b586ad53',
        children: [
          {
            text: 'Bulleted List - ',
          },
          {
            text: 'yopta-bulleted-list',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '055baa73-50aa-4245-9467-0a2e96163ef5',
        children: [
          {
            text: 'Numbered List - ',
          },
          {
            text: 'yopta-numbered-list',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '8bf9baa6-f900-4e54-a7dd-8ea688687150',
        children: [
          {
            text: 'List Item - ',
          },
          {
            text: 'yopta-list-item',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '56a07929-df81-43dd-8e42-84cfe85974ae',
        children: [
          {
            text: 'Link - ',
          },
          {
            text: 'yopta-link',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '3419ad3f-586b-413a-b663-acac6a1c0167',
        children: [
          {
            text: 'Blockquote - ',
          },
          {
            text: 'yopta-blockquote',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '41c88829-dc54-4a7a-825c-054d9e8bbef0',
        children: [
          {
            text: 'Callout - ',
          },
          {
            text: 'yopta-callout',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '64c2bded-b40a-4acb-8117-3124d7a20c44',
        children: [
          {
            text: 'Code - ',
          },
          {
            text: 'yopta-code',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '15911395-df9e-4591-887e-97a5da946a41',
        children: [
          {
            text: 'Image - ',
          },
          {
            text: 'yopta-image',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: 'd01e288f-eb2e-4914-812a-bb2672ae78b1',
        children: [
          {
            text: 'Video - ',
          },
          {
            text: 'yopta-video',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '689bdf46-8b2f-442b-ae0b-f36215351da1',
        children: [
          {
            text: 'Embed - ',
          },
          {
            text: 'yopta-embed',
            bold: true,
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'b2e77479-13a6-4728-941f-53e93259b9b0',
    children: [
      {
        text: '',
      },
    ],
    isVoid: false,
  },
  {
    type: 'paragraph',
    id: 'e2bdad33-38cb-4f79-acdb-98dd80edfe9d',
    children: [
      {
        text: 'Leafs',
        underline: true,
      },
      {
        text: ' classnames:',
      },
    ],
  },
  {
    type: 'bulleted-list',
    id: '59dca995-8807-412d-b680-535f3aae393a',
    children: [
      {
        type: 'list-item',
        id: '1b46f1b6-8989-400a-b560-704df6d6ea97',
        children: [
          {
            text: 'Bold',
            bold: true,
          },
          {
            text: ' - ',
          },
          {
            text: 'leaf-bold',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: 'd0173bae-ede7-4fc5-a0d0-9a50534e3a5a',
        children: [
          {
            text: 'Italic',
            italic: true,
          },
          {
            text: ' - ',
          },
          {
            text: 'leaf-italic',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: 'ecfb9b2f-a96e-4c38-86c4-662d29993a88',
        children: [
          {
            text: 'Strike',
            strike: true,
          },
          {
            text: ' - ',
          },
          {
            text: 'leaf-strike',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '5fbe8781-f6dd-4adc-bf95-4f1a5ff30d1d',
        children: [
          {
            text: 'Underline',
            underline: true,
          },
          {
            text: ' - ',
          },
          {
            text: 'leaf-underline',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: 'f8a4068b-f283-4536-896a-8052662d365a',
        children: [
          {
            text: 'Code',
            code: true,
          },
          {
            text: ' - ',
          },
          {
            text: 'leaf-code',
            bold: true,
          },
        ],
      },
    ],
  },
  {
    type: 'bulleted-list',
    id: 'f9ffe339-b183-448c-b37b-5c7ea5c07772',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    id: 'bd06c49b-8b22-4d5f-8d07-64603bd5b612',
    children: [
      {
        text: 'Tools',
        underline: true,
      },
      {
        text: ' classnames: ',
      },
    ],
  },
  {
    type: 'bulleted-list',
    id: 'd952fabb-5444-435c-860c-6fa7b2a3620c',
    children: [
      {
        type: 'list-item',
        id: '7d5cc2c2-6587-4431-af62-35fca9b50d3b',
        children: [
          {
            text: 'Node settings - ',
          },
          {
            text: 'yopta-node_settings',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '28e50268-3cec-4eb1-8fb0-fcf80840e9a2',
        children: [
          {
            text: 'Node settings drag handler - ',
          },
          {
            text: 'node-settings-drag',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '081f4643-9daf-4ee8-9ed8-33981f22b684',
        children: [
          {
            text: 'Node settings plus handler - ',
          },
          {
            text: 'node-settings-add',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '7f4c8ee5-63fc-4d78-aab2-d36e53655b4d',
        children: [
          {
            text: 'Suggestion list - ',
          },
          {
            text: 'yopta-suggesstion_list',
            bold: true,
          },
        ],
      },
      {
        type: 'list-item',
        id: '05ba0819-125c-469c-a8e3-bee121b4e5b6',
        children: [
          {
            text: 'Toolbar - ',
          },
          {
            text: 'yopta-toolbar',
            bold: true,
          },
        ],
      },
    ],
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
