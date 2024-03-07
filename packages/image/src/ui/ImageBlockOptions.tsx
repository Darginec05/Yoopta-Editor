import { UI, YooEditor } from '@yoopta/editor';
import { RowSpacingIcon, SizeIcon, WidthIcon, DownloadIcon, TextIcon } from '@radix-ui/react-icons';
import { YooptaBlockData } from '@yoopta/editor/src/editor/types';
import { ImageElementProps, ImagePluginElements } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: ImageElementProps;
};

const ImageBlockOptions = ({ editor, block, props: imageProps }: Props) => {
  const onCover = () => {
    editor.blocks.Image.updateElement<ImagePluginElements, ImageElementProps>(block.id, 'image', { fit: 'cover' });
  };

  const onFit = () => {
    editor.blocks.Image.updateElement<ImagePluginElements, ImageElementProps>(block.id, 'image', { fit: 'contain' });
  };

  const onFill = () => {
    editor.blocks.Image.updateElement<ImagePluginElements, ImageElementProps>(block.id, 'image', { fit: 'fill' });
  };

  const onDownload = () => {
    if (!imageProps || !imageProps.src) return;

    const link = document.createElement('a');
    link.href = imageProps.src;
    link.download = imageProps.alt || imageProps.src;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onAlternativeText = () => {};

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])}>
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onFit}
          >
            <RowSpacingIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Fit
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onFill}
          >
            <WidthIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Fill
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
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
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onDownload}
          >
            <DownloadIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Download
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onAlternativeText}
          >
            <TextIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Alt
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { ImageBlockOptions };
