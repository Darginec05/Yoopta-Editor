import { HeadingOneElement, HeadingThreeElement, HeadingTwoElement } from '../types';

export const getHeadingAnchorFromSlateNode = (
  element: HeadingOneElement | HeadingTwoElement | HeadingThreeElement,
): string | undefined => {
  let textString = '';
  element.children.forEach((child: any) => {
    if (typeof child.text === 'string') {
      textString += child.text;
    }
  });

  const validatedString = textString.toLowerCase().trim().replace(/\s/g, '-');

  return validatedString;
};
