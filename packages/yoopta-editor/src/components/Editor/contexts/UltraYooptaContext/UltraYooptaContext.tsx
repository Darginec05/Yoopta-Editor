import { createContext, useContext, useRef } from 'react';
import { Editor } from 'slate';
import { YooEditor } from '../../../../editor/types';

export type UltraYooptaContextPluginsEditorMap = Record<string, Editor>;

export type UltraYooEditor = {
  editor: YooEditor;
};

const DEFAULT_HANDLERS = {
  editor: {
    getBlock: () => undefined,
    insertBlock: () => undefined,
    updateBlock: () => undefined,
    moveBlock: () => undefined,
    deleteBlock: () => undefined,
    changeValue: () => undefined,
    focusBlock: () => undefined,
    setSelection: () => undefined,
    applyChanges: () => undefined,
    selection: null,
    blockEditorsMap: {},
    children: {},
  },
};

export const UltraYooptaContext = createContext<UltraYooEditor>(DEFAULT_HANDLERS);

/**
 *
 */
const UltraYooptaContextProvider = ({ children, editorState }) => {
  const contextValueRef = useRef<UltraYooEditor>(DEFAULT_HANDLERS);

  contextValueRef.current = {
    editor: editorState.editor,
  };

  return <UltraYooptaContext.Provider value={contextValueRef.current}>{children}</UltraYooptaContext.Provider>;
};

const useYooptaEditor = (): YooEditor => {
  const editor = useContext(UltraYooptaContext).editor;
  return editor;
};
const useYooptaPlugin = (id: string) => useYooptaEditor().children[id];

export { useYooptaEditor, useYooptaPlugin, UltraYooptaContextProvider };
