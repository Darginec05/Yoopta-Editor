import { Modify, YoptaBaseElement } from '@yopta/editor';

export type CodeOptions = {
  language: string;
  filename?: string;
};

export type CodeElement = Modify<YoptaBaseElement<'code'>, { data: CodeOptions; children: CodeChildElement[] }>;

export type CodeChildElement = YoptaBaseElement<'code-line'>;
