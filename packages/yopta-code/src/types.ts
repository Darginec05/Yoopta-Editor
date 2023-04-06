export type CodeOptions = {
  language: string;
};

export type CodeElement = {
  id: string;
  type: 'code';
  children: CodeChildElement[];
  options: CodeOptions;
};

export type CodeChildElement = {
  id: string;
  type: 'code-line';
  children: [{ text: '' }];
};
