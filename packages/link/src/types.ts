import { SlateElement } from '@yoopta/editor';

export type LinkPluginElementKeys = 'link';
export type LinkElementProps = {
  url: string | null;
  target?: string;
  rel?: string;
  nodeType: string;
};
export type LinkElement = SlateElement<'link', LinkElementProps>;
