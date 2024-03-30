import { type SlateElement } from '@yoopta/editor';

export type FileElementProps = {
  size: number | null;
  name: string | null;
  src: string | null;
  format: string | null;
};

export type FilePluginElements = 'file';
export type FileElement = SlateElement<'file', FileElementProps>;

export type OnUploadResponse = Partial<FileElementProps> & { src: string };

export type FilePluginOptions = {
  onUpload: (file: File) => Promise<OnUploadResponse>;
  accept?: string;
};
