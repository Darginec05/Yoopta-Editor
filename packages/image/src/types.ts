import { type SlateElement } from '@yoopta/editor';

export type ImageSizes = {
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?: number;
};

export type ImageElementProps = {
  src: string | null;
  alt: string | null;
  srcSet: string | null;
  fit?: 'contain' | 'cover' | 'fill' | null;
  sizes?: ImageSizes;
};

export type ImagePluginElements = 'image';
export type ImageElement = SlateElement<'image', ImageElementProps>;

type onUploadResponse = Omit<ImageElementProps, 'fit' | 'srcSet'>;

export type ImagePluginOptions = {
  onUpload: (file: File) => Promise<onUploadResponse>;
  accept?: string;
  deviceSizes?: number[];
};
