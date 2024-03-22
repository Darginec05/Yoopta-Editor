import { UI as UI_HELPERS, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { Select } from './Select';
import { themes } from '../utils/themes';

import { Trigger } from '@radix-ui/react-select';
import { LANGUAGES } from '../utils/languages';
import CopyIcon from '../icons/copy.svg';
import CodeIcon from '../icons/code.svg';
import ThemeIcon from '../icons/theme.svg';
import { CodeElement } from '../types';
import copy from 'copy-to-clipboard';
import { getCodeElementText } from '../utils/element';
import { useState } from 'react';

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

  return null;
};
