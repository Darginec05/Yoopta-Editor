import { useEffect } from 'react';
import Prism from 'prismjs';
import { cx } from '@yopta/editor';

import 'prism-material-themes/themes/material-default.css';
import s from './CodeRender.module.scss';

function CodeRender({ element, attributes, children }) {
  useEffect(() => {
    import(`prismjs/components/prism-${element.language}`).then(() => {
      Prism.highlightAll();
      console.log('imported for: ', element.language);
    });
  }, [element.language]);

  return (
    <code className={s.code} {...attributes}>
      <pre className={cx(s.pre, `language-${element.language}`)}>
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
