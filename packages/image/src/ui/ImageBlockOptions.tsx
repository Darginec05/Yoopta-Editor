import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { RowSpacingIcon, SizeIcon, WidthIcon, DownloadIcon } from '@radix-ui/react-icons';
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

  // const onAlternativeText = () => {};

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-image-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-image-rounded-sm hover:yoo-image-bg-[#37352f14] yoo-image-leading-[120%] yoo-image-px-2 yoo-image-py-1.5 yoo-image-mx-[4px] yoo-image-cursor-pointer yoo-image-w-full yoo-image-flex yoo-image-justify-start"
            onClick={onFit}
          >
            <RowSpacingIcon width={16} height={16} className="yoo-image-w-4 yoo-image-h-4 yoo-image-mr-2" />
            Fit
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-image-rounded-sm hover:yoo-image-bg-[#37352f14] yoo-image-leading-[120%] yoo-image-px-2 yoo-image-py-1.5 yoo-image-mx-[4px] yoo-image-cursor-pointer yoo-image-w-full yoo-image-flex yoo-image-justify-start"
            onClick={onFill}
          >
            <WidthIcon width={16} height={16} className="yoo-image-w-4 yoo-image-h-4 yoo-image-mr-2" />
            Fill
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-image-rounded-sm hover:yoo-image-bg-[#37352f14] yoo-image-leading-[120%] yoo-image-px-2 yoo-image-py-1.5 yoo-image-mx-[4px] yoo-image-cursor-pointer yoo-image-w-full yoo-image-flex yoo-image-justify-start"
            onClick={onCover}
          >
            <SizeIcon width={16} height={16} className="yoo-image-w-4 yoo-image-h-4 yoo-image-mr-2" />
            Cover
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
      <BlockOptionsSeparator />

      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-image-rounded-sm hover:yoo-image-bg-[#37352f14] yoo-image-leading-[120%] yoo-image-px-2 yoo-image-py-1.5 yoo-image-mx-[4px] yoo-image-cursor-pointer yoo-image-w-full yoo-image-flex yoo-image-justify-start"
            onClick={onDownload}
          >
            <DownloadIcon width={16} height={16} className="yoo-image-w-4 yoo-image-h-4 yoo-image-mr-2" />
            Download
          </button>
        </BlockOptionsMenuItem>
        {/* <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-image-rounded-sm hover:yoo-image-bg-[#37352f14] yoo-image-leading-[120%] yoo-image-px-2 yoo-image-py-1.5 yoo-image-mx-[4px] yoo-image-cursor-pointer yoo-image-w-full yoo-image-flex yoo-image-justify-start"
            onClick={onAlternativeText}
          >
            <TextIcon width={16} height={16} className="yoo-image-w-4 yoo-image-h-4 yoo-image-mr-2" />
            Alt
          </button>
        </BlockOptionsMenuItem> */}
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { ImageBlockOptions };
