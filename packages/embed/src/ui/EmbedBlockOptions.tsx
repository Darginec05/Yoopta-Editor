import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { RowSpacingIcon, SizeIcon, WidthIcon, DownloadIcon } from '@radix-ui/react-icons';
import { EmbedElementProps, EmbedPluginElements } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: EmbedElementProps;
  settings?: EmbedElementProps['settings'];
};

const EmbedBlockOptions = ({ editor, block, props: embedProps }: Props) => {
  const onMute = () => {
    editor.blocks.Embed.updateElement<EmbedPluginElements, EmbedElementProps>(block.id, 'embed', {
      settings: { muted: true },
    });
  };

  const onAutoplay = () => {
    editor.blocks.Embed.updateElement<EmbedPluginElements, EmbedElementProps>(block.id, 'embed', {
      settings: { autoPlay: true },
    });
  };

  const onLoop = () => {
    editor.blocks.Embed.updateElement<EmbedPluginElements, EmbedElementProps>(block.id, 'embed', {
      settings: { loop: true },
    });
  };

  const onControls = () => {
    editor.blocks.Embed.updateElement<EmbedPluginElements, EmbedElementProps>(block.id, 'embed', {
      settings: { controls: true },
    });
  };

  const onDownload = () => {
    if (!embedProps || !embedProps.src) return;

    const link = document.createElement('a');
    link.href = embedProps.src;
    link.download = embedProps.src;
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

export { EmbedBlockOptions };
