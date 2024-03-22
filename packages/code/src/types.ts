import { SlateElement } from '@yoopta/editor';

export type CodePluginElements = 'code';
export type CodeElementProps = {
  language?: string;
  theme?: string;
};
export type CodeElement = SlateElement<'code', CodeElementProps>;
