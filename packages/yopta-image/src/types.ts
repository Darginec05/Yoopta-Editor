import { YoptaBaseElement, Modify } from '@yopta/editor';

export type ImageOptions = {
  size: { width: number; height: number };
  caption?: string;
  url: string | null | undefined;
  'data-src'?: string | null | undefined;
};

export type ImageElement = Modify<YoptaBaseElement<'image'>, { data: ImageOptions }>;
