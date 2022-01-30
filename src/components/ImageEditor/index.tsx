/* eslint-disable @next/next/no-img-element */
import { FC, MouseEvent } from 'react';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { v4 } from 'uuid';
import { MediaEditorLayout } from '../MediaEditorLayout';
import { ReactComponent as ImageIcon } from '../../icons/image.svg';
import { ImageElement } from '../Editor/custom-types';
import { Image } from '../Image';
import s from './ImageEditor.module.scss';

const toBase64 = (file): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

type Props = { element: ImageElement; className: string; attributes: any; onMouseEnter: (_e: MouseEvent<any>) => void };

const ImageEditor: FC<Props> = ({ element, attributes, className, children, onMouseEnter }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();

  const onUpload = async (e: any) => {
    if (!e.currentTarget.files) return;

    const file = e.currentTarget.files[0];
    const dataSrc = await toBase64(file);

    const image: ImageElement & { isVoid: boolean } = {
      id: v4(),
      type: 'image',
      children: [{ text: '' }],
      'data-src': dataSrc,
      src: null,
      isVoid: true,
    };

    Transforms.removeNodes(editor);

    Transforms.insertNodes(editor, [image]);
  };

  const dataSrc = element['data-src'];

  if (dataSrc) {
    return (
      <div
        {...attributes}
        data-node-id={element.id}
        className={className}
        onMouseEnter={onMouseEnter}
        style={{
          boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
        }}
      >
        <div contentEditable={false}>
          <Image src={dataSrc} alt="loaded_image" />
        </div>
        {children}
      </div>
    );
  }

  return (
    <MediaEditorLayout
      {...attributes}
      style={{ userSelect: 'none' }}
      data-node-id={element.id}
      onMouseEnter={onMouseEnter}
    >
      <label contentEditable={false} htmlFor="image_uploader" className={s.label}>
        <ImageIcon />
        <span>Upload image</span>
        <input id="image_uploader" type="file" multiple={false} onChange={onUpload} accept="image/*" />
      </label>
      {children}
    </MediaEditorLayout>
  );
};

export { ImageEditor };
