import { UI as UI_HELPERS, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { Select } from './Select';
import { THEMES_MAP } from '../utils/themes';

import { Trigger } from '@radix-ui/react-select';
import { LANGUAGES_MAP } from '../utils/languages';
import CopyIcon from '../icons/copy.svg';
import CodeIcon from '../icons/code.svg';
import ThemeIcon from '../icons/theme.svg';
import { CodeElement } from '../types';
import copy from 'copy-to-clipboard';
import { getCodeElementText } from '../utils/element';
import { useState } from 'react';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI_HELPERS;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  element: CodeElement;
};

export const CodeBlockOptions = ({ block, editor, element }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const onChangeTheme = (theme: string) => {
    editor.updateBlock(block.id, { value: [{ ...element, props: { ...element.props, theme } }] });
  };

  const onChangeLanguage = (language: string) => {
    editor.updateBlock(block.id, { value: [{ ...element, props: { ...element.props, language } }] });
  };

  const onCopy = () => {
    const text = getCodeElementText(block);
    copy(text);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-code-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoo-code-rounded-sm hover:yoo-code-bg-[#37352f14] yoo-code-leading-[120%] yoo-code-px-2 yoo-code-py-1.5 yoo-code-mx-[4px] yoo-code-cursor-pointer yoo-code-w-full yoo-code-flex yoo-code-justify-start"
            onClick={onCopy}
          >
            <CopyIcon className="yoo-code-w-4 yoo-code-h-4 yoo-code-mr-2" />
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <Select
            options={Object.keys(THEMES_MAP)
              .map((theme) => ({ value: theme, label: theme }))
              .sort((a, b) => a.label.localeCompare(b.label))}
            onChange={onChangeTheme}
            value={element.props?.theme || 'VSCode'}
          >
            <Trigger className="yoo-code-rounded-sm hover:yoo-code-bg-[#37352f14] yoo-code-leading-[120%] yoo-code-px-2 yoo-code-py-1.5 yoo-code-mx-[4px] yoo-code-cursor-pointer yoo-code-w-full yoo-code-flex yoo-code-justify-start">
              <ThemeIcon className="yoo-code-w-4 yoo-code-h-4 yoo-code-mr-2" />
              Theme
            </Trigger>
          </Select>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <Select
            options={Object.keys(LANGUAGES_MAP)
              .map((key) => ({
                value: LANGUAGES_MAP[key].type,
                label: LANGUAGES_MAP[key].name,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))}
            onChange={onChangeLanguage}
            value={element.props?.language || 'JavaScript'}
          >
            <Trigger className="yoo-code-rounded-sm hover:yoo-code-bg-[#37352f14] yoo-code-leading-[120%] yoo-code-px-2 yoo-code-py-1.5 yoo-code-mx-[4px] yoo-code-cursor-pointer yoo-code-w-full yoo-code-flex yoo-code-justify-start">
              <CodeIcon className="yoo-code-w-4 yoo-code-h-4 yoo-code-mr-2" />
              Language
            </Trigger>
          </Select>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};
