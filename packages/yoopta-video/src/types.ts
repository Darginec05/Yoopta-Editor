import { Modify, YoptaBaseElement } from '@yoopta/editor';

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
  provider?: VideoProviders | null;
  videoId?: string | null;
};

export type VideoElement = Modify<YoptaBaseElement<'video'>, { data: VideoElementData }>;

export type VideoProviders = 'youtube' | 'vimeo' | 'dailymotion';
