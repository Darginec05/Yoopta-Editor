import { YoptaBaseElement } from '@yoopta/editor';
import { ReactNode } from 'react';

export type HeadingOptions = { anchor?: ReactNode | null | false };

export type HeadingOneElement = YoptaBaseElement<'heading-one'>;
export type HeadingTwoElement = YoptaBaseElement<'heading-two'>;
export type HeadingThreeElement = YoptaBaseElement<'heading-three'>;
