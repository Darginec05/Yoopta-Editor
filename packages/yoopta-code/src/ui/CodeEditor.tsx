import { ChangeEvent, CSSProperties, MouseEvent, useEffect, useState } from 'react';
import { Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
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
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-scala';
import 'prism-material-themes/themes/material-default.css';

import { LanguageSelect } from './LanguageSelect';
import { cx, RenderYooptaElementProps, YooEditor, UI_HELPERS, getElementClassname } from '@yoopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CodeElement } from '../types';

const OPTIONS_WIDTH = 265;

const CodeEditor = (editor: YooEditor) => {
  return function CodeEditor({ element, attributes, children, HTMLAttributes }: RenderYooptaElementProps<CodeElement>) {
    const [optionsPos, setOptionsPos] = useState<CSSProperties | null>(null);
    useEffect(() => {
      Prism.highlightAll(true);
    }, [element.data.language]);

    const closeOptions = () => {
      enableBodyScroll(document.body);
      setOptionsPos(null);
    };

    const toggleOptionsOpen = (e?: MouseEvent) => {
      e?.stopPropagation();

      if (optionsPos !== null) {
        return closeOptions();
      }

      const optionsButtonRect = e?.currentTarget?.getBoundingClientRect();

      const UPLOADER_HEIGHT = 164;

      if (optionsButtonRect) {
        const showAtTop = optionsButtonRect.top + optionsButtonRect.height + UPLOADER_HEIGHT + 20 > window.innerHeight;

        disableBodyScroll(document.body, { reserveScrollBarGap: true });

        setOptionsPos({
          left:
            optionsButtonRect.right - optionsButtonRect.width + OPTIONS_WIDTH > window.innerWidth
              ? window.innerWidth - OPTIONS_WIDTH - optionsButtonRect.width
              : optionsButtonRect.right - optionsButtonRect.width,
          top: showAtTop
            ? optionsButtonRect.top - UPLOADER_HEIGHT - 5
            : optionsButtonRect.top + optionsButtonRect.height + 5,
        });
      }
    };

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const nodePath = ReactEditor.findPath(editor, element);

      Transforms.setNodes<CodeElement>(
        editor,
        { data: { language: event.target.value } },
        { at: nodePath, match: (n) => Element.isElement(n) && n.type === 'code' },
      );
    };

    return (
      <code
        {...attributes}
        {...HTMLAttributes}
        className={getElementClassname<CodeElement>({ element, HTMLAttributes, className: s.code })}
      >
        <pre className={cx(s.pre, `language-${element.data.language}`)}>
          {/* [TODO] - it could needed feature */}
          {children}
        </pre>
        <div className={s.tools} contentEditable={false}>
          {/* <button type="button" className={s.copy}>
            Copy
          </button> */}
          <LanguageSelect value={element.data.language} onChange={onChange} />
          {optionsPos !== null && (
            <UI_HELPERS.ElementOptions
              key={element.id}
              onClose={closeOptions}
              style={optionsPos}
              element={element}
              onCopy={closeOptions}
              onDelete={closeOptions}
              onDuplicate={closeOptions}
            />
          )}
          <button type="button" className={s.dotsOptions} onClick={toggleOptionsOpen}>
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.dot} />
          </button>
        </div>
      </code>
    );
  };
};

CodeEditor.displayName = 'Code';

export { CodeEditor };
