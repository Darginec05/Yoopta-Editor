import { ReactEditor } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { getAspectRatio } from '../utils/aspect';
import { Editor, Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import s from './EditorPlaceholder.module.scss';
import { toBase64 } from '../utils/base64';
import { RenderElementProps, YoEditor } from '@yopta/editor';
import { VideoElement } from '../types';

type Props = RenderElementProps<VideoElement> & {
  editor: YoEditor;
  onChange: (file: File) => Promise<void>;
  maxSizes: { maxWidth: number; maxHeight: number };
};

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, attributes, maxSizes, children, editor, onChange }: Props) => {
  const [uploaderPos, setUploaderPos] = useState<null | UploaderPosition>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const videoEditorRef = useRef<HTMLDivElement>(null);

  const toggleUploaderOpen = (e: MouseEvent) => {
    e.stopPropagation();

    if (uploaderPos !== null) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
      return;
    }

    const videoEditorRect = videoEditorRef.current?.getBoundingClientRect();

    if (videoEditorRect) {
      const showAtTop = videoEditorRect.top + videoEditorRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;
      const showAtBottom = !showAtTop;
      console.log({ showAtTop, showAtBottom });

      disableBodyScroll(document.body, { reserveScrollBarGap: true });
      setUploaderPos({
        left: videoEditorRect.left,
        top: showAtTop ? videoEditorRect.top - UPLOADER_HEIGHT - 5 : videoEditorRect.top + videoEditorRect.height + 5,
      });
    }
  };

  function getVideoSizes(base64): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve({ width: 400, height: 300 });
    });
  }

  const onChangeFile = async (file) => {
    const base64 = await toBase64(file);
    const format = base64.substring('data:video/'.length, base64.indexOf(';base64'));

    const optimisticVideo = await getVideoSizes(base64);
    const aspectSizes = getAspectRatio(
      optimisticVideo.width,
      optimisticVideo.height,
      maxSizes.maxWidth,
      maxSizes.maxHeight,
    );

    enableBodyScroll(document.body);
    setUploaderPos(null);

    const videoNode: Partial<VideoElement> = {
      data: {
        ...element.data,
        'data-src': base64,
        size: {
          width: aspectSizes.width || element.data.size.width,
          height: aspectSizes.height || element.data.size.height,
        },
      },
    };

    console.log('optimistic video uploader', ReactEditor.findPath(editor, element));

    Transforms.setNodes<VideoElement>(editor, videoNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'video',
    });

    const response = await onChange(file);
    const { width, height } = getAspectRatio(
      response.data.width,
      response.data.height,
      maxSizes.maxWidth,
      maxSizes.maxHeight,
    );

    const updateVideoNode: Partial<VideoElement> = {
      data: {
        url: response.url,
        'data-src': undefined,
        size: { width: width || element.data.size.width, height: height || element.data.size.height },
      },
    };

    Transforms.setNodes<VideoElement>(editor, updateVideoNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'video',
    });
  };

  return (
    <div className={s.editor} {...attributes} contentEditable={false}>
      <div ref={videoEditorRef}>
        <button className={s.content} onClick={toggleUploaderOpen}>
          <UploadIcon className={s.icon} width={24} height={24} />
          <span>Click to add video</span>
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
