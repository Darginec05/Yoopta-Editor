import { ReactEditor } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { MouseEvent, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import s from './EditorPlaceholder.module.scss';
import { RenderYooptaElementProps, YooEditor } from '@yoopta/editor';
import { EmbedElement } from '../types';
import {
  getDailymotionId,
  getFigmaUrl,
  getProvider,
  getTwitterEmbedId,
  getVimeoId,
  getYoutubeId,
} from '../utils/parsers';

type Props = RenderYooptaElementProps<EmbedElement> & {
  editor: YooEditor;
  maxSizes: { maxWidth: number; maxHeight: number };
};

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, attributes, maxSizes, children, editor }: Props) => {
  const [uploaderPos, setUploaderPos] = useState<null | UploaderPosition>(null);
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
    if (src.length === 0) return;

    const provider = getProvider(src);
    let providerId: string | null = null;

    if (provider === 'youtube') providerId = getYoutubeId(src);
    else if (provider === 'vimeo') providerId = getVimeoId(src);
    else if (provider === 'dailymotion') providerId = getDailymotionId(src);
    else if (provider === 'twitter') providerId = getTwitterEmbedId(src);
    else if (provider === 'figma') providerId = getFigmaUrl(src);

    console.log({ provider, providerId });

    try {
      enableBodyScroll(document.body);
      setUploaderPos(null);

      const updatedEmbedNode: Partial<EmbedElement> = {
        data: {
          ...element.data,
          url: src,
          size: { width: element.data.size.width, height: element.data.size.height },
          provider: provider,
          providerId,
        },
      };

      Transforms.setNodes<EmbedElement>(editor, updatedEmbedNode, {
        at: ReactEditor.findPath(editor, element),
        match: (n) => Element.isElement(n) && n.type === 'embed',
      });
    } catch (error) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
    }
  };

  return (
    <div className={s.editor} {...attributes} contentEditable={false}>
      <div ref={imageEditorRef}>
        <button className={s.content} onClick={toggleUploaderOpen}>
          <UploadIcon className={s.icon} width={24} height={24} />
          <span>Click to add embed</span>
        </button>
        {uploaderPos !== null && <EditorUploader onEmbed={onEmbed} onClose={toggleUploaderOpen} style={uploaderPos} />}
      </div>
      {children}
    </div>
  );
};

export { EditorPlaceholder };
