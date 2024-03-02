import { type SlateElement } from '@yoopta/editor';

type ImageSizes = {
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?: number;
};

type ImageProps = {
  src: string;
  alt: string | null;
  srcSet: string | null;
  fit?: 'contain' | 'cover' | 'fill';
  sizes?: ImageSizes;
};

export type ImageElement = SlateElement<ImageProps>;
