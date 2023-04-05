import { useEffect } from 'react';
import Prism from 'prismjs';
import { cx } from '@yopta/editor';

import 'prism-material-themes/themes/material-default.css';
import s from './CodeRender.module.scss';

function CodeRender({ element, attributes, children }) {
  useEffect(() => {
    import(`prismjs/components/prism-${element.options.language}`).then(() => {
      Prism.highlightAll();
      console.log('imported for: ', element.options.language);
    });
  }, [element.options.language]);

  return (
    <code className={s.code} {...attributes}>
      {element.options.filename && <span className={s.filename}>{element.options.filename}</span>}
      <pre className={cx(s.pre, `language-${element.options.language}`)}>
        <span contentEditable={false} className={s.filename}>
          {element.filename || '/code/index.tsx'}
        </span>
        {children}
      </pre>
    </code>
  );
}

CodeRender.displayName = 'Code';

export { CodeRender };
