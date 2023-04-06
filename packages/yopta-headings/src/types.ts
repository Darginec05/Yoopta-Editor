export type HeadingElement<T extends 'one' | 'two' | 'three'> = {
  id: string;
  type: `heading-${T}`;
  children: [{ text: '' }];
};

export type HeadingOneElement = HeadingElement<'one'>;
export type HeadingTwoElement = HeadingElement<'two'>;
export type HeadingThreeElement = HeadingElement<'three'>;
