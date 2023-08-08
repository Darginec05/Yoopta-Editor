import { yooptaInitData, YooptaValue } from '@/utils/initialData';
import { generateId } from '@yoopta/editor';
import { useState } from 'react';
import WithDarkTheme from './withDarkTheme';

const INITIAL_VALUE: YooptaValue[] = [
  {
    id: generateId(),
    type: 'heading-three',
    children: [
      {
        text: 'Example with custom html attributes for render components',
      },
    ],
    nodeType: 'block',
  },
  {
    id: generateId(),
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Check the source code to see how easily you can pass any html attribute, such as classname, spellcheck, etc. using ',
      },
      {
        text: '.extend',
        bold: true,
      },
      {
        text: ' function',
      },
    ],
  },
  ...yooptaInitData,
];

export default function WithCustomHTMLAttributes() {
  const [value, setValue] = useState<YooptaValue[]>(INITIAL_VALUE);
  const onChange = (data: YooptaValue[]) => setValue(data);

  return <WithDarkTheme value={value} onChange={onChange} localStorageName="withCustomHTMLAttributes" />;
}
