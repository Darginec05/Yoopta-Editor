import { useRef } from 'react';
// import { useCodeMirror } from './hooks';
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
  const editor = useRef<HTMLDivElement>(null);
  // const { state, view, container } = useCodeMirror({
  //   container: editor.current,
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

  console.log('editor', editor);
  console.log('other', other);
  // console.log({ state, view, container });

  const defaultClassNames = typeof theme === 'string' ? `cm-theme-${theme}` : 'cm-theme';
  return <div ref={editor} className={`${defaultClassNames}${className ? ` ${className}` : ''}`} {...other}></div>;
};

ReactCodeMirror.displayName = 'CodeMirror';

export { ReactCodeMirror };
