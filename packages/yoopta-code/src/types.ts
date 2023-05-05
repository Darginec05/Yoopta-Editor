import { Modify, YooptaBaseElement } from '@yoopta/editor';

export type CodeOptions = {
  language: string;
  filename?: string;
};

export type CodeElement = Modify<YooptaBaseElement<'code'>, { data: CodeOptions; children: CodeChildElement[] }>;

export type CodeChildElement = Modify<
  YooptaBaseElement<'code-line'>,
  { data: { skipSettings: boolean; skipDrag: boolean } }
>;
