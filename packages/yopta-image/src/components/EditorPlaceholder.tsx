import { ReactEditor, RenderElementProps } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { Element, Transforms } from 'slate';
import s from './EditorPlaceholder.module.scss';

type Props = RenderElementProps;

const EditorPlaceholder = ({ element, attributes, children, editor, onUpload }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');

  const toggleUploaderOpen = () => setIsOpen((prev) => !prev);

  const onChange = async (file) => {
    const response = await onUpload(file);

    Transforms.setNodes(
      editor,
      {
        src: response.url,
        options: { format: response.data.format, size: { width: response.data.width, height: response.data.height } },
      },
      {
        at: ReactEditor.findPath(editor, element),
        match: (n) => Element.isElement(n) && n.type === 'image',
      },
    );

    //   {
    //     "width": 2880,
    //     "height": 1800,
    //     "format": "png",
    //     "name": "Screen_Shot_2023-03-12_at_17.59.07_xh6uqv",
    //     "id": "f2047df4e427c35a5ddcb5be74ccc45c",
    //     "secure_url": "https://res.cloudinary.com/ench-app/image/upload/v1678651881/Screen_Shot_2023-03-12_at_17.59.07_xh6uqv.png"
    // }

    // console.log(data);
  };

  return (
    <div className={s.editor} contentEditable={false} {...attributes}>
      <button className={s.content} onClick={toggleUploaderOpen}>
        <UploadIcon className={s.icon} width={24} height={24} />
        <span>Click to add image</span>
      </button>
      {isOpen && (
        <EditorUploader
          onChange={onChange}
          onClose={toggleUploaderOpen}
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
        />
      )}
      {children}
    </div>
  );
};

export { EditorPlaceholder };
