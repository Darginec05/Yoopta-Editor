import { SlateElement } from '@yoopta/editor';

export type PluginElementKeys = 'mention';

export type MentionElementProps = {
  url: string | null;
  target?: string;
  rel?: string;
  character: string | null;
};

export type MentionElement = SlateElement<'mention', MentionElementProps>;
