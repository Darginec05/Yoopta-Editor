import { createContext, useContext, useRef } from 'react';
import { Editor } from 'slate';
import { YooEditor } from '../../editor/types';

export type UltraYooptaContextPluginsEditorMap = Record<string, Editor>;

export type YooptaEditorContext = {
  editor: YooEditor;
};

const DEFAULT_HANDLERS: YooptaEditorContext = {
  editor: {
    getBlock: () => undefined,
    insertBlock: () => undefined,
    updateBlock: () => undefined,
    moveBlock: () => undefined,
    splitBlock: () => undefined,
    deleteBlock: () => undefined,
    focusBlock: () => undefined,
    setSelection: () => undefined,
    applyChanges: () => undefined,
    decreaseBlockDepth: () => undefined,
    increaseBlockDepth: () => undefined,
    formats: {},
    selection: null,
    blockEditorsMap: {},
    children: {},
  },
};

export const UltraYooptaContext = createContext<YooptaEditorContext>(DEFAULT_HANDLERS);

/**
 *
 */
const UltraYooptaContextProvider = ({ children, editorState }) => {
  const contextValueRef = useRef<YooptaEditorContext>(DEFAULT_HANDLERS);

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
