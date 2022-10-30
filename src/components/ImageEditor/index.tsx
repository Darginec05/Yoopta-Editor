import { FC, ReactNode } from 'react';
import cx from 'classnames';
import { ReactEditor, useFocused, useSelected, useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { v4 } from 'uuid';
import { MediaEditorLayout } from '../MediaEditorLayout';
import { ImageElement } from '../Editor/types';
import { ImageRender } from '../ImageRender/ImageRender';
import { Loader } from '../Loader';
import { MediaEditorOptions } from '../MediaEditorOptions';
import { ELEMENT_TYPES_MAP } from '../Editor/constants';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import s from './ImageEditor.module.scss';

const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

type Props = { element: ImageElement; className: string; attributes: any; children: ReactNode };

const ImageEditor: FC<Props> = ({ element, attributes, className, children }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const {
    options: { media },
  } = useSettings();

  const imageProps = media?.imageProps;
  const optimistic = typeof imageProps?.optimistic === 'boolean' ? imageProps?.optimistic : true;

  const onUpload = async (file: File) => {
    let image = {};

    if (optimistic) {
      const dataSrc = await toBase64(file);

      image = {
        id: v4(),
        type: 'image',
        children: [{ text: '' }],
        'data-src': dataSrc,
        src: null,
        isVoid: true,
      };

      Transforms.setNodes(editor, image, { at: editor.selection?.anchor });
    }

    if (typeof imageProps?.onChange === 'function') {
      const { url, options } = await imageProps.onChange(file);

      const newImage = {
        ...image,
        src: url,
        'data-src': null,
        options,
      };

      Transforms.setNodes(editor, newImage, { at: editor.selection?.anchor, voids: true });

      if (editor.selection) {
        Transforms.select(editor, editor.selection);
      }
    }
  };

  const dataSrc = element['data-src'];

  const onDelete = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === ELEMENT_TYPES_MAP.image,
      at: path,
    });
  };

  if (element.src || dataSrc) {
    const loader = imageProps?.loader || (
      <div className={s.loader}>
        <Loader />
      </div>
    );

    return (
      <div
        draggable={false}
        {...attributes}
        contentEditable={false}
        className={cx(className, { [s.selected]: selected && focused })}
      >
        {optimistic && dataSrc ? (
          loader
        ) : (
          <div className={s.options}>
            <MediaEditorOptions onDelete={onDelete} isImage />
          </div>
        )}
        <ImageRender key="render_image" src={element.src || dataSrc} alt="URI" options={element.options} />
        {children}
      </div>
    );
  }

  return (
    <div draggable={false} {...attributes} contentEditable={false} className={className}>
      <div className={s.options}>
        <MediaEditorOptions isImage onDelete={onDelete} />
      </div>
      <MediaEditorLayout
        mediaType="image"
        options={{
          accept: imageProps?.accept || { 'image/*': [] },
          multiple: imageProps?.multiple,
        }}
        onUpload={onUpload}
      />
      {children}
    </div>
  );
};

export { ImageEditor };
