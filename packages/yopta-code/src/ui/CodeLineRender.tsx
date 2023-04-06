import { RenderElementProps } from '@yopta/editor';
import { CodeChildElement } from '../types';

const CodeLineRender = () => {
  return function CodeLineRender({ attributes, children }: RenderElementProps<CodeChildElement>) {
    return <div {...attributes}>{children}</div>;
  };
};

export { CodeLineRender };
