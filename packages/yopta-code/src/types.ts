import { YoBaseElement } from '@yopta/editor';

export type CodeOptions = {
  language: string;
  filename?: string;
};

export type CodeElement = YoBaseElement<'code', CodeChildElement[]> & { options: CodeOptions };

export type CodeChildElement = {
  id: string;
  type: 'code-line';
  children: [{ text: '' }];
};
