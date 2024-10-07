import { SlateElement } from '@yoopta/editor';

export type LinkPluginElementKeys = 'link';
export type LinkElementProps = {
  url: string | null;
  target?: string;
  rel?: string;
  nodeType: string;
  title?: string | null;
};
export type LinkElement = SlateElement<'link', LinkElementProps>;

export type LinkElementMap = {
  link: LinkElement;
};
