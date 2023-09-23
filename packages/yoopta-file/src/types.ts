import { YooptaBaseElement, Modify, YooptaPluginBaseOptions } from '@yoopta/editor';

export type FileUploadResponse = {
  url: string;
  width: number;
  height: number;
  srcSet?: string[];
};

export type FilePluginOptions = {
  maxWidth?: number;
  maxHeight?: number;
  accept?: string | undefined;
  onUpload: (file: File) => Promise<FileUploadResponse>;
} & YooptaPluginBaseOptions;

export type FileElementData = {
  url: string | null | undefined;
  name: string;
  size: number;
};

export type FileElement = Modify<YooptaBaseElement<'file'>, { data: FileElementData }>;
