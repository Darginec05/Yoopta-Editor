import {
  UltraYooptaContextProvider,
  YooEditor,
} from './components/Editor/contexts/UltraYooptaContext/UltraYooptaContext';
import { YOOPTA_EDITOR_ULTRA_VALUE } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { YooptaBaseElement } from './types';
import { useCallback, useState } from 'react';

type Props = {
  editor: YooEditor;
  onChange?: (value: YooEditor['children']) => void;
};

const YooptaEditor = <V extends YooptaBaseElement<string>>({ editor, ...props }: Props) => {
  const applyChanges = useCallback(() => {
    if (props.onChange) props.onChange(editor.children);

    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  }, []);

  const [editorState, setEditorState] = useState<{ editor: YooEditor; version: number }>(() => {
    editor.applyChanges = applyChanges;
    editor.children = YOOPTA_EDITOR_ULTRA_VALUE;
    return { editor, version: 0 };
  });

  return (
    <UltraYooptaContextProvider editorState={editorState}>
      <Editor />
    </UltraYooptaContextProvider>
  );
};

export { YooptaEditor };
