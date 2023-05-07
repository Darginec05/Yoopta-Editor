import { YooptaBaseElement } from '@yoopta/editor';
import { ReactNode } from 'react';

export type HeadingOptions = { anchor?: ReactNode | null | false };

export type HeadingOneElement = YooptaBaseElement<'heading-one'>;
export type HeadingTwoElement = YooptaBaseElement<'heading-two'>;
export type HeadingThreeElement = YooptaBaseElement<'heading-three'>;
