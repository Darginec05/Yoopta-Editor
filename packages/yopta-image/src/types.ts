import { YoptaBaseElement, Modify } from '@yopta/editor';

export type ImageUploadResponse = {
  url: string;
  width: number;
  height: number;
  srcSet?: string[];
};

export type ImagePluginOptions = {
  maxWidth?: number;
  maxHeight?: number;
  accept?: string | undefined;
  onUpload: (file: File) => Promise<ImageUploadResponse>;
};

export type ImageElementData = {
  size: { width: number | 'auto'; height: number | 'auto' };
  caption?: string;
  url: string | null | undefined;
  'data-src'?: string | null | undefined;
};

export type ImageElement = Modify<YoptaBaseElement<'image'>, { data: ImageElementData }>;
