import { type SlateElement } from '@yoopta/editor';

export type VideoSizes = {
  width: number;
  height: number;
};

export type VideoElementSettings = {
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
};

export type VideoProviderTypes = 'youtube' | 'vimeo' | 'dailymotion' | string | null;
export type VideoProvider = {
  type: VideoProviderTypes;
  id: string;
  url?: string;
};

export type VideoElementProps = {
  src?: string | null;
  srcSet?: string | null;
  bgColor?: string | null;
  settings?: VideoElementSettings;
  sizes?: VideoSizes;
  provider?: VideoProvider;
  fit?: 'contain' | 'cover' | 'fill' | null;
  poster?: string;
};

export type VideoPluginElements = 'video';
export type VideoElement = SlateElement<'video', VideoElementProps>;

export type OnUploadResponse = Omit<VideoElementProps, 'fit' | 'srcSet'>;

export type VideoPluginOptions = {
  onUpload: (file: File) => Promise<OnUploadResponse>;
  accept?: string;
  maxSizes?: {
    maxWidth?: number;
    maxHeight?: number;
  };
};
