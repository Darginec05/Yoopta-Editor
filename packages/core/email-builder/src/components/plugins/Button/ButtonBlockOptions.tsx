import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { ButtonElement, ButtonElementProps, ButtonElementSize, ButtonElementVariant } from './types';
import { CSSProperties } from 'react';
import { Select, SelectTrigger } from '../../ui/select';
import { PaletteIcon, RulerIcon } from 'lucide-react';
const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: ButtonElementProps;
  element: ButtonElement;
};

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

const SIZE_STYLES: Record<ButtonElementSize, CSSProperties> = {
  default: {
    padding: '0.5rem 1rem',
  },
  sm: {
    padding: '0.25rem 0.5rem',
  },
  lg: {
    padding: '0.75rem 1.5rem',
  },
};

const ButtonBlockOptions = ({ editor, block, element, props: buttonProps }: Props) => {
  const onChangeVariant = (variant: string) => {
    Elements.updateElement(editor, block.id, {
      type: 'button',
      props: {
        variant,
      },
    });
  };
  const onChangeSize = (size: string) => {
    Elements.updateElement(editor, block.id, {
      type: 'button',
      props: {
        size,
      },
    });
  };

  return (
    <ExtendedBlockActions
      onClick={() => editor.setPath({ current: block.meta.order })}
      className="yoopta-button-options"
    >
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <Select
            className="select-button-theme"
            options={Object.keys(VARIANT_STYLES)
              .map((key) => ({
                value: key,
                label: key,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))}
            onChange={onChangeVariant}
            value={buttonProps?.variant || 'default'}
          >
            <SelectTrigger className="yoopta-block-options-button">
              <PaletteIcon className="w-4 h-4 mr-2" />
              Variants
            </SelectTrigger>
          </Select>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <Select
            className="select-button-size"
            options={Object.keys(SIZE_STYLES)
              .map((key) => ({
                value: key,
                label: key,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))}
            onChange={onChangeSize}
            value={buttonProps?.size || 'default'}
          >
            <SelectTrigger className="yoopta-block-options-button">
              <RulerIcon className="w-4 h-4 mr-2" />
              Size
            </SelectTrigger>
          </Select>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { ButtonBlockOptions };
