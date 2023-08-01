import { useEffect } from 'react';
import Prism from 'prismjs';
import { cx, getElementClassname, RenderYooptaElementProps } from '@yoopta/editor';

import 'prism-material-themes/themes/material-default.css';
import { CodeElement } from '../types';
import s from './CodeRender.module.scss';

function CodeRender({ element, attributes, children, HTMLAttributes }: RenderYooptaElementProps<CodeElement>) {
  useEffect(() => {
    console.log('imported for: ', element.data.language);

    import(`prismjs/components/prism-${element.data.language}`)
      .then(() => {
        Prism.highlightAll();
      })
      .catch(console.log);
  }, [element.data.language]);

  return (
    <code
      {...HTMLAttributes}
      className={getElementClassname<CodeElement>({ element, HTMLAttributes, className: s.code })}
      {...attributes}
    >
      {element.data.filename && <span className={s.filename}>{element.data.filename}</span>}
      <pre className={cx(s.pre, `language-${element.data.language}`)}>{children}</pre>
    </code>
  );
}

CodeRender.displayName = 'Code';

export { CodeRender };
