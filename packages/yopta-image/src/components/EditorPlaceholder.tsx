import { ReactEditor, RenderElementProps } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { getAspectRatio } from '../utils/aspect';
import { Element, Transforms } from 'slate';
import s from './EditorPlaceholder.module.scss';

type Props = RenderElementProps;

const EditorPlaceholder = ({ element, attributes, children, editor, onUpload }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');

  const toggleUploaderOpen = () => setIsOpen((prev) => !prev);

  const onChange = async (file) => {
    const response = await onUpload(file);
    const { width, height } = getAspectRatio(response.data.width, response.data.height, 800, 900);

    Transforms.setNodes(
      editor,
      {
        url: response.url,
        options: { format: response.data.format, size: { width, height } },
      },
      {
        at: ReactEditor.findPath(editor, element),
        match: (n) => Element.isElement(n) && n.type === 'image',
      },
    );
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
