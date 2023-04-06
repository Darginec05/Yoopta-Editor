import { HeadingOne } from './ui/HeadingOne';
import { HeadingTwo } from './ui/HeadingTwo';
import { HeadingThree } from './ui/HeadingThree';
import { YoEditor } from '@yopta/editor';
import { HeadingOneElement, HeadingThreeElement, HeadingTwoElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: HeadingOneElement | HeadingTwoElement | HeadingThreeElement;
  }
}

const Headings = {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
};

export default Headings;
export { HeadingOne, HeadingTwo, HeadingThree, HeadingOneElement, HeadingTwoElement, HeadingThreeElement };
