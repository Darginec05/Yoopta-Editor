import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { RowSpacingIcon, SizeIcon, WidthIcon, DownloadIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { VideoElementProps, VideoPluginElements } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: VideoElementProps;
  settings?: VideoElementProps['settings'];
};

const VideoBlockOptions = ({ editor, block, props: videoProps }: Props) => {
  const onCover = () => {
    editor.blocks.Image.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', { fit: 'cover' });
  };

  const onFit = () => {
    editor.blocks.Image.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', { fit: 'contain' });
  };

  const onFill = () => {
    editor.blocks.Image.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', { fit: 'fill' });
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

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-video-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-video-rounded-sm hover:yoo-video-bg-[#37352f14] yoo-video-leading-[120%] yoo-video-px-2 yoo-video-py-1.5 yoo-video-mx-[4px] yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-justify-start"
            onClick={onFit}
          >
            <RowSpacingIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Fit
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-video-rounded-sm hover:yoo-video-bg-[#37352f14] yoo-video-leading-[120%] yoo-video-px-2 yoo-video-py-1.5 yoo-video-mx-[4px] yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-justify-start"
            onClick={onFill}
          >
            <WidthIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Fill
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-video-rounded-sm hover:yoo-video-bg-[#37352f14] yoo-video-leading-[120%] yoo-video-px-2 yoo-video-py-1.5 yoo-video-mx-[4px] yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-justify-start"
            onClick={onCover}
          >
            <SizeIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Cover
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
      <BlockOptionsSeparator />

      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-video-rounded-sm hover:yoo-video-bg-[#37352f14] yoo-video-leading-[120%] yoo-video-px-2 yoo-video-py-1.5 yoo-video-mx-[4px] yoo-video-cursor-pointer yoo-video-w-full yoo-video-flex yoo-video-justify-start"
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
