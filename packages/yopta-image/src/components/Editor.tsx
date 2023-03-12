import { RenderElementProps } from 'slate-react';
import s from './Editor.module.scss';
import UploadIcon from './icons/upload.svg';
import { useState } from 'react';
import { EditorUploader } from './EditorUploader';

type Props = RenderElementProps;

const Editor = ({ element, attributes, children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');

  const toggleUploaderOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={s.editor} contentEditable={false} {...attributes}>
      <button className={s.content} onClick={toggleUploaderOpen}>
        <UploadIcon className={s.icon} width={24} height={24} />
        <span>Click to add image</span>
      </button>
      {isOpen && (
        <EditorUploader onClose={toggleUploaderOpen} activeTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />
      )}
      {children}
    </div>
  );
};

export { Editor };
