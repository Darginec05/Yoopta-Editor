import { Blocks, Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import {
  RowSpacingIcon,
  SizeIcon,
  WidthIcon,
  ExternalLinkIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons';
import { VideoElementProps, VideoPluginElements } from '../types';
import CheckmarkIcon from '../icons/checkmark.svg';
import DownloadIcon from '../icons/download.svg';

const ALIGN_ICONS = {
  left: TextAlignLeftIcon,
  center: TextAlignCenterIcon,
  right: TextAlignRightIcon,
};

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: VideoElementProps;
  settings?: VideoElementProps['settings'];
};

const VideoBlockOptions = ({ editor, block, props: videoProps }: Props) => {
  const onCover = () => {
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { fit: 'cover' },
    });
  };

  const onFit = () => {
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { fit: 'contain' },
    });
  };

  const onFill = () => {
    Elements.updateElement<VideoPluginElements, VideoElementProps>(editor, block.id, {
      type: 'video',
      props: { fit: 'fill' },
    });
  };

  const isExternalVideo = !!videoProps?.provider?.id;

  const onDownload = () => {
    if (!videoProps || !videoProps.src || isExternalVideo) return;

    const link = document.createElement('a');
    link.href = videoProps.src;
    link.download = videoProps.src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onOpen = () => {
    if (videoProps?.provider?.url) {
      window.open(videoProps?.provider?.url, '_blank');
    }
  };

  const currentAlign = block?.meta?.align || 'center';
  const AlignIcon = ALIGN_ICONS[currentAlign];

  const onToggleAlign = () => {
    const aligns = ['left', 'center', 'right'];
    if (!block) return;

    const nextAlign = aligns[(aligns.indexOf(currentAlign) + 1) % aligns.length] as YooptaBlockData['meta']['align'];
    Blocks.updateBlock(editor, block.id, { meta: { ...block.meta, align: nextAlign } });
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} id="yoopta-video-options">
      <BlockOptionsSeparator />
      {!isExternalVideo && (
        <BlockOptionsMenuGroup>
          <BlockOptionsMenuItem>
            <button type="button" className="yoopta-block-options-button yoo-video-justify-between" onClick={onFit}>
              <span className="yoo-video-flex">
                <RowSpacingIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4 yoo-video-mr-2" />
                Fit
              </span>
              {videoProps?.fit === 'contain' && (
                <CheckmarkIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4" />
              )}
            </button>
          </BlockOptionsMenuItem>
          <BlockOptionsMenuItem>
            <button type="button" className="yoopta-block-options-button yoo-video-justify-between" onClick={onFill}>
              <span className="yoo-video-flex">
                <WidthIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4 yoo-video-mr-2" />
                Fill
              </span>
              {videoProps?.fit === 'fill' && (
                <CheckmarkIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4" />
              )}
            </button>
          </BlockOptionsMenuItem>
          <BlockOptionsMenuItem>
            <button type="button" className="yoopta-block-options-button yoo-video-justify-between" onClick={onCover}>
              <span className="yoo-video-flex">
                <SizeIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4 yoo-video-mr-2" />
                Cover
              </span>
              {videoProps?.fit === 'cover' && (
                <CheckmarkIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4" />
              )}
            </button>
          </BlockOptionsMenuItem>
        </BlockOptionsMenuGroup>
      )}
      <BlockOptionsSeparator />

      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-video-rounded-sm hover:yoo-video-bg-[#37352f14] yoo-video-leading-[120%] yoo-video-px-2 yoo-video-py-1.5 yoo-video-mx-[4px] yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-justify-start"
            onClick={onToggleAlign}
          >
            <AlignIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4 yoo-video-mr-2" />
            Alignment
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-button yoo-video-rounded-sm hover:yoo-video-bg-[#37352f14] yoo-video-leading-[120%] yoo-video-px-2 yoo-video-py-1.5 yoo-video-mx-[4px] yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-justify-start"
            onClick={isExternalVideo ? onOpen : onDownload}
          >
            {isExternalVideo ? (
              <>
                <ExternalLinkIcon width={16} height={16} className="yoo-embed-w-4 yoo-embed-h-4 yoo-embed-mr-2" />
                Open
              </>
            ) : (
              <>
                <DownloadIcon width={16} height={16} className="yoo-video-w-4 yoo-video-h-4 yoo-video-mr-2" />
                Download
              </>
            )}
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { VideoBlockOptions };
