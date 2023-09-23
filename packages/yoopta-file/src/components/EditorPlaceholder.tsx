import { ReactEditor } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { MouseEvent, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { toBase64 } from '../utils/base64';
import { RenderYooptaElementProps, YooEditor } from '@yoopta/editor';
import { FileElement, FilePluginOptions } from '../types';
import s from './EditorPlaceholder.module.scss';

type Props = RenderYooptaElementProps<FileElement> & {
  editor: YooEditor;
  onUpload?: FilePluginOptions['onUpload'];
  accept?: FilePluginOptions['accept'];
};

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, accept, attributes, children, editor, onUpload }: Props) => {
  const [uploaderPos, setUploaderPos] = useState<null | UploaderPosition>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileEditorRef = useRef<HTMLDivElement>(null);

  const toggleUploaderOpen = (e: MouseEvent) => {
    e.stopPropagation();

    if (uploaderPos !== null) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
      return;
    }

    const fileEditorRect = fileEditorRef.current?.getBoundingClientRect();

    if (fileEditorRect) {
      const showAtTop = fileEditorRect.top + fileEditorRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;
      const showAtBottom = !showAtTop;
      console.log({ showAtTop, showAtBottom });

      disableBodyScroll(document.body, { reserveScrollBarGap: true });
      setUploaderPos({
        left: fileEditorRect.left,
        top: showAtTop ? fileEditorRect.top - UPLOADER_HEIGHT - 5 : fileEditorRect.top + fileEditorRect.height + 5,
      });
    }
  };

  const onChangeFile = async (file) => {
    console.log('file.name', file.name);
    console.log('file.size', file.size);

    const base64 = await toBase64(file);

    enableBodyScroll(document.body);
    setUploaderPos(null);

    const fileNode: Partial<FileElement> = {
      data: {
        ...element.data,
        name: file.name,
        size: file.size,
        url: 'ádadsa',
      },
    };

    Transforms.setNodes(editor, fileNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'file',
    });

    if (!onUpload) return console.error('Provide `onUpload` handler in File options');

    const response = await onUpload(file);

    const updatedFileNode: Partial<FileElement> = {
      data: {
        ...element.data,
        url: response.url,
        size: file.size,
        name: file.name,
      },
    };

    Transforms.setNodes(editor, updatedFileNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'file',
    });
  };

  return (
    <div className={s.editor} {...attributes} contentEditable={false}>
      <div ref={fileEditorRef}>
        <button className={s.content} onClick={toggleUploaderOpen}>
          <UploadIcon className={s.icon} width={24} height={24} />
          <span>Click to add file</span>
        </button>
        {uploaderPos !== null && (
          <EditorUploader
            onChange={onChangeFile}
            onClose={toggleUploaderOpen}
            activeTab={activeTab}
            switchTab={(tab) => setActiveTab(tab)}
            style={uploaderPos}
            accept={accept}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export { EditorPlaceholder };
