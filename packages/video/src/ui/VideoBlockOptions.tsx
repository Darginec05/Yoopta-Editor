import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { RowSpacingIcon, SizeIcon, WidthIcon, DownloadIcon } from '@radix-ui/react-icons';
import { VideoElementProps, VideoPluginElements } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: VideoElementProps;
  settings?: VideoElementProps['settings'];
};

const VideoBlockOptions = ({ editor, block, props: videoProps }: Props) => {
  const onMute = () => {
    editor.blocks.Video.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', {
      settings: { muted: true },
    });
  };

  const onAutoplay = () => {
    editor.blocks.Video.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', {
      settings: { autoPlay: true },
    });
  };

  const onLoop = () => {
    editor.blocks.Video.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', {
      settings: { loop: true },
    });
  };

  const onControls = () => {
    editor.blocks.Video.updateElement<VideoPluginElements, VideoElementProps>(block.id, 'video', {
      settings: { controls: true },
    });
  };

  const onDownload = () => {
    if (!videoProps || !videoProps.src) return;

    const link = document.createElement('a');
    link.href = videoProps.src;
    link.download = videoProps.src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])}>
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onAutoplay}
          >
            <RowSpacingIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Autoplay
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onLoop}
          >
            <WidthIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Loop
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onMute}
          >
            <SizeIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Mute
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onControls}
          >
            <SizeIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Controls
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
      <BlockOptionsSeparator />

      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onDownload}
          >
            <DownloadIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Download
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { VideoBlockOptions };
