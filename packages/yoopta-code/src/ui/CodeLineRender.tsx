import { RenderYooptaElementProps } from '@yoopta/editor';
import { CodeChildElement } from '../types';

const CodeLineRender = () => {
  return function CodeLineRender({ attributes, children }: RenderYooptaElementProps<CodeChildElement>) {
    return <div {...attributes}>{children}</div>;
  };
};

export { CodeLineRender };
