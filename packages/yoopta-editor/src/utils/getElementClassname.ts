import { HTMLAttributes } from 'react';
import cx from 'classnames';
import { YooptaBaseElement } from '../types';

type Params<T> = {
  element: T;
  HTMLAttributes?: HTMLAttributes<HTMLElement>;
  className: string;
};

export function getElementClassname<T>(params: Params<T>): string {
  const { element, HTMLAttributes, className } = params;

  return `yoopta-${element.type} ${HTMLAttributes?.className || ''} ${className}`;
}
