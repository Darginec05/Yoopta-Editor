import type { Key, ReactNode } from 'react';
import type { Descendant } from 'slate';
import type { LOCAL_STORAGE_NAME_TYPE } from './utils/storage';
import type { YoptaBaseElement } from './types';

import NoSSR from './components/NoSsr/NoSsr';
import { YoptaPlugin } from './utils/plugins';
import { YoptaMark } from './utils/marks';
import { YoptaRender } from './components/YoptaRender/YoptaRender';
import { YoptaEditor as Editor } from './components/YoptaEditor/YoptaEditor';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value: Descendant[];
  key?: Key;
  placeholder?: string;
  plugins: YoptaPlugin<any, YoptaBaseElement<string>>[];
  children: ReactNode | ReactNode[];
  readOnly?: boolean;
  autoFocus?: boolean;
  shouldStoreInLocalStorage?: LOCAL_STORAGE_NAME_TYPE;
  marks: YoptaMark[];
};

const FALLBACK_VALUE = [
  // [
  //   {
  //     id: 'y3WPh8ZolGAx4Y1SJPlpB',
  //     type: 'heading-two',
  //     children: [
  //       {
  //         text: 'Yopta-Editor v2 is ',
  //       },
  //       {
  //         text: 'coming',
  //         underline: true,
  //       },
  //       {
  //         text: ' soonf',
  //       },
  //     ],
  //     nodeType: 'block',
  //   },
  // ];
  {
    id: 'y3WPh8ZolGAx4Y1SJPlpB',
    type: 'heading-two',
    children: [
      {
        text: 'Yopta-Editor v2 is coming soonf',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'm88GWhT0GcD3EacW7KR1y',
    type: 'heading-two',
    nodeType: 'block',
    children: [
      {
        text: 'sadasdsad asd',
      },
    ],
  },
  {
    id: 'wBq0ZyOmM3B9Q6qazgYGr',
    type: 'numbered-list',
    children: [
      {
        id: 'FiJS8FxdF6-3QF0LblsJn',
        type: 'list-item',
        nodeType: 'block',
        children: [
          {
            text: 'asdsada sd',
          },
        ],
      },
      {
        id: 'lwQ-F2Yy3g-HVMYnbNV3D',
        type: 'list-item',
        nodeType: 'block',
        children: [
          {
            text: 'as dsad sas da',
          },
        ],
      },
    ],
    nodeType: 'block',
    data: {
      depth: 1,
    },
  },
];

const YoptaEditor = (props: Props) => {
  debugger;
  if (props.readOnly) {
    return <YoptaRender plugins={props.plugins} key={props.key} data={FALLBACK_VALUE} marks={props.marks} />;
  }

  return (
    <NoSSR>
      <Editor {...props} />
    </NoSSR>
  );
};

export { YoptaEditor };
