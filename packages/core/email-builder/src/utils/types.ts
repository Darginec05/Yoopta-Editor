import { EmailTemplateOptions, YooEditor, YooptaEditorProps } from '@yoopta/editor';
import { FileUploadResponse } from '@yoopta/file';
import { ImageUploadResponse } from '@yoopta/image';
import { VideoUploadResponse } from '@yoopta/video';

export type MediaUploadsFn = {
  image?: {
    upload: (file: File) => Promise<ImageUploadResponse>;
  };
  video?: {
    upload: (file: File) => Promise<VideoUploadResponse>;
    uploadPoster?: (file: File) => Promise<string>;
  };
  file?: {
    upload: (file: File) => Promise<FileUploadResponse>;
  };
};

export type EmailProps = {
  id?: YooptaEditorProps['id'];
  editor: YooptaEmailEditor;
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

export type EmailView = 'editor' | 'preview';

export type YooptaEmailEditor = YooEditor & {
  emailTemplate: EmailTemplateOptions;
};
