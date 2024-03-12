import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { EmbedElementProps } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: EmbedElementProps;
};

const EmbedBlockOptions = ({ editor, block, props: embedProps }: Props) => {
  const onOpen = () => {
    window.open(embedProps?.provider?.url, '_blank');
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])}>
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
            onClick={onOpen}
          >
            <ExternalLinkIcon width={16} height={16} className="w-4 h-4 mr-2" />
            Open
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { EmbedBlockOptions };
