import { Modify, YooptaBaseElement } from '@yoopta/editor';

export type CodeElementData = {
  language: string;
  filename?: string;
};

export type CodeElement = Modify<YooptaBaseElement<'code'>, { data: CodeElementData; children: CodeChildElement[] }>;

export type CodeChildElement = Modify<
  YooptaBaseElement<'code-line'>,
  { data: { skipSettings: boolean; skipDrag: boolean } }
>;
