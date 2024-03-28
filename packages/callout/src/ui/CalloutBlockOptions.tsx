import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import SuccessIcon from '../icons/success.svg';
import WarningIcon from '../icons/warning.svg';
import ErrorIcon from '../icons/error.svg';
import DefaultIcon from '../icons/default.svg';
import InfoIcon from '../icons/info.svg';
import { CalloutElementProps, CalloutPluginElementKeys, CalloutTheme } from '../types';
import { CALLOUT_THEME_STYLES } from '../utils';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: CalloutElementProps;
};

const CalloutBlockOptions = ({ editor, block, props: calloutProps }: Props) => {
  const onChangeTheme = (theme: CalloutTheme) => {
    editor.blocks.Callout.updateElement<CalloutPluginElementKeys, CalloutElementProps>(block.id, 'callout', {
      theme,
    });
  };

  const isActiveTheme = (theme: CalloutTheme) => calloutProps?.theme === theme;

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-callout-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-callout-rounded-sm hover:yoo-callout-bg-[#37352f14] yoo-callout-leading-[120%] yoo-callout-px-2 yoo-callout-py-1.5 yoo-callout-mx-[4px] yoo-callout-cursor-pointer yoo-callout-w-full yoo-callout-flex yoo-callout-justify-start"
            onClick={() => onChangeTheme('default')}
            style={{
              backgroundColor: isActiveTheme('default') ? CALLOUT_THEME_STYLES.default.backgroundColor : undefined,
            }}
          >
            <DefaultIcon
              width={16}
              height={16}
              color={CALLOUT_THEME_STYLES.default.color}
              className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
            />
            Default
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-callout-rounded-sm hover:yoo-callout-bg-[#37352f14] yoo-callout-leading-[120%] yoo-callout-px-2 yoo-callout-py-1.5 yoo-callout-mx-[4px] yoo-callout-cursor-pointer yoo-callout-w-full yoo-callout-flex yoo-callout-justify-start"
            onClick={() => onChangeTheme('info')}
            style={{ backgroundColor: isActiveTheme('info') ? CALLOUT_THEME_STYLES.info.backgroundColor : undefined }}
          >
            <InfoIcon
              width={16}
              height={16}
              color={CALLOUT_THEME_STYLES.info.color}
              className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
            />
            Info
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-callout-rounded-sm hover:yoo-callout-bg-[#37352f14] yoo-callout-leading-[120%] yoo-callout-px-2 yoo-callout-py-1.5 yoo-callout-mx-[4px] yoo-callout-cursor-pointer yoo-callout-w-full yoo-callout-flex yoo-callout-justify-start"
            onClick={() => onChangeTheme('success')}
            style={{
              backgroundColor: isActiveTheme('success') ? CALLOUT_THEME_STYLES.success.backgroundColor : undefined,
            }}
          >
            <SuccessIcon
              width={16}
              height={16}
              color={CALLOUT_THEME_STYLES.success.color}
              className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
            />
            Success
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-callout-rounded-sm hover:yoo-callout-bg-[#37352f14] yoo-callout-leading-[120%] yoo-callout-px-2 yoo-callout-py-1.5 yoo-callout-mx-[4px] yoo-callout-cursor-pointer yoo-callout-w-full yoo-callout-flex yoo-callout-justify-start"
            onClick={() => onChangeTheme('warning')}
            style={{
              backgroundColor: isActiveTheme('warning') ? CALLOUT_THEME_STYLES.warning.backgroundColor : undefined,
            }}
          >
            <WarningIcon
              width={16}
              height={16}
              color={CALLOUT_THEME_STYLES.warning.color}
              className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
            />
            Warning
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-callout-rounded-sm hover:yoo-callout-bg-[#37352f14] yoo-callout-leading-[120%] yoo-callout-px-2 yoo-callout-py-1.5 yoo-callout-mx-[4px] yoo-callout-cursor-pointer yoo-callout-w-full yoo-callout-flex yoo-callout-justify-start"
            onClick={() => onChangeTheme('error')}
            style={{ backgroundColor: isActiveTheme('error') ? CALLOUT_THEME_STYLES.error.backgroundColor : undefined }}
          >
            <ErrorIcon
              width={16}
              height={16}
              color={CALLOUT_THEME_STYLES.error.color}
              className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
            />
            Error
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { CalloutBlockOptions };
