import type { Key, ReactNode } from 'react';
import type { Descendant } from 'slate';
import type { LOCAL_STORAGE_NAME_TYPE } from './utils/storage';
import type { YoptaBaseElement } from './types';

import NoSSR from './components/NoSsr/NoSsr';
import { YoptaPlugin } from './utils/plugins';
import { YoptaMark } from './utils/marks';
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

const YoptaEditor = (props: Props) => {
  return (
    <NoSSR>
      <Editor {...props} value={props.value} onChange={props.onChange} />
    </NoSSR>
  );
};

export { YoptaEditor };
