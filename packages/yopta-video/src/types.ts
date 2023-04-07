import { Modify, YoptaBaseElement } from '@yopta/editor';

export type VideoOptions = {
  size: { width: number; height: number };
  caption?: string;
  url: string | null | undefined;
  'data-src'?: string | null | undefined;
};

export type VideoElement = Modify<YoptaBaseElement<'video'>, { data: VideoOptions }>;
