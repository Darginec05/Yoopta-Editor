import { YooEditor } from '@yoopta/editor';

export type Link = {
  url: string;
  title: string;
  rel?: string;
  target?: string;
};

export type LinkToolRenderProps = {
  editor: YooEditor;
  link: Link;
  onSave: (link: Link) => void;
  onDelete: () => void;
};
