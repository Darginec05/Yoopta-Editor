import { ReactEditor, RenderElementProps } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { useEffect, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { getAspectRatio } from '../utils/aspect';
import { Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import s from './EditorPlaceholder.module.scss';

type Props = RenderElementProps;

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, attributes, children, editor, onChange }: Props) => {
  const [uploaderPos, setUploaderPos] = useState<null | UploaderPosition>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const imageEditorRef = useRef<HTMLDivElement>(null);

  const toggleUploaderOpen = () => {
    if (uploaderPos !== null) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
      return;
    }

    const imageEditorRect = imageEditorRef.current?.getBoundingClientRect();

    if (imageEditorRect) {
      const showAtTop = imageEditorRect.top + imageEditorRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;
      const showAtBottom = !showAtTop;
      console.log({ showAtTop, showAtBottom });

      disableBodyScroll(document.body, { reserveScrollBarGap: true });
      setUploaderPos({
        left: imageEditorRect.left,
        top: showAtTop ? imageEditorRect.top - UPLOADER_HEIGHT - 5 : imageEditorRect.top + imageEditorRect.height + 5,
      });
    }
  };

  const onChangeFile = async (file) => {
    const response = await onChange(file);
    const { width, height } = getAspectRatio(response.data.width, response.data.height, 800, 900);

    enableBodyScroll(document.body);
    setUploaderPos(null);

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
    <div className={s.editor} {...attributes} contentEditable={false}>
      <div ref={imageEditorRef}>
        <button className={s.content} onClick={toggleUploaderOpen}>
          <UploadIcon className={s.icon} width={24} height={24} />
          <span>Click to add image</span>
        </button>
        {uploaderPos !== null && (
          <EditorUploader
            onChange={onChangeFile}
            onClose={toggleUploaderOpen}
            activeTab={activeTab}
            switchTab={(tab) => setActiveTab(tab)}
            style={uploaderPos}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export { EditorPlaceholder };
