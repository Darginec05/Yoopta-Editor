import { YoBaseElement } from '@yopta/editor';

export type ImageOptions = {
  size: { width: number; height: number };
  caption?: string;
};

export type ImageElement = {
  id: string;
  type: 'image';
  children: [{ text: '' }];
  options: ImageOptions;
  url: string | null | undefined;
  'data-src'?: string | null | undefined;
};
