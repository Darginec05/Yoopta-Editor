import { ReactEditor, RenderElementProps } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { getAspectRatio } from '../utils/aspect';
import { Editor, Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import s from './EditorPlaceholder.module.scss';
import { toBase64 } from '../utils/base64';

type Props = RenderElementProps & {
  editor: Editor;
  onChange: (file: File) => Promise<void>;
};

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, attributes, children, editor, onChange }: Props) => {
  const [uploaderPos, setUploaderPos] = useState<null | UploaderPosition>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const imageEditorRef = useRef<HTMLDivElement>(null);

  const toggleUploaderOpen = (e: MouseEvent) => {
    e.stopPropagation();

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

  function getImageSizes(base64): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        return resolve({ width: img.width, height: img.height });
      };
    });
  }

  const onChangeFile = async (file) => {
    const base64 = await toBase64(file);
    const format = base64.substring('data:image/'.length, base64.indexOf(';base64'));

    const optimisticImage = await getImageSizes(base64);
    const aspectSizes = getAspectRatio(optimisticImage.width, optimisticImage.height, 800, 900);

    enableBodyScroll(document.body);
    setUploaderPos(null);

    const imageNode = {
      'data-src': base64,
      options: { format, size: { width: aspectSizes.width, height: aspectSizes.height } },
    };

    console.log('optimistic image uploader', ReactEditor.findPath(editor, element));

    Transforms.setNodes(editor, imageNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'image',
    });

    const response = await onChange(file);
    const { width, height } = getAspectRatio(response.data.width, response.data.height, 800, 900);

    const updateImageNode = {
      url: response.url,
      'data-src': undefined,
      options: { format: response.data.format, size: { width, height } },
    };

    Transforms.setNodes(editor, updateImageNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'image',
    });
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
