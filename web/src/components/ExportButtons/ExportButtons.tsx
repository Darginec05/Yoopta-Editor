import { html, markdown } from '@yoopta/exports';
import { YooptaValue } from '@/utils/initialData';
import { YooptaPlugin } from '@yoopta/editor';
import s from './ExportButtons.module.scss';
import { useState } from 'react';

type Props = {
  editorValue: YooptaValue[];
  plugins: YooptaPlugin<any, any>[];
  onChange: (val: YooptaValue[]) => void;
  offlineKey: string;
};

const ExportButtons = ({ editorValue, plugins, onChange, offlineKey }: Props) => {
  const [htmlString, setHtmlString] = useState<string>('');

  const handleImportHTML = () => {
    if (htmlString?.length === 0) return alert('Paste into textarea html string ');
    const yooptaData = html.deserialize(htmlString, plugins);

    onChange(yooptaData);
    localStorage.setItem(offlineKey, JSON.stringify(yooptaData));
    window.location.reload();
  };

  return (
    <div className={s.root}>
      <div>
        <div className={s.buttons}>
          <ul className={s.buttonList}>
            <li className={s.buttonListItem}>
              <button
                className={s.button}
                type="button"
                onClick={() => console.log(markdown.serialize(editorValue, plugins))}
              >
                Export to markdown
              </button>
              <span>
                - Click to export to Markdown, check browser console, copy markdown and try it in{' '}
                <a href="https://markdownlivepreview.com/" target="_blank" rel="noopener noreferrer">
                  markdownlivepreview
                </a>
              </span>
            </li>
            <li className={s.buttonListItem}>
              <button
                className={s.button}
                type="button"
                onClick={() => console.log(html.serialize(editorValue, plugins))}
              >
                Export to HTML
              </button>
              <span>
                - Click to export to HTML, check browser console, copy html string and paste it in{' '}
                <a href="https://codesandbox.io/s/vanilla" target="_blank" rel="noopener noreferrer">
                  codesandbox
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className={s.buttons}>
          <ul className={s.buttonList}>
            <li className={s.buttonListItem}>
              <button className={s.button} type="button" onClick={() => alert('This import is in work in progress')}>
                Import Markdown(WIP)
              </button>
              <span>- Work in progress</span>
            </li>
            <li className={s.buttonListItem}>
              <button className={s.button} type="button" onClick={handleImportHTML}>
                Import HTML
              </button>
              <span>
                - Paste into textarea <strong>html string</strong> and then click this button
              </span>
              <div>
                <textarea
                  placeholder="Paste HTML string"
                  className={s.textarea}
                  value={htmlString}
                  onChange={(e) => setHtmlString(e.target.value)}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr className={s.hr} />
    </div>
  );
};

export { ExportButtons };
