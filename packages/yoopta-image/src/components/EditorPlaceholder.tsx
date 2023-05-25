import { ReactEditor } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { getAspectRatio } from '../utils/aspect';
import { Editor, Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import s from './EditorPlaceholder.module.scss';
import { toBase64 } from '../utils/base64';
import { getImageSizes } from '../utils/imageSizes';
import { RenderYooptaElementProps, YooEditor } from '@yoopta/editor';
import { ImageElement, ImagePluginOptions } from '../types';

type Props = RenderYooptaElementProps<ImageElement> & {
  editor: YooEditor;
  onUpload?: ImagePluginOptions['onUpload'];
  accept?: ImagePluginOptions['accept'];
  maxSizes: { maxWidth: number; maxHeight: number };
};

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, accept, attributes, maxSizes, children, editor, onUpload }: Props) => {
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

  const onEmbed = async (src) => {
    try {
      const { width, height } = await getImageSizes(src);

      enableBodyScroll(document.body);
      setUploaderPos(null);

      const updatedImageNode: Partial<ImageElement> = {
        data: {
          ...element.data,
          url: src,
          'data-src': undefined,
          size: { width, height },
        },
      };

      Transforms.setNodes(editor, updatedImageNode, {
        at: ReactEditor.findPath(editor, element),
        match: (n) => Element.isElement(n) && n.type === 'image',
      });
    } catch (error) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
    }
  };

  const onChangeFile = async (file) => {
    const base64 = await toBase64(file);
    const format = base64.substring('data:image/'.length, base64.indexOf(';base64'));

    const optimisticImage = await getImageSizes(base64);

    const aspectSizes = getAspectRatio(
      optimisticImage.width,
      optimisticImage.height,
      maxSizes.maxWidth,
      maxSizes.maxHeight,
    );

    enableBodyScroll(document.body);
    setUploaderPos(null);

    const imageNode: Partial<ImageElement> = {
      data: {
        ...element.data,
        'data-src': base64,
        size: {
          width: aspectSizes.width || element.data.size.width,
          height: aspectSizes.height || element.data.size.height,
        },
      },
    };

    console.log('optimistic image uploader', ReactEditor.findPath(editor, element));

    Transforms.setNodes(editor, imageNode, {
      at: ReactEditor.findPath(editor, element),
      match: (n) => Element.isElement(n) && n.type === 'image',
    });

    if (!onUpload) return console.error('Provide `onUpload` handler in Image options');

    const response = await onUpload(file);
    const { width, height } = getAspectRatio(response.width, response.height, maxSizes.maxWidth, maxSizes.maxHeight);

    const updatedImageNode: Partial<ImageElement> = {
      data: {
        ...element.data,
        url: response.url,
        'data-src': undefined,
        size: { width: width || element.data.size.width, height: height || element.data.size.height },
      },
    };

    Transforms.setNodes(editor, updatedImageNode, {
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
            onEmbed={onEmbed}
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
