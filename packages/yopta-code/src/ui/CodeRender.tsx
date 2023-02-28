import { ChangeEvent, memo, useEffect, useState } from 'react';
import Prism from 'prismjs';
import s from './CodeRender.module.scss';
import 'prismjs/themes/prism-tomorrow.min.css';

async function highlight(lang: string) {
  await import(`prismjs/components/prism-${lang}`);
  Prism.highlightAll();
}

const langs = ['java', 'javascript', 'csharp', 'go', 'python', 'jsx'];

const CodeRender = ({ element, attributes, children }) => {
  console.log(element);

  const [language, setLanguage] = useState('csharp');

  useEffect(() => {
    highlight(language);
  }, [language]);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    // console.log(ReactEditor.findPath(editor));
  };

  return (
    <code className={s.code} {...attributes}>
      <pre className={`language-${language}`}>{children}</pre>
      <div contentEditable={false}>
        <select onChange={onChange} value={language}>
          {langs.map((lang) => {
            return (
              <option key={lang} value={lang}>
                {lang}
              </option>
            );
          })}
        </select>
      </div>
    </code>
  );
};

CodeRender.displayName = 'Code';

export { CodeRender };
