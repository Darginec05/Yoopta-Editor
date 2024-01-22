import { UltraYooptaContextProvider } from './components/Editor/contexts/UltraYooptaContext/UltraYooptaContext';
import { YOOPTA_EDITOR_ULTRA_VALUE } from './components/Editor/defaultValue';
import { Editor } from './components/Editor/Editor';
import { useCallback, useState } from 'react';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor } from 'slate';
import { YooEditor } from './editor/types';

type Props = {
  editor: YooEditor;
  onChange?: (value: YooEditor['children']) => void;
};

const YooptaEditor = ({ editor, ...props }: Props) => {
  const applyChanges = useCallback(() => {
    if (props.onChange) props.onChange(editor.children);

    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  }, []);

  const [editorState, setEditorState] = useState<{ editor: YooEditor; version: number }>(() => {
    editor.applyChanges = applyChanges;
    editor.children = YOOPTA_EDITOR_ULTRA_VALUE;

    Object.keys(editor.children).forEach((id) => {
      const slate = withHistory(withReact(createEditor()));
      editor.blockEditorsMap[id] = slate;
    });

    return { editor, version: 0 };
  });

  console.log('editorState children', editorState.editor.children);

  return (
    <UltraYooptaContextProvider editorState={editorState}>
      <Editor />
    </UltraYooptaContextProvider>
  );
};

export { YooptaEditor };
