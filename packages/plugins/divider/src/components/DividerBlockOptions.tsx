import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { DividerElementProps, DividerTheme } from '../types';
import SuccessIcon from '../icons/success.svg';
import WarningIcon from '../icons/warning.svg';
import ErrorIcon from '../icons/error.svg';
import DefaultIcon from '../icons/default.svg';
import InfoIcon from '../icons/info.svg';
import CheckmarkIcon from '../icons/checkmark.svg';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: DividerElementProps;
};

const DividerBlockOptions = ({ editor, block, props: dividerProps }: Props) => {
  const onChangeTheme = (theme: DividerTheme) => {
    Elements.updateElement<'divider', DividerElementProps>(editor, block.id, {
      type: 'divider',
      props: {
        theme,
      },
    });
  };

  const isActiveTheme = (theme: DividerTheme) => dividerProps?.theme === theme;

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-divider-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeTheme('solid')}
            style={{
              backgroundColor: isActiveTheme('solid') ? 'transparent' : undefined,
            }}
          >
            <span className="flex">
              <DefaultIcon width={16} height={16} color={'transparent'} className="w-4 h-4 mr-2" />
              Line
            </span>
            {isActiveTheme('solid') && <CheckmarkIcon width={16} height={16} color="#000" className="w-4 h-4" />}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeTheme('dashed')}
            style={{ backgroundColor: isActiveTheme('dashed') ? 'tranparent' : undefined }}
          >
            <span className="flex">
              <InfoIcon width={16} height={16} color={'tranparent'} className="w-4 h-4 mr-2" />
              Dashed
            </span>
            {isActiveTheme('dashed') && <CheckmarkIcon width={16} height={16} color="#000" className="w-4 h-4" />}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeTheme('dotted')}
            style={{
              backgroundColor: isActiveTheme('dotted') ? 'transparent' : undefined,
            }}
          >
            <span className="flex">
              <SuccessIcon width={16} height={16} color={'transparent'} className="w-4 h-4 mr-2" />
              Dotted
            </span>
            {isActiveTheme('dotted') && <CheckmarkIcon width={16} height={16} color="#000" className="w-4 h-4" />}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeTheme('gradient')}
            style={{
              backgroundColor: isActiveTheme('gradient') ? 'transparent' : undefined,
            }}
          >
            <span className="flex">
              <WarningIcon width={16} height={16} color={'transparent'} className="w-4 h-4 mr-2" />
              Gradient
            </span>
            {isActiveTheme('gradient') && <CheckmarkIcon width={16} height={16} color="#000" className="w-4 h-4" />}
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { DividerBlockOptions };
