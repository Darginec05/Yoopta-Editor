import { type SlateElement } from '@yoopta/editor';

export type VideoSizes = {
  width: number;
  height: number;
};

export type VideoElementProps = {
  src?: string | null;
  alt?: string | null;
  srcSet?: string | null;
  bgColor?: string | null;
  fit?: 'contain' | 'cover' | 'fill' | null;
  sizes?: VideoSizes;
};

export type VideoPluginElements = 'video';
export type VideoElement = SlateElement<'video', VideoElementProps>;

export type onUploadResponse = Omit<VideoElementProps, 'fit' | 'srcSet'>;

export type VideoOptimizationFields = {
  deviceSizes?: number[];
  provider?: 'imgix' | 'cloudinary' | 'akamai';
};

export type VideoPluginOptions = {
  onUpload: (file: File) => Promise<onUploadResponse>;
  accept?: string;
  optimizations?: VideoOptimizationFields;
  maxSizes?: {
    maxWidth?: number;
    maxHeight?: number;
  };
};
