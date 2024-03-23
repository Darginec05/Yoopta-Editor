import { useRef } from 'react';
import { ReactCodeMirrorProps } from './types';

const ReactCodeMirror = (props: ReactCodeMirrorProps) => {
  const {
    className,
    value = '',
    selection,
    extensions = [],
    onChange,
    onStatistics,
    onCreateEditor,
    onUpdate,
    autoFocus,
    theme = 'light',
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    basicSetup,
    placeholder,
    indentWithTab,
    editable,
    readOnly,
    root,
    initialState,
    ...other
  } = props;
  const codeMirrorRef = useRef<HTMLDivElement>(null);
  // const { state, view, container } = useCodeMirror({
  //   container: codeMirrorRef.current,
  //   root,
  //   value,
  //   autoFocus,
  //   theme,
  //   height,
  //   minHeight,
  //   maxHeight,
  //   width,
  //   minWidth,
  //   maxWidth,
  //   basicSetup,
  //   placeholder,
  //   indentWithTab,
  //   editable,
  //   readOnly,
  //   selection,
  //   onChange,
  //   onCreateEditor,
  //   onUpdate,
  //   extensions,
  //   initialState,
  // });

  if (typeof value !== 'string') {
    return null;
  }

  console.log('codeMirrorRef', codeMirrorRef);
  console.log('other', other);
  // console.log({ state, view, container });

  return <div ref={codeMirrorRef} />;
};

ReactCodeMirror.displayName = 'CodeMirror';

export { ReactCodeMirror };
