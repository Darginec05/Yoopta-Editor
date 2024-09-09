import { type SlateElement } from '@yoopta/editor';
import { RenderElementProps } from 'slate-react';

export type EmbedSizes = {
  width: number | 'auto';
  height: number | 'auto';
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

export type ProviderRenderProps = {
  provider: EmbedProvider;
  blockId: string;
  width: number;
  height: number;
} & Pick<RenderElementProps, 'attributes' | 'children'>;

export type EmbedElementMap = {
  embed: EmbedElement;
};
