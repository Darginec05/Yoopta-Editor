import { YoptaComponent } from '@yopta/editor';
import { RenderElementProps } from 'slate-react';
import s from './HeadingTwo.module.scss';

const HeadingTwoRender = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <h2 draggable={false} className={s['heading-two']} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = new YoptaComponent({
  type: 'heading-two',
  renderer: (editor) => HeadingTwoRender,
});

export { HeadingTwo };
