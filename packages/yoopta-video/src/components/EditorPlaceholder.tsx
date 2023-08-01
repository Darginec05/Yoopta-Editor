import { ReactEditor } from 'slate-react';
import UploadIcon from './icons/upload.svg';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { EditorUploader } from './EditorUploader';
import { getAspectRatio } from '../utils/aspect';
import { Element, Transforms } from 'slate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { cx, RenderYooptaElementProps, YooEditor } from '@yoopta/editor';
import { VideoElement, VideoPluginOptions } from '../types';
import { getDailymotionId, getProvider, getVimeoId, getYoutubeId } from '../utils/parsers';
import s from './EditorPlaceholder.module.scss';
import { Loader } from './Loader';

type Props = RenderYooptaElementProps<VideoElement> & {
  editor: YooEditor;
  onUpload?: VideoPluginOptions['onUpload'];
  maxSizes: { maxWidth: number; maxHeight: number };
};

type UploaderPosition = {
  left: number;
  top: number;
};

const UPLOADER_HEIGHT = 88;

const EditorPlaceholder = ({ element, attributes, maxSizes, children, editor, onUpload }: Props) => {
  const [uploaderPos, setUploaderPos] = useState<null | UploaderPosition>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  const onEmbed = async (src) => {
    if (src.length === 0) return;

    const provider = getProvider(src);
    let videoId: string | null = null;

    if (provider === 'youtube') videoId = getYoutubeId(src);
    else if (provider === 'vimeo') videoId = getVimeoId(src);
    else if (provider === 'dailymotion') videoId = getDailymotionId(src);

    if (!videoId) return;

    try {
      enableBodyScroll(document.body);
      setUploaderPos(null);

      const updatedVideoNode: Partial<VideoElement> = {
        data: {
          ...element.data,
          url: null,
          'data-src': undefined,
          size: { width: element.data.size.width, height: element.data.size.height },
          provider: provider,
          videoId,
        },
      };

      Transforms.setNodes<VideoElement>(editor, updatedVideoNode, {
        at: ReactEditor.findPath(editor, element),
        match: (n) => Element.isElement(n) && n.type === 'video',
      });
    } catch (error) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
    }
  };

  const onChangeFile = async (file) => {
    enableBodyScroll(document.body);
    setUploaderPos(null);
    setLoading(true);

    if (!onUpload) return console.error('Provide `onUpload` props in Video options');

    try {
      const response = await onUpload(file);
      const { width, height } = getAspectRatio(response.width, response.height, maxSizes.maxWidth, maxSizes.maxHeight);

      const updateVideoNode: Partial<VideoElement> = {
        data: {
          url: response.url,
          'data-src': undefined,
          size: { width: width || element.data.size.width, height: height || element.data.size.height },
        },
      };

      setLoading(false);

      Transforms.setNodes<VideoElement>(editor, updateVideoNode, {
        at: ReactEditor.findPath(editor, element),
        match: (n) => Element.isElement(n) && n.type === 'video',
      });
    } catch (error) {
      enableBodyScroll(document.body);
      setUploaderPos(null);
      setLoading(false);
    }
  };

  return (
    <div className={cx(s.editor, { [s.disabledUpload]: loading })} {...attributes} contentEditable={false}>
      <div ref={videoEditorRef}>
        <button className={s.content} onClick={toggleUploaderOpen} disabled={loading}>
          {loading && (
            <div className={s.loading}>
              <Loader />
            </div>
          )}
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
            onEmbed={onEmbed}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export { EditorPlaceholder };
