import { ChangeEvent, useEffect } from 'react';
import { Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import cx from 'classnames';
import { CustomEditor } from '@yopta/editor/dist/components/Editor/types';
import s from './CodeRender.module.scss';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';
import 'prism-material-themes/themes/material-default.css';

import { LanguageSelect } from './LanguageSelect';

// [TODO] - make dynamic loading to reduce bundlesize of @yopta/code
// function highlight(lang: string) {
//   import(`prismjs/components/prism-${lang}`).then(() => {
//     Prism.highlightAll();
//     console.log('imported');
//   });
// }

const CodeRender = (editor: CustomEditor) => {
  return function CodeRender({ element, attributes, children }) {
    useEffect(() => {
      Prism.highlightAll();
    }, []);

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const nodePath = ReactEditor.findPath(editor, element);

      Transforms.setNodes(
        editor,
        { language: event.target.value },
        { at: nodePath, match: (n) => Element.isElement(n) && n.type === 'code' },
      );
    };

    return (
      <code className={s.code} {...attributes}>
        <pre className={cx(s.pre, `language-${element.language}`)}>
          {children}
          <LanguageSelect value={element.language} onChange={onChange} />
        </pre>
      </code>
    );
  };
};

CodeRender.displayName = 'Code';

export { CodeRender };
