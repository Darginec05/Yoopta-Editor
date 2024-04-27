import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { FileElementProps } from '../types';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: FileElementProps;
};

const FileBlockOptions = ({ editor, block, props: fileProps }: Props) => {
  const onOpen = () => {
    if (!fileProps?.src) return;
    window.open(fileProps?.src, '_blank');
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])}>
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-file-rounded-sm hover:yoo-file-bg-[#37352f14] yoo-file-leading-[120%] yoo-file-px-2 yoo-file-py-1.5 yoo-file-mx-[4px] yoo-file-cursor-pointer yoo-file-w-full yoo-file-flex yoo-file-justify-start"
            onClick={onOpen}
          >
            <ExternalLinkIcon width={16} height={16} className="yoo-file-w-4 yoo-file-h-4 yoo-file-mr-2" />
            Open
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { FileBlockOptions };
