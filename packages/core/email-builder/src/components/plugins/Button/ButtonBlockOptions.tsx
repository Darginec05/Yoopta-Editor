import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { ButtonElementProps, ButtonElementVariant } from './types';
import { BorderSolidIcon } from '@radix-ui/react-icons';
import { CSSProperties } from 'react';
const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: ButtonElementProps;
};

// 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'

const VARIANT_STYLES: Record<ButtonElementVariant, CSSProperties> = {
  default: {
    color: '#EFEFEE',
    backgroundColor: '#000000',
  },
  destructive: {
    color: '#EFEFEE',
    backgroundColor: '#FF0000',
  },
  outline: {
    color: '#000000',
    backgroundColor: '#EFEFEE',
  },
  secondary: {
    color: '#EFEFEE',
    backgroundColor: '#0000FF',
  },
  ghost: {
    color: '#000000',
    backgroundColor: 'transparent',
  },
};

const ButtonBlockOptions = ({ editor, block, props: buttonProps }: Props) => {
  const onChangeVariant = (variant: ButtonElementVariant) => {
    console.log('onChangeVariant:', variant);
    Elements.updateElement(editor, block.id, {
      type: 'button',
      props: {
        variant,
      },
    });
  };

  const isActiveTheme = (variant: ButtonElementVariant) => buttonProps?.variant === variant;

  return (
    <ExtendedBlockActions
      onClick={() => editor.setPath({ current: block.meta.order })}
      className="yoopta-button-options"
    >
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeVariant('default')}
          >
            <span className="flex">
              <BorderSolidIcon
                width={14}
                height={16}
                className="w-4 h-4 mr-2"
                color={buttonProps?.color || '#EFEFEE'}
              />
              Default
            </span>
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeVariant('destructive')}
          >
            <span className="flex">
              <BorderSolidIcon
                width={14}
                height={16}
                className="w-4 h-4 mr-2"
                color={buttonProps?.color || '#EFEFEE'}
              />
              Destructive
            </span>
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeVariant('outline')}
          >
            <span className="flex">
              <BorderSolidIcon
                width={14}
                height={16}
                className="w-4 h-4 mr-2"
                color={buttonProps?.color || '#EFEFEE'}
              />
              Outline
            </span>
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeVariant('secondary')}
          >
            <span className="flex">
              <BorderSolidIcon
                width={14}
                height={16}
                className="w-4 h-4 mr-2"
                color={buttonProps?.color || '#EFEFEE'}
              />
              Secondary
            </span>
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button justify-between"
            onClick={() => onChangeVariant('ghost')}
          >
            <span className="flex">
              <BorderSolidIcon
                width={14}
                height={16}
                className="w-4 h-4 mr-2"
                color={buttonProps?.color || '#EFEFEE'}
              />
              Ghost
            </span>
          </button>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { ButtonBlockOptions };
