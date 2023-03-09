import { YoptaComponent } from '@yopta/editor';
import { RenderElementProps } from 'slate-react';
import s from './HeadingOne.module.scss';

const HeadingRender = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <h1 draggable={false} className={s['heading-one']} {...attributes}>
      {children}
    </h1>
  );
};

HeadingRender.displayName = 'HeadingOne';

const HeadingOne = new YoptaComponent({
  type: 'heading-one',
  renderer: (editor) => HeadingRender,
});

export { HeadingOne };
