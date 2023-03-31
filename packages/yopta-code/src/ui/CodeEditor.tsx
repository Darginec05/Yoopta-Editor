import { ChangeEvent, CSSProperties, MouseEvent, useEffect, useState } from 'react';
import { Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { CustomEditor } from '@yopta/editor/dist/components/Editor/types';
import s from './CodeEditor.module.scss';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-scala';
import 'prism-material-themes/themes/material-default.css';

import { LanguageSelect } from './LanguageSelect';
import { cx } from '@yopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { NodeOptions } from '../components/NodeOptions';

const OPTIONS_WIDTH = 265;

const CodeEditor = (editor: CustomEditor) => {
  return function CodeEditor({ element, attributes, children }) {
    const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);

    useEffect(() => {
      Prism.highlightAll();
    }, []);

    const toggleOptionsOpen = (e?: MouseEvent) => {
      e?.stopPropagation();

      if (optionsPos !== null) {
        enableBodyScroll(document.body);
        setOptionsPos(null);
        return;
      }

      const optionsButtonRect = e?.currentTarget?.getBoundingClientRect();

      const UPLOADER_HEIGHT = 164;

      if (optionsButtonRect) {
        const showAtTop = optionsButtonRect.top + optionsButtonRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;

        disableBodyScroll(document.body, { reserveScrollBarGap: true });
        setOptionsPos({
          right: window.innerWidth - optionsButtonRect.right - OPTIONS_WIDTH + optionsButtonRect.width,
          top: showAtTop
            ? optionsButtonRect.top - UPLOADER_HEIGHT - 5
            : optionsButtonRect.top + optionsButtonRect.height + 5,
        });
      }
    };

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
          {/* [TODO] - it could needed feature */}
          <span contentEditable={false} className={s.filename}>
            /code/index.tsx
          </span>
          {children}
          <div className={s.tools} contentEditable={false}>
            <LanguageSelect value={element.language} onChange={onChange} />
            {optionsPos !== null && (
              <NodeOptions key={element.id} onClose={toggleOptionsOpen} style={optionsPos} element={element} />
            )}
            <button type="button" className={s.dotsOptions} onClick={toggleOptionsOpen}>
              <span className={s.dot} />
              <span className={s.dot} />
              <span className={s.dot} />
            </button>
          </div>
        </pre>
      </code>
    );
  };
};

CodeEditor.displayName = 'Code';

export { CodeEditor };
