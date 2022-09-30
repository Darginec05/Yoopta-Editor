export const ELEMENT_TYPES_MAP = {
  'block-quote': 'block-quote',
  'bulleted-list': 'bulleted-list',
  'numbered-list': 'numbered-list',
  'list-item': 'list-item',
  'heading-one': 'heading-one',
  'heading-two': 'heading-two',
  'heading-three': 'heading-three',
  link: 'link',
  image: 'image',
  video: 'video',
  paragraph: 'paragraph',
  callout: 'callout',
};

export const IGNORED_SOFT_BREAK_ELEMS = [
  ELEMENT_TYPES_MAP['bulleted-list'],
  ELEMENT_TYPES_MAP['numbered-list'],
  ELEMENT_TYPES_MAP['list-item'],
];

export const TEXT_ELEMENTS_LIST = [
  ELEMENT_TYPES_MAP['block-quote'],
  ELEMENT_TYPES_MAP['bulleted-list'],
  ELEMENT_TYPES_MAP['numbered-list'],
  ELEMENT_TYPES_MAP['list-item'],
  ELEMENT_TYPES_MAP['heading-one'],
  ELEMENT_TYPES_MAP['heading-two'],
  ELEMENT_TYPES_MAP['heading-three'],
  ELEMENT_TYPES_MAP.link,
  ELEMENT_TYPES_MAP.paragraph,
  ELEMENT_TYPES_MAP.callout,
];
