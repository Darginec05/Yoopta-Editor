import { type SlateElement } from '@yoopta/editor';

export type ImageSizes = {
  width: number;
  height: number;
};

export type ImageElementProps = {
  src?: string | null;
  alt?: string | null;
  srcSet?: string | null;
  bgColor?: string | null;
  fit?: 'contain' | 'cover' | 'fill' | null;
  sizes?: ImageSizes;
};

export type ImagePluginElements = 'image';
export type ImageElement = SlateElement<'image', ImageElementProps>;

export type OnUploadResponse = Omit<ImageElementProps, 'srcSet'>;

export type ImageOptimizationFields = {
  deviceSizes?: number[];
  provider?: 'imgix' | 'cloudinary' | 'akamai';
};

export type ImagePluginOptions = {
  onUpload: (file: File) => Promise<OnUploadResponse>;
  accept?: string;
  optimizations?: ImageOptimizationFields;
  maxSizes?: {
    maxWidth?: number;
    maxHeight?: number;
  };
};
