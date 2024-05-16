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
          <button type="button" className="yoopta-block-options-button" onClick={onOpen}>
            <ExternalLinkIcon width={16} height={16} className="yoo-file-w-4 yoo-file-h-4 yoo-file-mr-2" />
            Open
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { FileBlockOptions };
