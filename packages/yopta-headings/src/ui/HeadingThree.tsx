import { YoptaComponent } from '@yopta/editor';
import { RenderElementProps } from 'slate-react';
import s from './HeadingThree.module.scss';

const HeadingThreeRender = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <h3 draggable={false} className={s['heading-three']} {...attributes}>
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = new YoptaComponent({
  type: 'heading-three',
  renderer: (editor) => HeadingThreeRender,
  shortcut: 'h3',
});

export { HeadingThree };
