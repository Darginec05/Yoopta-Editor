import { YooptaEditorProps } from '@yoopta/editor';
import { FileUploadResponse } from '@yoopta/file';
import { ImageUploadResponse } from '@yoopta/image';
import { VideoUploadResponse } from '@yoopta/video';

export type MediaUploadsFn = {
  imageUpload?: (file: File) => Promise<ImageUploadResponse>;
  videoUpload?: (file: File) => Promise<VideoUploadResponse>;
  fileUpload?: (file: File) => Promise<FileUploadResponse>;
};

export type EmailBuilderProps = {
  id?: YooptaEditorProps['id'];
  editor?: YooptaEditorProps['editor'];
  value: Required<YooptaEditorProps>['value'];
  onChange: Required<YooptaEditorProps>['onChange'];
  readOnly?: YooptaEditorProps['readOnly'];
  autoFocus?: YooptaEditorProps['autoFocus'];
  className?: YooptaEditorProps['className'];
  placeholder?: YooptaEditorProps['placeholder'];
  style?: YooptaEditorProps['style'];
  selectionBoxRoot?: YooptaEditorProps['selectionBoxRoot'];
  media?: MediaUploadsFn;
};
