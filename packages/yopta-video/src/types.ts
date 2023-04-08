import { Modify, YoptaBaseElement } from '@yopta/editor';

export type VideoUploadResponse = {
  url: string;
  width: number;
  height: number;
  srcSet?: string[];
};

export type VideoPluginOptions = {
  maxWidth?: number;
  maxHeight?: number;
  onUpload: (file: File) => Promise<VideoUploadResponse>;
};

export type VideoElementData = {
  size: { width: number | 'auto'; height: number | 'auto' };
  caption?: string;
  url: string | null | undefined;
  'data-src'?: string | null | undefined;
  provider?: null | string;
};

export type VideoElement = Modify<YoptaBaseElement<'video'>, { data: VideoElementData }>;
