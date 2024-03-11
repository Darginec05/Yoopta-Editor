import { type SlateElement } from '@yoopta/editor';

export type EmbedSizes = {
  width: number;
  height: number;
};

export type EmbedProviderTypes = 'youtube' | 'vimeo' | 'dailymotion' | 'twitter' | 'figma' | string | null;
export type EmbedProvider = {
  type: EmbedProviderTypes;
  id: string;
  url?: string;
};

export type EmbedElementProps = {
  sizes?: EmbedSizes;
  provider?: EmbedProvider;
};

export type EmbedPluginElements = 'embed';
export type EmbedElement = SlateElement<'embed', EmbedElementProps>;

export type EmbedPluginOptions = {
  maxSizes?: {
    maxWidth?: number;
    maxHeight?: number;
  };
};
