import { YooptaBaseElement, Modify, YooptaPluginBaseOptions } from '@yoopta/editor';

export type FileUploadResponse = {
  url: string;
  preview?: string;
};

export type FilePluginOptions = {
  accept?: string | undefined;
  onUpload: (file: File) => Promise<FileUploadResponse>;
} & YooptaPluginBaseOptions;

export type FileElementData = {
  'data-url'?: string | null | undefined;
  url: string | null | undefined;
  name: string;
  size: number;
};

export type FileElement = Modify<YooptaBaseElement<'file'>, { data: FileElementData }>;
