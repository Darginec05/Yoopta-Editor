import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type BlockQuoteElement = { id: string; type: 'block-quote'; children: Descendant[] };

export type BulletedListElement = {
  id: string;
  type: 'bulleted-list';
  children: Descendant[];
};

export type CheckListItemElement = {
  id: string;
  type: 'check-list-item';
  checked: boolean;
  children: Descendant[];
};

export type NumberedListElement = {
  id: string;
  type: 'numbered-list';
  children: Descendant[];
};

export type EditableVoidElement = {
  id: string;
  type: 'editable-void';
  children: EmptyText[];
};

export type HeadingElement = { id: string; type: 'heading'; children: Descendant[] };

export type HeadingTwoElement = { id: string; type: 'heading-two'; children: Descendant[] };

export type ImageElement = {
  id: string;
  type: 'image';
  src: string | ArrayBuffer | null;
  'data-src'?: string | ArrayBuffer | null;
  children: EmptyText[];
};

export type LinkElement = { id: string; type: 'link'; url: string; children: Descendant[] };

export type ButtonElement = { id: string; type: 'button'; children: Descendant[] };

export type ListItemElement = { id: string; type: 'list-item'; children: Descendant[] };

export type MentionElement = {
  id: string;
  type: 'mention';
  character: string;
  children: CustomText[];
};

export type ParagraphElement = { id: string; type: 'paragraph'; children: Descendant[] };

export type TitleElement = { id: string; type: 'title'; children: Descendant[] };

export type VideoElement = {
  id: string;
  type: 'video';
  url: string;
  children: EmptyText[];
};

export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | NumberedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | ListItemElement
  | MentionElement
  | ParagraphElement
  | TitleElement
  | VideoElement;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
