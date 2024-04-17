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
            className="yoo-embed-rounded-sm hover:yoo-embed-bg-[#37352f14] yoo-embed-leading-[120%] yoo-embed-px-2 yoo-embed-py-1.5 yoo-embed-mx-[4px] yoo-embed-cursor-pointer yoo-embed-w-full yoo-embed-flex yoo-embed-justify-start"
            onClick={onOpen}
          >
            <ExternalLinkIcon width={16} height={16} className="yoo-embed-w-4 yoo-embed-h-4 yoo-embed-mr-2" />
            Open
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { EmbedBlockOptions };
